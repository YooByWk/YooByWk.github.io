---
layout: post
title: "NestJS의 Request 생명주기"
subtitle: "Spring 비슷한"
tags: [JavaScript, TypeScript, BackEnd]
date: 2025-10-22
categories: [NestJS]
toc: true
---

NestJS는 `Node.js` 환경에서 확장 가능하고, 유지보수 하기 용이한 서버측 애플리케이션을 구축하기 위해 설계된 프레임워크.

Spring 이나, Angular의 모듈식 아키텍처에 큰 영향을 받아 요청(Request 이하 req)이 들어와 응답(Response 이하 res) 까지 일련의 명확한 단계로 분리하여 처리한다.

따라서 해당 생명주기에 대해 학습해보았다.

# Req 생명 주기의 구성 요소와 흐름

NestJS의 요청은 프레임워크 내부의 다양한 계층을 지난다.

각 계층은 각자의 역할을 수행하며, Req, Res를 수정하거나, 중단할 수 있다.

생명주기 흐름

```
[Client]
   ↓
[Middleware]  → 전역 로직 (CORS, Logging)
   ↓
[Guards]      → 접근 제어 (Auth/JWT)
   ↓
[Interceptors (Before)] → 요청 조작
   ↓
[Pipes]       → 데이터 변환 & Validation
   ↓
[Controller]  → 요청 핸들러 실행
   ↓
[Service]     → 비즈니스 로직
   ↓
[Interceptors (After)] → 응답 조작
   ↓
[Exception Filter] (에러 시)
   ↓
[Response to Client]

```

## 각 요소별 역할

| 단계 | 구성 요소                 | 주요 역할               | 실행 시점        |
| ---- | ------------------------- | ----------------------- | ---------------- |
| 1    | **Middleware**            | 요청 전처리, 로깅, 세션 | 요청 초입        |
| 2    | **Guards**                | 인증·인가               | 라우팅 직전      |
| 3    | **Interceptors (Before)** | 요청 조작, 로깅         | 컨트롤러 직전    |
| 4    | **Pipes**                 | DTO 변환, Validation    | 컨트롤러 진입 전 |
| 5    | **Controller Handler**    | 핵심 비즈니스 처리      | 요청 처리        |
| 6    | **Service Logic**         | 실제 비즈니스 로직      | 핸들러 내부      |
| 7    | **Interceptors (After)**  | 응답 조작, 캐싱         | 응답 직전        |
| 8    | **Exception Filter**      | 예외 처리               | 예외 발생 시     |
| 9    | **Response**              | 클라이언트로 전송       | 최종 단계        |

### 미들웨어

라우트 핸들러 이전에 실행된다.

주로 전역적 로직 (로깅, CORS, 세션 관리) 처리를 한다.

### 가드

권한 및 인증 처리를 담당한다. 혹은 라우트 접근 허용/거부를 결정한다.

### 컨트롤러 인터셉터

컨트롤러 메서드 실행 직전에 로직을 실행한다. 요청을 변경하거나 로깅등에 사용된다.

### 파이프

요청 데이터의 유효성 검사 및 데이터를 변환한다.

### 컨트롤러 서비스 실행

핵심 비즈니스 로직이 실행되는 단계.

### 컨트롤러 인터셉터

컨트롤러 메서드 실행 이후에 로직 실행. 응답 데이터 변경, 캐싱, 에러 처리 등에 사용.

### 예외 필터

파이프라인 중 발생한 모든 예외(Exception)를 잡아 사용자 친화적인 응답 형식으로 변환.

# 주요 개념 재정리

## 파이프

유효성을 검사하거나 원하는 형태로 변환

`@Body('age', ParseIntPipe)` 와 같은 형태로 문자열로 들어온 age 필드를 숫자로 강제 변환하거나

`@Body(ValidationPipe)`를 사용하여 DTO 클래스에 정의된 유효성 규칙을 검사한다.

## 가드

특정 라우트(경로)에 접근하기 전에 권한을 확인.

`CanActivate` 인터페이스 구현, 해당 메서드가 true를 반환해야 다음 단계로 진행된다.

JWT 토큰 검증, 유효한 사용자만 컨트롤러에 접근할 수 있도록 함.

## 인터셉터

컨트롤러 실행 전후에 부가적인 로직을 삽입하여 요청/응답을 조작하거나, 함수 실행 시간을 측정(로깅), 캐싱 등을 수행

`LoggingInterceptor`를 사용하여 컨트롤러 메서드 실행 전후 시간을 측정하고 콘솔에 기록.

`TransformInterceptor`를 사용하여 모든 응답 데이터를 특정 표준 형식(예: { success: true, data: ... })으로 감싸서(Wrap) 반환

응답 데이터 포매팅, 캐싱 구현, 트랜잭션 관리에 사용

## 데코레이터 & 인터페이스 요약

| 요소             | 핵심 데코레이터 / 인터페이스            | 설명                                |
| ---------------- | --------------------------------------- | ----------------------------------- |
| Middleware       | `NestMiddleware`                        | `apply()` 메서드로 라우트 단위 적용 |
| Guard            | `@UseGuards()`, `CanActivate`           | 인증/인가 전용                      |
| Pipe             | `@UsePipes()`, `PipeTransform`          | DTO 유효성 검증, 타입 변환          |
| Interceptor      | `@UseInterceptors()`, `NestInterceptor` | 로깅, 캐싱, 응답 포맷               |
| Exception Filter | `@Catch()`, `ExceptionFilter`           | 에러 핸들링, 표준화된 응답 생성     |

# 예시

## `src/app.module.ts` - 미들웨어 설정

```js
import { Module, NestModule, MiddlewareConsumer } from "@nestjs/common";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { CatsController } from "./cats/cats.controller";

@Module({
  imports: [],
  controllers: [CatsController],
  providers: [],
})
export class AppModule implements NestModule {
  // NestModule 구현
  configure(consumer: MiddlewareConsumer) {
    // 모든 라우트에 LoggerMiddleware 적용
    consumer.apply(LoggerMiddleware).forRoutes("*");
    // 혹은 특정 라우트에만 적용: .forRoutes(CatsController);
  }
}
```

## `src/common/guard/roles.guard.ts` - 가드 : 권한 확인

```js
import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";

@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    // 실제 로직: 토큰에서 사용자 역할을 추출하여 'admin'인지 확인
    return request.user && request.user.roles.includes("admin");
    // false 반환 시 403 Forbidden 응답으로 바로 종료
  }
}
```

## `src/cats/cats.controller.ts` - 가드, 파이프 적용

```js
import { Controller, Post, Body, UseGuards, UsePipes } from "@nestjs/common";
import { CreateCatDto } from "./dto/create-cat.dto";
import { RolesGuard } from "../common/guard/roles.guard";
import { ValidationPipe } from "../common/pipe/validation.pipe"; // 1. 커스텀 파이프

@Controller("cats")
@UseGuards(RolesGuard) // 2. 가드 실행: 접근 권한 확인
export class CatsController {
  @Post()
  async create(
    // 4. 파이프 실행: CreateCatDto의 유효성 검사 및 데이터 변환
    @Body(new ValidationPipe()) createCatDto: CreateCatDto
  ) {
    // 5. 컨트롤러 핸들러 실행: 비즈니스 로직 호출
    console.log("5. Controller Handler executed");
    return { message: "Cat created successfully", data: createCatDto };
  }
}
// 3. 인터셉터 (Post-Controller)는 return 직후에 실행되며 응답을 가공한다.
// 예외 필터는 이 과정 중 에러가 발생하면 처리한다.
```

# 기타 정보

- 미들웨어는 DI (Dependency injection) 밖에 존재하므로, DI를 사용하려면 인터셉터나 가드를 활용해야 한다.
- 비동기 처리 : 가드 인터셉터 파이프 모두 비동기 처리를 지원한다
- 예외가 발생하면 바로 Exception filter 로 넘어간다.

# 출처

[NestJS 공식 문서](https://docs.nestjs.com/faq/request-lifecycle#middleware)

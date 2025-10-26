# NestJS 요청 생명주기 (Request Lifecycle)

## 개요

NestJS는 node.js 환경에서 확장 가능하고 모듈화된 서버 애플리케이션 구축을 위해 설계된 프레임워크.

Angular와 Spring의 영향을 받아, HTTP 요청(Request)이 들어와 응답(Response)으로 나가기까지의 과정을 일련의 명확한 단계로 처리.

> [!important] 즉 파이프라인(Pipeline)으로 분리하여 처리한다

## 요청 생명주기 흐름

NestJS의 요청은 프레임워크 내부의 다양한 계층을 순차적으로 통과하며 처리된다.

각 계층은 요청 또는 응답을 수정하거나, 처리 과정을 중단할 수 있다.

```
[Client Request]
       ↓
[1. Middleware]
       ↓ (라우팅)
[2. Guards (CanActivate)]
       ↓
[3. Interceptors (Pre-Controller)]
       ↓
[4. Pipes (PipeTransform)]
       ↓ (유효성 검증/변환 실패 시 예외 발생)
[5. Controller Handler Execution]
       ↓
[6. Service Logic]
       ↓
[7. Interceptors (Post-Controller)]
       ↓ (이 과정 중 예외 발생 시)
[8. Exception Filter]
       ↓
[Client Response]
```

## 구성 요소별 역할과 실행 시점

| 단계 |     구성 요소      |                               핵심 역할                                |            실행 시점            |   단축 (Short-circuit) 가능 여부    |
| :--: | :----------------: | :--------------------------------------------------------------------: | :-----------------------------: | :---------------------------------: |
|  1   |     Middleware     |            요청/응답 헤더 조작, 전역 로깅, CORS, 세션 관리             |     라우팅 이전 (요청 초입)     |      가능 (res.end() 호출 시)       |
|  2   |       Guards       |         인증(Authentication) 및 인가(Authorization) 접근 제어          | 라우팅 직후, 컨트롤러 진입 직전 | 가능 (false 반환 시 403 Forbidden)  |
| 3, 7 |    Interceptors    |             요청/응답 로깅, 캐싱, 응답 데이터 포매팅/조작              |       컨트롤러 실행 전/후       |          가능 (예외 발생)           |
|  4   |       Pipes        |   요청 데이터 유효성 검사 (Validation) 및 타입 변환 (Transformation)   |      핸들러 인자 처리 직전      | 가능 (Validation 실패 시 예외 발생) |
| 5, 6 | Controller/Service |                        핵심 비즈니스 로직 실행                         |         요청 처리 본체          |                  -                  |
|  8   |  Exception Filter  | 파이프라인 중 발생한 모든 예외를 포착 및 사용자 친화적인 형식으로 변환 |        예외 발생 시 즉시        |                  -                  |

## 핵심 개념

|       요소       |    핵심 인터페이스 / 데코레이터     |                                                                      설명 & 특징                                                                       |
| :--------------: | :---------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------: |
|    Middleware    |           NestMiddleware            |                    DI(Dependency Injection) 컨테이너 외부에 위치하며, app.module.ts의 configure() 메서드를 통해 라우트 범위에 적용                     |
|      Guard       |      @UseGuards(), CanActivate      |      컨트롤러 및 메서드 레벨에서 적용 가능. CanActivate가 false를 반환하면 즉시 요청을 중단하고 예외 필터를 거쳐 응답(기본 403 Forbidden)을 반환       |
|       Pipe       |     @UsePipes(), PipeTransform      |                            요청 본문, 쿼리, 파라미터 등 핸들러의 인자 수준에서 작동. 데이터 유효성 검사와 타입 변환에 특화                             |
|   Interceptor    | @UseInterceptors(), NestInterceptor | AOP(Aspect-Oriented Programming) 관점에서 사용되며, 컨트롤러 실행 전(tap() 이전)과 응답 처리 후(map() 이후) 모두 로직을 삽입하여 요청/응답을 조작 가능 |
| Exception Filter |      @Catch(), ExceptionFilter      |                   애플리케이션 전역 또는 특정 범위에서 발생하는 예외를 일관성 있게 처리하여 표준화된 응답 형식을 클라이언트에게 제공                   |

## 예시

### `src/app.module.ts` - 미들웨어 설정

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

### `src/common/guard/roles.guard.ts` - 가드 : 권한 확인

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

### `src/cats/cats.controller.ts` - 가드, 파이프 적용

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

## 기타 정보

- 미들웨어는 DI (Dependency injection) 밖에 존재하므로, DI를 사용하려면 인터셉터나 가드를 활용해야 한다.
- 비동기 처리 : 가드 인터셉터 파이프 모두 비동기 처리를 지원한다
- 예외가 발생하면 바로 Exception filter 로 넘어간다.

# 참고

[NestJS 공식 문서](https://docs.nestjs.com/faq/request-lifecycle#middleware)

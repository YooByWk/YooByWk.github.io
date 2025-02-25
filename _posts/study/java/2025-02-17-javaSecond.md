---
layout: post
title: "Spring bean 하이하이"
subtitle: "Spring 2회차 과연"
tags: [Java, Spring]
date: 2025-02-17
categories: [Java, Spring]
toc: true
banner: https://github.com/user-attachments/assets/7a9663bd-09a4-49db-9b32-edb5adcedc96
---

# 2025_02_17

## 이제 조금 더 해보자!

## 1회

**@Bean**을 숙청할거임.

1. Bean 을 수동으로 만들지 말자.

   > configuration + App

2. Bean 제거..?
   1. 대신 직접 넣어버림.

`@Component`!

```java
// 제거!
	@Bean
	@Primary
	public GamingConsole game() {
		var game = new PacmanGame();
		return game;
	}

//  game 이라는게 사라져서. 이를 찾을 수 있게 해줘야 함
@ComponentScan("com.in28minutes.learn_spring_framework.game")
// 슉 슈슉


	@Bean
	public GameRunner gameRunner( GamingConsole game) {
		System.out.println(game);
		var gameRunner = new GameRunner(game);
		return gameRunner;
	}
	// 이걸 여기서 만들어야 할까? 이것도 Spring 시키자.
```

Spring은 객체를 관리, 자동 와이어링, 객체 생성까지 해줌 ->

`@Component`, `@ComponentScan` 으로!

- 근데 이 경우에도 여러개 잘못하면 난리남. 직접 우선순위를 설정하지 못하기 때문

- 아무래도 implements를 보고, 필요한것을 찾아가는듯 하다. 작동방식에 대해서 고민해봐야 할 것 같다.

---

우선 대충 해결법

- 다중 Component를 한개의 패키지에서 등록해서, 여러개가 충돌할 떄

1. `@Primary` - 기본값 같음.
2. `@Qualifier` - 후보 `bean`에 대한 한정자로

## @Primary v. @Qualifier

### @Primary

여러 후보가 자격이 있는 경우, 해당 대상에게 우선권을 부여함

### Qulifier

특정 Bean이 자동 와이어링 되어야 한다. - 특정 bean을 와이어링 한다.

## 의존성 주입

1. 생성자 사용하기

```java
@Component
class BusinessClass {
	// 여기에 의존성을 넣자


	Dependency1 dependency1;

	Dependency2 dependency2;

	// @Autowired // 선택적임~
	public BusinessClass(Dependency1 dependency1, Dependency2 dependency2) {
		super();
		System.out.println(" Contstructor Injection on " + this.getClass());
		this.dependency1 = dependency1;
		this.dependency2 = dependency2;
	}
```

2. Setter - 수정자 기반 주입

```java
/// 어떤클래스
@Component
class BusinessClass {
	// 여기에 의존성을 넣자


	Dependency1 dependency1;

	Dependency2 dependency2;


	@Autowired
	public void setDependency1(Dependency1 dependency1) {
		System.out.println("Setter Injection -  setDependency1");
		this.dependency1 = dependency1;
	}

	@Autowired
	public void setDependency2(Dependency2 dependency2) {
		System.out.println("Setter Injection -  setDependency2");
		this.dependency2 = dependency2;
	}


	public String toString() {
		return "Using " + dependency1 + " and " + dependency2;
	}

}
```

3. 필드 주입 (relfection)

```java
/// 어떤클래스
@Component
class BusinessClass {
	// 여기에 의존성을 넣자

	@Autowired // 자동 와이어링!
	Dependency1 dependency1;

	@Autowired // 자동 와이어링!
	Dependency2 dependency2;

	public String toString() {
		return "Using " + dependency1 + " and " + dependency2;
	}

}

/// 의존성1
@Component
class Dependency1 {

}
/// 의존성2
@Component
class Dependency2 {

}
```

### 과연 무엇을 추천할까

Spring 팀은 생성자 기반 주입을 추천함!  
-> 한개의 메서드에서 슉슈슉 완료하기 때문!  
-> 생성자 주입을 쉽게 사용하게 작업도 해놓았음!  
-> 슉슈슉 `nest`의 맛이 살짝 나는걸?

## 복습~

### @Component

- 중요한 어노테이션임
- 특정 클래스가 컴포넌트 스캔에 있다면, 해당 클래스의 인스턴스 즉 Spring Bean이 생성되고 관리된다

### Dependency

- 뭔가 필요함.
- 필요한것이 의존성임...

### @ComponentScan

- Spring 프레임워크에게 어떤 패키지를 찾으면, 필요한게 나올거라고 알려주는 것
- `@ComponentScan("패키지 이름")`
- `@ComponentScan` - 현재 패키지를 검색함

### 의존성 주입

- 의존성이 무엇인지 식별하고, 와이어링
- 위쪽의 프로세스를 진행 + 와이어링 하는 것을 의존성 주입이라고 보면 될 듯

#### IOC! (제어역전)

- 내가 전부 제어하지 말자.
- `니가 해줘!` `@Component 딸깍`
  - 와이어링
  - 객체 생성
  - 스캔
  - 전부 스프링이 해줌!
  - 끼.

**IoC container** - 제어 반전 컨테이너. Bean의 생명주기와 의존성을 관리하는 Spring의 컴포넌트

~~Beanfactory 넌 나가있어~~

**Autowiring** - Spring Bean 의 의존성을 wiring 하는 작업

## Component vs Bean

|      주제      |             @Component              |                         @Bean                         |
| :------------: | :---------------------------------: | :---------------------------------------------------: |
|     where      |          모든 Java 클래스           |            특정 메서드. - Configuration...            |
|     사용성     |        어노테이션만 쓰면 됨         |                 코드를 작성해줘야 함                  |
|   Autowiring   |    필드, 세터, 생성자 주입 가능     |              메서드 호출 / 파라미터 호출              |
| Bean 생성 주체 |               스프링                |                 개발자가 작성한 코드                  |
|      권장      | 대부분 @Component 추천 : @component | 1. 커스텀 (bean 생성)로직 <br> 2. 서드파티 인스턴스화 |

- Bean 생성 전 라이브러리 인스턴스화 or Bean 생성 이전 로직이 복잡한 경우 `@Bean` 권장

## 왜 의존성을 막 나눌까 / 나눠질까

모든 앱에는 의존성이 엄청나게 많음.

프레임워크를 사용해서 비즈니스 로직에 집중하기 위함

- Spring Framwork가 생명주기와 같은 것을 관리함
- 연결과 관련된 기능도 담당함

따라서 전체 시스템에 필요한 과정을 내가 하지 않게 하기 위함...

"**비즈니스 로직에 집중하자**"

### 앞으로.

1. Lazy Initialization
2. Bean Scopes
3. PostConstruct & PreDestroy
4. Jakarta EE
5. Context & DI
6. XML Config
7. @Component @Service @Repository
8. 아무튼 이것 저것

## 후기.

아. 이제 시작인 것 같은데

어딘가 비슷한 맛이 나는 것 같으면서 전혀 새롭다

기초적인 문법도 추후 공부를 해야 더 잘 적응할 수 있을 것 같은데 우선은 강의를 더 따라가면서 강해지는것이 목표!

그래도 뭔가 차근차근 파일 나눠가면서 하니까 싱난다!

특히 내가 뭘 딱히 안해줘도 슉슉 해주니까 편하네요.

괜히 쓰는게 아닌가?

---
layout: post
title: Java 시작...
subtitle: Spring 네 이놈!
tags: [Java, Spring]
date: 2025-02-14
categories: [Java, Spring]
toc: true
banner: https://github.com/user-attachments/assets/7a9663bd-09a4-49db-9b32-edb5adcedc96
---

# 2025/02/14 ~ 2025/02/15

## 왜 갑자기 자바 스프링?

어.. 사실 나는 자바가 싫다!

왜냐고 묻는다면 그냥 싫었다! 뭐라해야하지... 그 홍대병 같은 느낌으로 조금 싫어했었는데. 아무래도 계속 피하기만 하는 것은 성장에 어떤 도움도 되지 않을 것 같다는 판단과. 취업을 위해서는 프론트도 할 줄 알고(잘해야겠지만) 백엔드도 할 줄 아는 것이 중요하다는 생각이 들었기 때문이다!!!

사실 여전히 주류 프레임워크라고 하면 스프링이고 그것은 자바기 때문에......

그리고 또 다른 이유로는 지금까지 깨작깨작 시도해본 언어가 좀 있는데 (python js ts solidity dart... ) 이 상황에서 다른 새로운 언어와 프레임워크를 사전 지식 없이 배우기 시작한다면 얼마나 빠르게 이해하고 넘어갈 수 있을지 궁금했기 때문이다.

따라서 이 포스팅은 Spring과 자바를 처음 만지면서 느끼는 그런 경험과 감정을 기록해두고자 작성하는 포스팅이다.

~~나중에 보면 석사논문 읽는 박사의 기분이길.~~

## Spring을 배우자

- 그렇다.
- 의존성 주입 ㄱㄱ

Boot까지 배우면 더 편하다.

생산성 슉 슈슉임

---

우선 `Spring` 프레임워크가 필요한 이유와 용어를 배우자

> 용어가 상당히 추상적임
>
> 따라서 천천히 시작해보자!

## 시작하기

Spring 부터 하는 이유 -> Boot도 빠르게 익힐 수 있음

## 목표

1. 핵심 기능 이해
2. 실습 접근
3. "느슨하게 결합된" Hello World 외 구현
4. 다양한 용어에 대한 의해
   1. 강한 결합
   2. 느슨한 결합
   3. IOC 컨테이너
   4. 애플리케이션 컨텍스트
   5. 컴포넌트 스캔
   6. 의존성 주입
   7. 자동 연결

> 반복하면서 진행할 것.
>
> 1회차 = 강한 결함
>
> 2회차 = 느슨한 결합
>
> 3회차 = Spring 프레임워크 도입 (느슨한 결합 1단계)
>
> 4회차 = 느슨한 결합 2단계 with `Annotation`

자~ 드가자!

## 구축하기

> Maven & Java

`strat.spring.io`

걱정말고 최신버전을 쓰되 `SNAPSHOT` 쓰지 마쇼

그룹ID -`com.뭔가뭔가`

아티팩트ID - `뭔가뭔가`

<img
  src="https://github.com/user-attachments/assets/dc45179d-ee68-4f14-924f-4c309e459782"
  width="1024px" 
/>

zip 파일이 다운로드 됨.

이후 `Eclipse`에서 import

<img
  src="https://github.com/user-attachments/assets/b7c46b0e-b8c3-481c-806f-1aebfcb0f9e8"
  width="512px"
/>

불러오는 중. 오래걸림... 흑흑ㅎ극

## IMPORT 후 1회차!

<img
  src="https://github.com/user-attachments/assets/f96525ad-5d24-437d-8acb-86fab9d8bc49"
  width="512px"
/>

자바가 뭔지도 모르는데 Class를 만들고 있다. 언젠가는 익숙해지겠지..?

`Type name must not be qualified`?

-> `대충파일이름.java` 같은 명시 지우니까 사라졌음. 아무래도 뭔가 파일명지정같은거 하지 말라는 듯...?

> Todo 패키지는 무엇을 의미할까.

`public static void main`란?

## 대충 막 써봄

<img
src="https://github.com/user-attachments/assets/d29e3dfe-6cbb-45c7-ac6f-de8affc97704"
width="512px"
/>

> ~~허거덩~~

Eclipse -> `sysout` 하면 바로 `System.out.println()` 뽑아줌

---

중간 후기 :

" 진짜 클래스 기반으로 뭐 하라는 거 같다."

> 매우 강한 결합임. MarioGame 은 걍 game 그자체니까.

---

## 1회차 리뷰

> 1회차의 코드는 강한 결합이다.

```java
public class GameRunner {
	MarioGame game; //

	public GameRunner(MarioGame game) {
		this.game = game;
	}

/// Basic
var marioGame = new MarioGame();
var superContraGame = new SuperContraGame();
var gameRunner = new GameRunner(marioGame);
gameRunner.run();
// supercontra를 어케 뭘 할 수 없음. gameRunner에 하드코딩되어있기때문..

// 만약 GamerRunner에서 쓰고싶으면
 public lcass GameRunner {
   SuperContraGame game // 이렇게 되어야곘죠.
 }
```

**그렇다면?**

> 마치 자동차의 엔진을 바꾸는 것과 바퀴를 바꾸는 것 처럼.
>
> "결합도"를 신경써야 함. (얼마나 쉽게 여러개를 슉슈슉 할 수 있는지.)
>
> 가능한 한 코드를 적게 변경하며, 변화를 적용시킬 수 있어야 한다!
>
> Java 인터페이스 + Spring을 사용해서 해결해보자

**따라서 문제점은 다음과 같다.**

`GameRunner` 클래스가 특정 게임에 강하게 결합된 점.

## 2회차

**GameRunner** 클래스가 있음.

해당 클래스가 GamingConsole 인터페이스를 도입하도록 할 것.

1. XX 게임은 up, down, left, right 가 있음

특정 클래스 세트에서 수행할 수 있는 공통된 작업이다.

이를 인터페이스라고...

<img
src="https://github.com/user-attachments/assets/77db8aa5-1aa2-47ca-9b7f-376e0eb65dc5"
width="1024px"
alt=""
/>

~~만드는게 어렵진 않음~~

```java
// 이렇게 만들어주고
public interface GamingConsole {
	void up();
	void down();
	void left();
	void right();

}
// MarioGame & superContraGame

public class XXGame implements GamingConsole {
   ...
   ...
   ...

}

```

-> 뭔가 된 것 같다! 일단 에러가 없다!

---

하지만 여전히 `GameRunner`는 `MarioGame`만 사용 가능함. 이를 수정하자.

```java
   // 위에 있던 부분을 interface를 사용하게 변경.
	private GamingConsole game;

	public GameRunner(GamingConsole game) {
		this.game = game;
	}
```

기존

```
GameRunner - Mario
           - SuperContra
```

이렇게 연결되었다면,

지금은 다음과 같다고 볼 수 있을 것 같다.

```
GameRunner - GamingConsole - Mario
                           - SuperContra
```

## 3회차~

> 드디어 `spring` 쓰나?

### 2회차 리뷰

1. 객체생성 (XXGame)
2. 객체생성2 (GameRunner + 의존성 결합) // 따라서 게임 자체를 **GameRunner**의 의존성으로 볼 수 있다!

의존성이 엄청나게 늘어날텐데... 이렇게 직접 생성 관리 실행하는게 맞을까?

> 아니오. Spring을 부려먹어봅시다.

### 우선 간단한거부터 시작하자.

시킬 일.

**Spring이 관리하게 시키기.**

-

1. Launch a Spring Context
2. Configure the things that we want Spring to manage

---

### 실습~

#### 1. Configuration Class 만들기

1. `HelloWorldConfiguration` Class 생성

   1. `@Configuration` Annotation 추가  
      얘는 Spring Bean (Spring에서 관리하는 것)을 정의할 수 있음
   2. `AnnotationConfigApplicationContext` ㄱㄱ  
      `		var context = new AnnotationConfigApplicationContext(HelloWorldConfiguration.class);` 이런 모양임.

2. 대충 써보기

```java
@Configuration
public class HelloWorldConfiguration {
	@Bean
	public String name() {
		return "YBW";
	}
}

// 불러보기~
// Spring이 관리하는 Bean을 호출한 것..!
// 사실 아직 썼다고 하긴 뭐함. 차근차근~
public class App02HelloWorldSpring {

	public static void main(String[] args) {
		// 1. Launch a Spring Context -
		var context = new AnnotationConfigApplicationContext(HelloWorldConfiguration.class);

		// 2. Configure the things that we want Spring to manage - @Configuration
		// HelloWorldConfiguration
		// name - @Bean

		// 3. Retrieving Beans managed by Spring
		System.out.println(context.getBean("name")); // YBW
	}

}
```

### Bean을 더 만들자!

- 근데 왜 `Bean`을 만들까요? 하다보면 알겠죠 머.

아무튼 추가적으로 age라는 bean을 하나 더 만들었다.

이에 따라 Person이라는 record도 생성했다. <- 편한 기능같네요.

뭐 이런 모양이네요. 꽤 많은거 저장 가능한듯?

```java
record Person (String name, int age) {};
record Address (String firstLine, String city) {};

// helloworldConfiguration...
@Bean(name="myAddressBean") // 이름 지정도 가능하다.
public Person person() {
   var person = new Person("Sergio", 28);
   return person;
} // 요래 저장해서
// Person[name=Sergio, age=28] 이렇게 불러올 수 있음을 확인함

// context.getBean(Person.class) 이렇게도 접근됨...
```

### context를 통해 뭔가 해보자?

```java
	@Bean
	public String name() {
		return "YBW";
	}

	@Bean
	public int age() {
		return 300;
	}

	@Bean
	public Person person() {
		var person = new Person("Sergio", 28, new Address("Main", "CDMX"));
		return person;
	}

	@Bean
	public Person person2MethodCall() {
		var person = new Person(name(), age(), address() ); // name, age Bean으로 만들기!
		return person;
	}
```

이렇게 직접 호출을 통해서 또 다른 Bean을 만들수 있음

다른 접근방식으로는

### Bean 정리

1. 이름 설정 가능
2. 다양한 방법으로 Spring context에서 Bean을 사용할 수 있음
   1. Class
   2. 이름
3. 이를 이용해서 새로 Bean을 또 만들 수 있음
4. Class 접근은... 1개만 허용하는 것 같음 -> 어떤 Bean 을 써야하는지 모르기때문...

### 앞으로 배울 것.

5. Spring이 객체 관리 + 연결하는데 우리는 그걸 만들잖아. 그러면... 객체를 만드는 사람은 누구지?
   - 스프링이 객체를 만들게 하는건 어떤데...?

#### Spring Container?

**스프링 컨테이너 vs 스프링 컨텍스트 vs IOC 컨텍스트 vs App Context **

-> 지금은 어떻게 보든 일단 동일하다고 생각하자.

> Spring Bean과 수명주기를 관리.

1. Bean factory

- Bean Factory에 대해 생각할 수 있는 유일한 사용 사례는 메모리에 심한 제약이 있는 IOT 같은곳에... 쓴다나 뭐라나...

2. Application Context

- 이것저것 엔터프라이즈한 가장 자주 사용하는 컨테이너...?
- `AnnotationConfigApplicationContext` 이놈이 그 주인공.
- 웹앱 웹서비스 REST API Micro Service ...etc!
- 얘를 주로 씁니닷

---

---

**Java Bean vs Spring Bean**

-> 뭐... 네. 이것저것인데... Pass

---

#### 3. Spring Bean이 관리하는 Bean 리스트 불러오는 법

```java
Arrays.stream(context.getBeanDefinitionNames())
   .forEach(System.out::println);
```

요래 불러왔습니다.

---

#### 4. 여러개의 Bean을 사용한다는 것은?

ej. context.getBean(Person.class) 하면 지금은 Person class로 된게 여러개라서 에러가 남.

> 그러면 Spring이 어떤것을 우선순위로 사용하게 할 지 생각해보자

일치하는 Bean이 여러개인 경우. Spring은 예외를 출력함.

따라서 이런 경우를 대비해서 기본값? 같은 우선순위를 넣어주자.

`@Primary` 슉 슈슉~

뭔가 같은 클래스 반복? -> Primary... 로 도 피 할 수 있 는 듯 ?

`@Qualifier` > primary 말고 다른거 쓰고싶을 떄....

```java
	@Bean
	@Primary
	public Person person5Qualifier(String name, int age, @Qualifier("address3qualifier") Address address) {
		var person = new Person("dd", age, address ); // name, age Bean으로 만들기!
		return person;
	}
```

아무튼 여러개라면 옵션은 다음과 같다.

1. 기본값
2. 특정 하나 지정

## 후기

와. 어렵다!

자바도 모르고요

스프링도 몰라요

근데 일단 해보고 있어요

앞으로 이제 진짜진짜 어려운게 남은게 아닐까 싶은데 그래도 **재밌다!**

아무튼. 이제 시작이니까 마음 급하게 먹지 말고 차근차근 열심히 그리고 꾸준히 공부하는 것이 중요하리라 믿는다.

화이팅!

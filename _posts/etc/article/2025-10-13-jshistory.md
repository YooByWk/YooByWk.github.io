---
layout: post
title: "[JS 시리즈 1편] 간단 스크립트에서 웹까지, JavaScript의 역사"
subtitle: ECMA 표준, 상표권 분쟁의 시작.
categories: [JavaScript]
tags: [JavaScript]
toc: true
date: 2025-10-13
series: "FreeJavaScript"
---

> 본 시리즈는 총 2부로 이루어집니다.

# 들어가며

JavaScript는 단순한 프론트엔드 언어를 넘어, Node, Deno, Bun 과 같은 런타임 까지 아우르며, 다양한 환경에서 사용되는 전 세계 SW 소프트웨어 산업의 큰 부분이 되었습니다.

![share](/assets/images/blog/2025-10-13-js/stackoverflow-dev-survey-2025.png)

출처 : [Stackoverflow Developer Survey](https://survey.stackoverflow.co/2025/technology#most-popular-technologies-language)

하지만 지금 우리가 브라우저, Node.js, Deno, Bun 등에서 실행하는 코드 대부분은 법적으로 Oracle의 상표 (JavaScript™) 아래 놓여있습니다.

![레딧 -> JavaScript로 인해 앱 내려감](/assets/images/blog/2025-10-13-js/reddit-oracle.png)

> JavaScript가 적혀있다는 이유로 앱이 내려간 적도 있다고 하네요. (8년 전)

본 시리즈 1부에서는 상표권과 관련된 법적 논쟁 이전에, 어떻게 JavaScript가 탄생했고, 어떻게 성장했는지에 정리하며, 개발 생태계와 관련된 이야기를 나누기 위한 글입니다.

# 자바스크립트?

1995년 브렌던 아이크(Brendan Eich)가 **단 10일** 만에 만든 웹 브라우저용 스크립트 언어를 만들었습니다.

처음에는 `Mocha`, 곧 `LiveScript`, ~~마침내~~ 끝내 `JavaScript`가 되었습니다. 이 이름은 단순한 마케팅 선택으로 보였으나. 이제는 프로그래밍 언어의 자유와 관련된 문제거리가 되었지요.

## 넷스케이프의 의도와 언어 설계

1995년 넷스케이프 커뮤니케이션즈는 웹을 단순히 문서가 아닌 상호작용적 플랫폼으로 만들기 위한 언어를 원했습니다. 당시 웹은 정적인 `HTML` 페이지 중심이었고, 사용자 상호작용은 서버요청 (`Request/Response`) 단위로만 가능했습니다.

따라서 훗날 `JavaScript` 가 되는 경량 스크립트 언어를 개발하는 게 목표였지요.

조금 자세히 들어가보자면

### 설계

1. 프로토타입 기반 객체 지향 : `class`중심이 아닌 객체를 복제하여 새로운 객체를 만드는 프로토타입 기반의 동적 언어 (오늘날 사용하는 `__proto__` 및 프로토타입 체인의 근간)
2. 함수는 일급 객체로 취급 : 함수가 변수에 할당되거나, 다른 함수에 인자로서 전해질 수 있음
3. 이벤트 중심 구조 : 이벤트 리스너 중심의 구조

### 1995년 5월

`Mocha`가 탄생합니다. 이 언어는 10일만에 설계 및 구현되었습니다.
목표는 `Scheme`이나 `Self` 같은 함수형 언어의 아이디어를 계승하며, 구문은 당시 가장 인기있던 `Java`와 비슷하게 만드는 것이었습니다.

### 1995년 9월

`Mocha`는 `LiveScript`로 바뀌었습니다. 이는 Netscape의 웹 서버 기술인 `LiveWire`와의 연관성을 보여주기 위함이였지요

- `LiveWire` : Netscape의 서버 LiveScript 실행 환경

### 1995년 12월

`LiveScript`는 또 이름을 바꿉니다. `JavaScript`로 말이죠.

Sun의 `Java`가 IT업계의 주류로 떠오르자, Netscape는 마케팅적 이유로 `LiveScript`를 `JavaScript`라는 이름으로 개명해버립니다...

이는 `Java`의 명성에 편승하기 위한 노골적인 마케팅 전략이었고, 이 과정에서 `Sun Microsystems`가 `JavaScript`의 상표권을 소유하게 되었습니다.

### 2009년

이후 `Oracle`이 `Sun Microsystems`를 인수하여, `JavaScript`의 상표권을 소유하게 됩니다.

### JS의 초기 역할

초기 `JavaScript`의 역할은 한정적이었습니다.

간단히 사용되던 예시를 보자면,

- 폼 유효성 검사 : 서버로 전송하기 전, 입력 오류를 클라이언트에서 미리 체크하는 기능
- 간단한 DOM 조작 : 마우스 오버 시 이미지 변경과 같은 제한적 동적 효과 구현

이정도가 있었겠네요.

### 짚어두기

- `Java` : 컴파일 되어 실행되는 정적 타입 언어
- `JavaScript` : 인터프리터 기반의 동적 타입 언어.

즉 단순한 마케팅적 이유로 급조된 명칭.

## 표준화 - ECMA의 탄생

### 브라우저 전쟁과, 파편화

JavaScript의 성공을 본 MS는 익스플로러에 JScript 라는 JS와 유사하지만 미묘한 차이가 있는 언어를 탑재했습니다. 이런 미묘한 차이로 브라우저마다 코드를 다르게 작성해야하는 파편화가 발생했습니다.
이런 혼란을 해결하고 언어의 통일성을 보장하기 위해, `Netscape`와 `Sun`은 자바스크립트를 표준화 기관에 제출하기로 결정했습니다.

**1996년** : 유럽 컴퓨터 제조업체 연합 (ECMA International)에 제출

**1997년** : `JavaScript`의 표준을 ECMA-262라는 이름으로 출판했고, 이 표준에 정의된 언어를 공식적으로 `ECMAScript`로 명명

#### 용어 설명

- `JavaScript` : Netscape에서 처음 개발된 언어의 이름이자, 현재 Oracle이 상표권을 소유한 이름
- `ECMAScript(ES)` : `JavaScript`의 공식적 표준 사양을 정의하는 이름
- `ECMAScript Engine` : JS/ES 코드를 해석하고 실행하는 브라우저나 런타임의 내부 모듈(ex: v8)

이 시점부터 언어의 표준은 `ECMAScript`가 되었고, `JavaScript`는 표준의 가장 유명한 구현체가 되었다고 볼 수 있지요.

### ECMA 표준의 발전과 ECMAScript 6 (ES6)

ECMA에서 아무래도 가장 큰 이벤트로 따지자면, ECMAScript 6 (ES6)의 발표라고 볼 수 있을 것 같습니다.

#### 도입된 기능

- `class` 및 `module` : 객체지향 및 모듈화 지원
- `let/const` : 블록 스코프 변수의 도입
- `Promise` 및 `Arrow Function` : 비동기 및 함수형 프로그래밍 패턴 강화

요즘 사용되는 대부분의 문법은 ES6 이후의 문법으로 봐도 무방합니다.

이렇게 변화를 거치며 JavaScript는 스크립팅 언어를 넘어 "제대로 된" 프로그래밍 언어가 되었다고 할 수 있겠습니다.

또한 다음과 같은 여러 사건으로, JavaScript 자체의 위상이 조금씩 변하기 시작합니다.

## 풀스택 언어가 되다.

### Node.js의 등장과 변화

> 브라우저야 안녕~

JavaScript가 웹페이지를 넘어 서버와 데스크톱까지 진출할 수 있었던 가장 결정적인 사건은 2009년 라이언 달(Ryan Dahl)이 발표한 `Node.js`입니다.

#### 서버 측 런타임

즉. 웹 브라우저가 아닌 환경에서 Google의 V8엔진을 이용하여 JS 코드를 실행할 수 있게 되었습니다.

JS가 프론트 뿐 아니라 서버에서도 (백엔드) 주요 언어로 사용될 수 있게 된 것이죠.

Node.js는 비동기 및 논블로킹 I/O 모델을 기반으로 하여 서버가 수많은 동시 연결을 효율적으로 처리할 수 있게 하는 기본이 됩니다.

### 프론트엔드 아키텍처의 전환

이전에는 JS가 간단한 유효성 검사, 간단한 DOM 조작에 그쳤다고 한다면, Node.js의 등장으로 서버와 클라이언트를 다루는 풀스택 언어로 성장했습니다. 이와 동시에 프론트엔드 자체의 역할도 급격히 성장했습니다.

- 스타일링 이상의 역할: 단순한 DOM 조작을 넘어, SPA(Single Page Application) 아키텍처가 대세가 되었습니다.
- 컴포넌트 기반 개발: React와 Vue와 같은 라이브러리/프레임워크의 등장은 UI를 재사용 가능한 컴포넌트 단위로 분해하고, 복잡한 상태 관리를 효율적으로 처리할 수 있게 했습니다. 프론트엔드는 이제 서버에서 데이터만 받아와 복잡한 비즈니스 로직을 처리하는 애플리케이션의 핵심 영역이 되었습니다.

# 마무리 & 다음 글 미리보기

`JavaScript`는 태어난 지 30년이 채 되지 않아, 웹 페이지의 작은 스크립트에서 서버와 클라이언트 모든 분야에서 활약하는 풀스택 언어로 성장했습니다. 이러한 눈부신 발전은 ECMA의 표준화 노력과, Node.js, React, Vue와 같은 **오픈소스 커뮤니티**의 지속적 기여 덕분에 가능했습니다.

하지만 이 언어의 이름인 "JavaScript"가 여전히 **Oracle**이라는 거대 기업의 상표로 남아 있다는 사실 또한 남아있습니다. 이 상황은 **"오픈소스 생태계의 자유로운 발전"**과 **"대기업의 지적재산권 방어"**라는 두 가지 가치가 첨예하게 대립하고 있음을 보여줍니다.

## 미리보기

1부에서 JavaScript의 탄생, 상표권의 뿌리, 그리고 언어의 성장을 살펴봤습니다.

다음 2부에서는 1부에서 가볍게 다룬 상표권이 어떻게 현실의 **법적 분쟁**으로 번졌는지 다룹니다.

Node.js의 창시자 라이언 달(Ryan Dahl)과 새로운 `JavaScript` 런타임 `Deno`가 왜 Oracle을 상대로 상표 취소를 청원했는지, 그 과정에서 드러난 **세 가지 핵심 법적 쟁점(일반명사화, 상표 포기, 사기)**에 대한 **Deno 측의 입장 번역**과 함께, **Oracle의 반론** 및 일부 개발자 커뮤니티의 중론을 통해 다양한 관점에서 소개시켜드리고자 합니다.

---

> 본 시리즈는 총 2부로 구성됩니다.

---

**출처**

[레딧 - Oracle Owns "Javascript", so Apple is taking down my app! ](https://www.reddit.com/r/javascript/comments/8d0bg2/oracle_owns_javascript_so_apple_is_taking_down_my/?show=original)

["자바스크립트는 공공재" 디노랜드, 오라클 상표권 박탈 청원서 제출](https://www.itworld.co.kr/article/3613550/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%8A%94-%EA%B3%B5%EA%B3%B5%EC%9E%AC-%EB%94%94%EB%85%B8%EB%9E%9C%EB%93%9C-%EC%98%A4%EB%9D%BC%ED%81%B4-%EC%83%81%ED%91%9C.html)

[Oracle, it's time to free JavaScript.](https://javascript.tm/letter)

[Stackoverflow Developer Survey](https://survey.stackoverflow.co/2025/technology#most-popular-technologies-language)

_이 포스팅은 자바스크립트와 관련된 상표권 분쟁을 다루며, 이 사건에 대한 내용은 작성자의 주관이 반영되어있을 수 있습니다._

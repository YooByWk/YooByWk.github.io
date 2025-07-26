---
layout: post
title: "이런저런 언어별 날짜 / 시간 출력"
subtitle: 꽤 중요하고 귀찮다.
categories: [개발]
toc: true
date: 2025-07-27
banner: /assets/images/blog/2025-06-04-domain/banner.png
---

# 왜 날짜는 생각보다 어려운걸까

사람은 날짜를 표현하는게 쉽지만...

사실 모두가 알 것이다.

외국 한 번 나가서 생활하면 지금까지 내가 쓰던건 그냥 나만 아는 그런 표기법이라는 사실을.

근데 온갖 프로그래밍 언어에서도 마찬가지인 것 같다.

그래서 정리한다. 

이름하야 "언어별 포매팅" 

## JS/TS

`Date` 객체를 통해 시간을 다룬다. 

브라우저 환경에서 돌아가는게 보통(이었으니까) 시간대를 지정하는것이 중요하고 더불어 특정 시간대를 지정할 필요도 있으니까...

### 현재 날짜 / 시간 가져오기
`Date` 객체는 `new Date()`를 통해 현재 시스템의 날짜와 시간을 기준으로 생성한다.

```js
const now = new Date();
console.log(now); //  Sat Jul 26 2025 13:16:39 GMT+0900 (대한민국 표준시)
```


### 날짜/시간 포매팅 (feat. Intl.DateTimeFormat)
[Intl.DateTimeFormat](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Intl)은 국제화(Internationalization) API의 일부로, 언어 및 지역 설정에 따라 날짜와 시간을 유연하게 포매팅할 수 있는 것 같다.

```js
const now = new Date();

// 'yyyy-MM-dd' 형식으로 포매팅 (서울 시간대 기준)
// 'ko-KR'은 한국어 및 대한민국 지역 설정을 의미한다.
const formatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',   // 4자리 연도 (예: 2025)
    month: '2-digit',  // 2자리 월 (예: 07)
    day: '2-digit',    // 2자리 일 (예: 26)
    timeZone: 'Asia/Seoul' // 시간대 지정 (매우 중요!)
});

const formattedDate = formatter.format(now);
console.log("Intl.DateTimeFormat으로 포매팅된 날짜 (서울):", formattedDate);
// 출력 예: 2025. 07. 26. (브라우저나 Node.js 환경에 따라 '.' 대신 '-'가 올 수도 있다.)

// 'yyyy-MM-dd HH:mm:ss' 형식으로 포매팅
const fullFormatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false, // 24시간 형식 사용
    timeZone: 'Asia/Seoul'
});

const formattedDateTime = fullFormatter.format(now);
console.log("Intl.DateTimeFormat으로 포매팅된 날짜/시간 (서울):", formattedDateTime);
// 출력 예: 2025. 07. 26. 13:16:39

// 때로는 원하는 형식이 Intl.DateTimeFormat으로 직접 표현하기 어려울 때가 있다.
// 그럴 땐 Date 객체의 메서드를 조합해서 직접 만들 수 있다.
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1, 두 자리로 패딩
const day = String(now.getDate()).padStart(2, '0');       // 두 자리로 패딩

const customFormattedDate = `${year}-${month}-${day}`;
console.log("직접 구성한 날짜:", customFormattedDate);
// 출력 예: 2025-07-26

// TypeScript의 경우, 타입 추론 덕분에 자바스크립트 코드와 거의 동일하게 사용된다.
// 변수 타입만 명시적으로
```

## Java

> 단 Java 8 부터 일걸요


### 현재 날짜 / 시간 가져오기.


`java.time`

```java
// Java
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter; // 포매팅을 위해 필요

public class DateTimeExample {
    public static void main(String[] args) {
        // 현재 날짜만 가져오기 (시간 제외)
        LocalDate today = LocalDate.now();
        System.out.println("현재 날짜 (YYYY-MM-DD): " + today);
        // 출력 예: 2025-07-26

        // 현재 날짜와 시간 가져오기 (시스템 기본 시간대)
        LocalDateTime now = LocalDateTime.now();
        System.out.println("현재 날짜/시간 (시스템 기본): " + now);
        // 출력 예: 2025-07-26T13:16:39.123456789

        // 특정 시간대의 현재 날짜와 시간 가져오기
        ZonedDateTime seoulTime = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));
        System.out.println("현재 날짜/시간 (서울 시간대): " + seoulTime);
        // 출력 예: 2025-07-26T13:16:39.123456789+09:00[Asia/Seoul]
    }
}
```


### 날짜/시간 포매팅 (DateTimeFormatter)
`DateTimeFormatter`는 패턴 문자열을 사용해서 원하는 형식으로 날짜와 시간을 출력할 수 있게 해준다. `.ofPattern()` 메서드로 패턴을 정의하면 된다.


```java
// Java
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

public class DateTimeFormattingExample {
    public static void main(String[] args) {
        LocalDateTime now = LocalDateTime.now();
        ZonedDateTime seoulTime = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));

        // 'yyyy-MM-dd' 형식으로 포매팅
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String formattedDate = now.format(dateFormatter);
        System.out.println("포매팅된 날짜 (yyyy-MM-dd): " + formattedDate);
        // 출력 예: 2025-07-26

        // 'yyyy-MM-dd HH:mm:ss' 형식으로 포매팅 (24시간)
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        String formattedDateTime = now.format(dateTimeFormatter);
        System.out.println("포매팅된 날짜/시간 (yyyy-MM-dd HH:mm:ss): " + formattedDateTime);
        // 출력 예: 2025-07-26 13:16:39

        // 'yyyy년 MM월 dd일 a hh시 mm분 ss초' 형식으로 포매팅 (오전/오후 포함)
        DateTimeFormatter koreanFormatter = DateTimeFormatter.ofPattern("yyyy년 MM월 dd일 a hh시 mm분 ss초");
        String formattedKorean = seoulTime.format(koreanFormatter); // ZonedDateTime에도 적용 가능
        System.out.println("한국어 형식 날짜/시간: " + formattedKorean);
        // 출력 예: 2025년 07월 26일 오후 01시 16분 39초

        // ISO 8601 형식 (UTC)
        DateTimeFormatter isoUtcFormatter = DateTimeFormatter.ISO_INSTANT;
        // ZonedDateTime을 Instant로 변환하여 UTC ISO 형식으로 포매팅
        String isoUtcDateTime = seoulTime.toInstant().format(isoUtcFormatter);
        System.out.println("ISO 8601 UTC 형식: " + isoUtcDateTime);
        // 출력 예: 2025-07-26T04:16:39.123Z (서울 시간대가 UTC +9이므로 9시간 빼서 출력)
    }
}
```

## Solidity

> 블록체인인지라 딱히 중앙 서버는 없음.

고로 블록의 시간을 가져오자.

### 현재 블록 타임스탬프 가져오기
`Solidity`에서는 `block.timestamp`를 사용해서 현재 블록의 Unix 타임스탬프(Epoch Time)를 가져온다...

 UTC 기준으로 가져온다는 것도 중요함.

```solidity
// Solidity (solc >= 0.8.0)
pragma solidity ^0.8.0;

contract TimeContract {
    uint public currentBlockTimestamp; // 현재 블록의 타임스탬프를 저장할 변수

    function getTimestamp() public view returns (uint) {
        // block.timestamp는 현재 블록의 Unix 타임스탬프(초)를 반환한다.
        return block.timestamp;
    }

    function setTimestamp() public {
        // 함수가 호출될 때의 블록 타임스탬프를 기록
        currentBlockTimestamp = block.timestamp;
    }

    // 다른 날짜/시간 관련 연산 (주의: 오프체인에서 날짜/시간으로 변환 필요)
    function isPastDeadline(uint _deadlineTimestamp) public view returns (bool) {
        // 특정 마감 시간이 현재 블록 시간보다 지났는지 확인
        return block.timestamp > _deadlineTimestamp;
    }

    // 예시: 1주일 후의 타임스탬프 계산
    function getTimestampAfterOneWeek() public view returns (uint) {
        return block.timestamp + 7 days; // 7 days는 7 * 24 * 60 * 60 초를 의미
    }
}
```

### 포매팅

어... 

이 작업은 오프체인에서 직접 진행하길 바람

블록체인 환경은 리소스가 제한된 환경.

## Shell (언어인가..?)


Shell 스크립트는 프로그래밍 언어라기보단 명령어 실행 환경에 가깝지만, 시스템 관리나 자동화 스크립트에서 날짜/시간은 필요하다고 생각된다. 

 특히 date 명령어는 터미널에서 시간을 확인하고 포매팅 가능! 
 
 ### 날짜 / 시간 포매팅(date 명령어)
 
 date 명령어는 + 옵션과 함께 포매팅 코드를 사용해서 원하는 형식으로 출력 可다.
 
 ```bash
 
 # Shell

# 'YYYY-MM-DD' 형식
date +%Y-%m-%d
# 출력 예: 2025-07-26

# 'YYYY-MM-DD HH:mm:ss' 형식
date +%Y-%m-%d\ %H:%M:%S
# 출력 예: 2025-07-26 13:16:39

# 'YYYY년 MM월 DD일 H시 M분 S초' 형식
date +"%Y년 %m월 %d일 %H시 %M분 %S초"
# 출력 예: 2025년 07월 26일 13시 16분 39초

# Unix 타임스탬프 (초)
date +%s
# 출력 예: 1753551400 (초 단위)

# 특정 시간대로 변경해서 출력 (환경 변수 TZ 설정)
TZ="America/New_York" date +"%Y-%m-%d %H:%M:%S %Z"
# 출력 예: 2025-07-25 23:16:39 EDT

# 특정 날짜를 다른 형식으로 출력
date -d "2024-01-01 10:30:00" +"%A, %B %d, %Y - %I:%M %p"
# 출력 예: Monday, January 01, 2024 - 10:30 AM
```

---

# 결론?
 
'딸깍' 하고 싶었지만 어려운 이 날짜의 세계...
 
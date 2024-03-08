
# Smart Contract 2

## 내용 요약
<details>
<summary>
  약간의 타입  
</summary>
<div markdown='1'> 
   
  1. <code>address</code> : 주소 자료형. 주소를 받는다
  2. <code> uint</code> : 부호 없는 정수
  3. <code> bool</code> : true / false 
</div>
</details>

<details>
<summary>
생성자 함수 & 제어자 & 메서드
</summary>
<div markdown='1'> 
  1. <code>constructor</code> (함수) : 스마트 계약을 배포할 때 실행되는 함수  
  2. <code>modifier</code> (제어) : 함수에 사용하는 에드온으로 추가적 논리를 작성
     1. <code>require</code>
     2. <code>_;</code> : 본문코드로의 시작을 알린다.
     3. 파이썬의 데코레이터를 만드는 느낌 같았다.
  3. <code> returns (자료형)</code> : 함수의 return 타입을 정함
  4. `transfer` : aaa.transfer라면 aaa에게 송금한다.
</div>
</details>

<details>
<summary>
속성 & 키워드 & +a
</summary>
<div markdown='1'> 
  
  1. <code>payable</code> : 지불이 가능하다는 것 
  2. <code>public</code> : 함수 외부에서도 함수에 접근 가능
  3. <code>msg</code> : message
     1. <code>msg.sender</code> : 배포자 (deploy)
     2. <code>value</code> : 전송하는 이더의 양
  4. <code>mapping (키 타입 => value 타입)접근제한자(ex: public) 이름</code> : map을 만듦
</div>
</details>

## Will 만들기

### 필요한 것 - solidity 자료형

| 필요항목 | 자료형 | 
| ---   | ---  |
| 재산 소유자 or 주소|  address  |
|소유자의 사망여부| bool   |
|재산|  uint  |
|받을 사람|   addres payable[] |


- Address :  주소 타입. 유저의 고유 아이디 또는 배포된 스마트 컨트랙트의 아이디

- uint{숫자} : 바이트 기준으로 정수의 타입을 지정할 수 있다


### solidity의 생성자 함수 & 속성 키워드
`constructor`  
: solidity 스마트 계약을 배포할 떄 실행되는 함수

- `public` :  계약 밖에서도 함수를 호출 할 수 있다.
- `payable` : 대상이 이더를 보내고 받을 수 있게 한다.
  ```solidity
    // 1.
      constructor() payable public {
        owner = msg.sender,
        ...
      }
    // 2. 
      address payable[] ArryName
  ```

  ---

- `msg` : message
  - `sender` : 발신자 (호출 & 실행) / 계약을 배포한 사람의 주소 
    ```solidity
    onwer = msg.sender  // owner가 누구건간에 address를 대표한다.
    // 유서라면 : 유언장 작성자겠죠?
    // 계약을 호출하고 실행하는 사람 = owner
    ```
  - `value` : 전송하는 eth 의 양

### solidity의 제어자 
`modifier` : 함수에 사용하는 애드온으로 추가적 논리를 생성

- `require` : if문 같은 조건문을 입력
- `_` : 다음 함수로 이어진다는 뜻 ~~같음~~

### 배열 
> []배열이름  
> 크게 다른게 없다.  
> `address payable[] ArryName` 이렇게 명시해줘도 ok

### Mapping ()
> js 의 객체 같은 것?
  ```solidity
    mapping( 키의 타입 => 값의 타입) 매핑 이름
    // 화살표 꼭 써야합니다.
  ```
  사용 :   
  - 매핑이름[키 값] = 값


```solidity
pragma solidity >= 0.7.0 < 0.9.0;

contract AddressWallets {

    address payable[] investorWallets;
    address owner;
    mapping(address => uint) investors;

    function payInvestors(address payable wallet, uint amount) public {
        investorWallets.push(wallet);
        investors[wallet] = amount;
    } 

    function checkInvestors() public view returns (uint256) {
        return investorWallets.length;
    }
}

```

will  끝 이 아님!
---

![codeIMG](https://1drv.ms/i/c/60d1136c8e1eeac5/IQP_qJgUF5tiSaOGFJqbUHjkAZr0PIeFR46Fql3y_26x0AQ?width=1024)

    1. mapping에 익숙해지자
    2. 함수, 타입, payable 이해하기
    3. constructor 개념 숙지하기
    4. modifier 개념 숙지하기


### for ; 자바스크립트랑 동일합니다.
> ```solidity
> for (타입 init; condition; increment ) {
>   code...
> }
> ```
---
: private : 비공개임.

### transfer 
> 돈을 이체한다.
>
> `transfer`은 항상 금액을 인수로 가진다.
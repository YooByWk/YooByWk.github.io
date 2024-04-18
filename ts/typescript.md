# 타입스크립트

## 타입스크립트 개요

참고로 일반 환경에서 안됨. - ts 는 컴파일러이기도 함.  
스크립트 실행 전 코드 오류 확인 기회가 생김  
기능 + 작업방식 + 에러체크

사용 이유 :
`console.log('1'+'2') = 12` 코드상 문제는 없지만, 기대한 기능은 아닐것임. 이러한 상황을 방지하는 장점으로 인해 사용됨

```js
function add(num1, num2) {
  return num1 + num2;
}
console.log(add(1, 2)); // 자스는 입력이 언제나 문자열임.
```

TypeScript 설치 :
`node`가 필요함! (npm)으로 받으니까!
`npm install -g typescript` 로 설치하자.

"+" 의 역할 ?

컴파일 해보기 :
`tsc 파일이름`

```ts
const button = document.querySelector("button")!;
const input1 = document.getElementById("num1")! as HTMLInputElement;
const input2 = document.getElementById("num2")! as HTMLInputElement;

function add(num1: number, num2: number) {
  return num1 + num2;
}

button.addEventListener("click", function () {
  console.log(add(+input1.value, +input2.value));
});
```

얘를 컴파일했더니~

이렇게 되었습니다.

```js
var button = document.querySelector("button");
var input1 = document.getElementById("num1");
var input2 = document.getElementById("num2");
function add(num1, num2) {
  return num1 + num2;
}
button.addEventListener("click", function () {
  console.log(add(+input1.value, +input2.value));
});
```

사용 의의 : 오류를 줄이고, 조금 더 확실한 타입으로 명확한 코드를 작성할 수 있게 된다.
참고로 런타임 상에서 오류를 잡아주는 것이 아닌 개발 단계에서 개입하여 잡는다는 생각을 하면 편하다. "실수를 알려준다"
: 잘못된 타입의 데이터가 사용되거나 전달되는지 탐지할 수 있으므로 예기치 않은 런타임 오류를 방지할 수 있다.
- js : 런타임 중 타입을 확인
- ts : 컴파일 중 타입을 확인
### ts의 특징 :

1. 타입을 작성한다. -> 타입을 통해 원하지 않는 기능 / 로직을 막는다.
2. IDE에서 자동 완성과 내장 에러를 미리 알려준다.
3. 컴파일 된 후 사용되므로((바벨처럼)) 자바스크립트를 사용하는 브라우저에서 쉽게 사용 가능하다.
4. js에는 없는 인터페이스, 제너릭 有
5. 데코레이터 등 지원한다.
6. 다양한 설정 옵션들
7. ts가 아닌 곳에서도 잘 지원한다.

vscode 확장 path intellisense

---

## 타입스크립트 시작!

## 중요한 타입

| 타입    |               설명                |
| :------ | :-------------------------------: |
| number  | 소수점 유무, 정수 상관 X :: 숫자. |
| string  |              텍스트               |
| boolean |           true / false            |
| object | js 객체, 특정한 객체 | 
| Array | js 배열, 배열의 타입은 유연 / 제한 가능 |

**타입스크립트의 주요 원시 타입은 모두 소문자!!!**

### 타입 추론

상수나 변수에 어떤 타입을 사용했는지 _제법_ 잘 이해한다고 생각하자.   
`이 친구 꽤나 멋진 친구라구요?`
ex:

```ts
const number = 5; // 타입스크립트가 어느정도 number라고 추론한다.
let number2 = 10; // 타입스크립트가 어느정도 number라고 추론한다.
```

![alt text](Inference.png)

따라서 이러한 코드가 있을 때 저런 값에도 일일히 타입을 작성하는 것은 그닥...  
=> 중복 작업이니까.
```ts
function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  if (showResult) {
    const result = n1 + n2;
    console.log(phrase + result);
  } else {
    return (n1 + n2);
  }
}
const number1: number = 5;  // 이건 별로고
const number2 = 2.8; // 이게 낫다.
var  number3: number; // 나중에 값을 할당하겠다면 이래도 됨

const printResult = true;

const resultPhrase = 'Result is: ';
const result = add(number1, number2, printResult, resultPhrase);

```
타입 추론은 직접 타입을 할당하지 않아도 되게 함. 단 추론된 타입이 아닌 경우 에러가 발생한다.
```ts
let res = true
res = 3 // 'number' 형식은 'boolean' 형식에 할당할 수 없습니다.
```
### 객체
객체 내부 요소도 추론되는 듯 하다.  z
```ts
const person = {
  name: 'Sergio',
  age: 28,
};
```
타입 스크립트가 추론한 객체 타입.
![alt text](Inference2.png)  


 이렇게 객체의 정보를 줄 수도 있어요.
```ts
const person: {
  name: string;
  age: number;
} = { // 특정 객체 타입을 위한  {}를 사용
  name:'Sergio',
  age: 28,
};
```
![alt text](object.png)  
잘 나옵니당 그런데 ts가 추론하도록 두는게 낫다고 합니다.

### 중첩된 객체 및 타입

js 예시: 
```js
const product = {
  id: '닝닝닝닝',
  price: 12000,
  tags: ['멋진거', '돈까스'],
  details: {
    title: '뭔가뭔가',
    description: '헉 죽은 돈까스!'
  }
}
```

이 객체의 타입은 다음과 같습니다.

```ts
{
  id: string;
  price: number;
  tags: string[];
  details: {
    title: string;
    description: string;
  }
}
```
### 배열
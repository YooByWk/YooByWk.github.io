# 스택

## 개요

**스택(Stack)** 은 데이터를 **후입선출(LIFO, Last-In, First-Out)** 방식으로 저장하는 선형 자료구조다.

가장 나중에 저장된 데이터가 가장 먼저 인출(제거)된다.

접시를 쌓아 올리거나, 팬케이크를 쌓고 먹는 순서에 비유될 수 있다.

항상 한 쪽 끝(Top)에서만 삽입(Push)와 삭제(Pop) 작업이 일어난다.

---

## 개념

|   용어    |                           설명                            | 시간 복잡도 |
| :-------: | :-------------------------------------------------------: | :---------: |
|    Top    |    데이터의 삽입과 삭제가 일어나는 스택의 최상단 위치     |      -      |
|   Push    |            스택의 Top에 데이터를 삽입하는 연산            |   $O(1)$    |
|    Pop    | 스택의 Top에 있는 데이터를 삭제하고 그 값을 반환하는 연산 |   $O(1)$    |
| Peek(Top) |  스택의 Top에 있는 데이터를 삭제하지 않고 확인하는 연산   |   $O(1)$    |

모든 주요 연산은 원칙적으로 **$O(1)$** 의 시간 복잡도를 가진다.

---

## 활용

스택의 LIFO 특성은 최근의 정보를 먼저 처리해야 하는 다양한 상황에 적용될 수 있다.

- **함수 호출 스택 (Call Stack)** : 프로그램에서 함수가 호출될 때 마다 스택 프레임이 쌓이고, 함수가 종료되면 해당 프레임이 Pop 된다.
- **재귀 (Recursion)** : 재귀 호출이 발생할 때 내부적으로 스택을 사용한다.
- **수식 계산** : 후위 표기법 수식 계산에서 사용된다
- **브라우저 뒤로가기 / 앞으로 가기** : 방문 기록을 스택에 저장하여 사용한다.
- **실행 취소와 다시 실행** : 각 명령을 스택에 쌓는다.

## 구현

스택은 일반적으로 배열이나, 연결 리스트를 기반으로 구현될 수 있다.

### JavaScript (ES6+ 기준)

JavaScript에서는 내장 배열(`Array`)의 메서드를 활용하여 가장 쉽게 구현할 수 있다.

```js
class Stack {
  constructor() {
    this.items = []; // 내부적으로 배열을 사용
  }

  push(element) {
    this.items.push(element); // 배열의 끝(Top)에 삽입
  }

  pop() {
    if (this.isEmpty()) {
      return "스택이 비었습니다.";
    }
    return this.items.pop(); // 배열의 끝에서 제거하며 반환
  }

  peek() {
    if (this.isEmpty()) {
      return "스택이 비었습니다.";
    }
    // 최상단 요소의 인덱스는 this.items.length - 1
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}
```

실제 사용 예시 - 간단하게 구현하여 사용한다.

```js
const st = [];
st.push(1);
st.push(2);

const topElement = st[st.length - 1]; // 2
const poppedElement = st.pop(); // Pop: 2
```

`Push`와 `Pop`의 경우 배열의 끝에서 동작하므로 $O(1)$

> `shift`나 `unshift` 같은 경우 배열의 모든 요소를 이동시키므로 $O(N)$

### Rust

Rust에서는 `Vec<T>`를 사용하여 구현할 수 있다.

동적 크기 조절과, 끝에서의 $O(1)$ 연산을 지원한다.

```rust
fn main () {
  let mut st : Vec<isize> = Vec::new();
  st.push(1);
  let top  = st.pop() // Option<T> (Some(1) 또는 None 반환)
}
```

## 스택의 종류와 활용

### 1. 기본 스택(Standard Stack)

LIFO 원칙을 따르는 가장 기본적인 형태의 스택. 특별한 제약 없이 데이터를 저장하고 관리한다.

### 2. 단조 스택(Monotonic Stack)

단조 스택은 스택 내부의 요소들이 단조 증가/감소 하는 순서를 유지하도록 하는 스택이다.

- 새로운 요소가 삽입될 때 스택의 단조성을 깨뜨리는 기존 요소들은 모두 제거된다.
- 오른쪽 / 왼쪽의 더 큰/작은 요소 찾기와 같은 경우 $O(N)$ 으로 찾는데 유용하다.

> 단조 증가 / 단조 감소 => 단조함수
>
> 함수값이 일정하게 증가하거나 감소하는 함수를 의미한다.
>
> 해당 함수의 그래프는 왼쪽에서 오른쪽으로 계속 올라가거나, 계속 내려가는 모양을 가진다.

## 관련 문제

- [백준 - 괄호](https://www.acmicpc.net/problem/9012)
- [프로그래머스 - 짝지어 제거하기](https://school.programmers.co.kr/learn/courses/30/lessons/12973)
- [프로그래머스 - 주식 가격](https://school.programmers.co.kr/learn/courses/30/lessons/42584)
- [백준 - 스택2](https://www.acmicpc.net/problem/28278)

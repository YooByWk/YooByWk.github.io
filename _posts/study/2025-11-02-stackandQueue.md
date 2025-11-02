---
layout: post
title: "스택과 큐"
subtitle: "쉽지 않은 것"
categories: CS
tags: [CS, Algorithm]
toc: true
date: 2025-11-02
series: ["개인공부"]
---

개발자로 성장할 수 있을까 하는 불안감이 가시질 않는다.

하지만 멈춰있으면 정말 끝나는 것!

그렇기에 운동을 다시 시작하듯, 기본 개념부터 잡아가면서 차근차근 올라가는 것이 필요하다고 생각한 시점.

언젠가 정리해야지 정리해야지 하다가 드디어 해본다.

그래서 오늘은 매우 간단한 기본 개념이다.

# 스택

LIFO - Last In First Out

나중에 들어간 정보가 제일 먼저 나온다.

팬 케이크 쌓아놓고 위에부터 먹는 느낌

항상 한 쪽 끝(Top)에서만 삽입(Push)와 삭제(Pop)이 일어난다.

## ADT (추상적 자료형)

|   용어    |                           설명                            | 시간 복잡도 |
| :-------: | :-------------------------------------------------------: | :---------: |
|    Top    |    데이터의 삽입과 삭제가 일어나는 스택의 최상단 위치     |      -      |
|   Push    |            스택의 Top에 데이터를 삽입하는 연산            |   $O(1)$    |
|    Pop    | 스택의 Top에 있는 데이터를 삭제하고 그 값을 반환하는 연산 |   $O(1)$    |
| Peek(Top) |  스택의 Top에 있는 데이터를 삭제하지 않고 확인하는 연산   |   $O(1)$    |

모든 주요 연산은 원칙적으로 O(1)의 시간 복잡도를 가진다.

## 활용

- **함수 호출 스택 (Call Stack)** : 프로그램에서 함수가 호출될 때 마다 스택 프레임이 쌓이고, 함수가 종료되면 해당 프레임이 Pop 된다.
- **재귀 (Recursion)** : 재귀 호출이 발생할 때 내부적으로 스택을 사용한다.
- **수식 계산** : 후위 표기법 수식 계산에서 사용된다
- **브라우저 뒤로가기 / 앞으로 가기** : 방문 기록을 스택에 저장하여 사용한다.
- **실행 취소와 다시 실행** : 각 명령을 스택에 쌓는다.

## 자바스크립트에서의 구현

내장 배열 `Array`의 메서드를 활용하여 쉽게 구현 가능하다.

```js
class Stack {
  constructor() {
    this.items = [];
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

여기서 `Push`와 `Pop`은 배열의 끝에서 동작하기 때문에 O(1)이다.

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

## 종류와 활용

### 기본 스택

### 단조 스택

단조 증가, 단조 감소 하는 순서를 유지하게 하는 스택

- 기존의 단조성이 깨지게 된다면, 기존 요소는 모두 제거된다
- 특정 요소의 큰/작은 요소를 찾기 와 같은 경우 유용하다.

# 큐

FIFO - First In First Out

먼저 들어간 정보가 먼저 나온다.

-> 대기열과 같은 경우를 생각하면 좋다.

## ADT

|    연산     |                 설명                  | 시간 복잡도 |
| :---------: | :-----------------------------------: | :---------: |
|   Enqueue   |      큐의 `Rear`에 데이터를 삽입      |   $O(1)$    |
|   Dequeue   |  큐의 `Front`의 데이터 삭제하고 반환  |   $O(1)$    |
| Peek(Front) | `Front`의 데이터를 삭제하지 않고 확인 |   $O(1)$    |
|   isEmpty   |         큐가 비어있는지 확인          |   $O(1)$    |
|    size     |  큐에 들어있는 데이터의 개수를 반환   |   $O(1)$    |

스택과 마찬가지로 O(1)의 시간 복잡도를 가진다.

## 활용

데이터를 순차적으로 처리해야 하는 환경

- 운영체제 및 시스템의 스케쥴링
- 비동기 처리
- 알고리즘 및 데이터 처리
  - BFS
  - 스트리밍 서비스에서 데이터 전송

## 구현

일반적으로 배열 혹은 연결 리스트를 활용하여 구현한다.

### JavaScript

배열을 활용하여 구현한다면 ADT와는 다르게 O(N)의 시간 복잡도를 가진 연산이 된다. (배열의 맨 앞 요소를 제거하는 연산은 O(N) )

배열의 맨 앞에서 이루어지는 작업으로 삭제 후 나머지 요소들의 인덱스를 1씩 옮겨줘야 하기 때문임

직접 구현해서 사용하는것도 그리 어렵지는 않음!

```js
class Queue {
  constructor() {
    this.items = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }

  enqueue(element) {
    this.items[this.tailIndex] = element;
    this.tailIndex++;
  }

  dequeue() {
    if (this.headIndex === this.tailIndex) return undefined;

    const element = this.items[this.headIndex];
    delete this.items[this.headIndex];
    this.headIndex++;
    return element;
  }
  // 기타 메서드 구현
}
```

### Rust

Rust 에서는 `std::collections::VecDeque<T>`가 큐 구현체라고 봐도 무방하다.

`VecDeque` 는 양 끝 삽입/삭제를 $O(1)$에 지원하는 `Deque`로, 큐의 요구사항을 완벽히 충족한다.

```rust
use std::collections::VecDeque;
use std::option::Option

fn main() {
  let mut q: VecDeque<String> = VecDeque::new();

  // Enqueue 방법
  q.push_back(String::from("Task1"));
  q.push_back(String::from("Task2"));

  // Dequeue 방법
  let first_task = q.pop_front(); // Some("Task1") 반환

  // peek (Front 확인)
  let next_task = Option<&String> = q.front(); // Some("Task 2") 참조 반환
}
```

## 심화 개념과 다양한 큐

- 환형 큐 : 배열의 처음과 끝이 논리적으로 연결되어 O (원) 모양. 배열 기반 구현시 발생하는 메모리 낭비를 해결하고 재활용 가능
- 우선 순위 큐 : FIFO가 아닌 데이터의 우선순위에 따라 높은 우선순위를 지닌 데이터가 먼저 인출
  - 힙 자료구조를 보통 사용하여 구현
- 덱 : 스택 + 큐 = 양쪽 끝에서 데이터의 삭제와 추가가 이루어 질 수 있다

# 같이 공부하기

## 스택

- [백준 - 괄호](https://www.acmicpc.net/problem/9012)
- [프로그래머스 - 짝지어 제거하기](https://school.programmers.co.kr/learn/courses/30/lessons/12973)
- [프로그래머스 - 주식 가격](https://school.programmers.co.kr/learn/courses/30/lessons/42584)
- [백준 - 스택2](https://www.acmicpc.net/problem/28278)

화이팅...화이팅...

-뱅...-

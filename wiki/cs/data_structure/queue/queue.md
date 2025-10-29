# 큐 (Queue)

큐(Queue)는 데이터를 선입선출(FIFO, First In First Out) 방식으로 저장하는 선형 자료구조다.
가장 먼저 저장된 데이터가 가장 먼저 인출되는 특징을 지닌다.

현실의 예시로 줄을 서서 기다리는 대기열과 유사하다.

순서대로 처리해야 하는 시스템에서 핵심적 역할을 수행한다. 데이터의 삽입은 한쪽 끝인 `Rear`에서, 데이터의 삭제(Dequeue)는 다른 쪽 끝인 `Front/Head` 에서 이루어진다.

## 추상적 자료형(ADT)

큐는 저장된 데이터의 내부 구현 방식에 관계없이 연산 집합을 통해 정의되는 ADT이다.

큐 ADT는 다음과 같다.

|    연산     |                 설명                  | 시간 복잡도 |
| :---------: | :-----------------------------------: | :---------: |
|   Enqueue   |      큐의 `Rear`에 데이터를 삽입      |   $O(1)$    |
|   Dequeue   |  큐의 `Front`의 데이터 삭제하고 반환  |   $O(1)$    |
| Peek(Front) | `Front`의 데이터를 삭제하지 않고 확인 |   $O(1)$    |
|   isEmpty   |         큐가 비어있는지 확인          |   $O(1)$    |
|    size     |  큐에 들어있는 데이터의 개수를 반환   |   $O(1)$    |

> 참고 : 모든 주요 연산은 원칙적으로 $O(N)$ 의 시간 복잡도를 가진다.

## 활용

FIFO 특성으로 인해 데이터를 순차적으로 처리해야 하는 환경에서 사용된다.

### 운영체제 및 시스템 스케쥴링

- CPU 스케줄링 : 실행 대기 중인 프로세스를 큐에 저장하여 도착 순서대로 처리
- 입출력 (I/O) 버퍼링 : 프린터, 디스크 등 느린 장치에 대한 요청을 큐에 저장하여 관리

### 비동기 처리

- 이벤트 루프 (Node.js) : 비동기 I/O 작업 완료 후 실행될 콜백 함수들이 이벤트 큐에 저장되며 순서대로 메인 스레드로 전달

- 메시지 큐 : 분산 시스템에서 서비스 간 통신을 위해 메시지를 순서대로 전달하고 처리하는데 사용

### 알고리즘 및 데이터 처리

- 너비 우선 탐색(BFS) : 그래프 탐색 알고리즘에서 다음에 방문할 노드를 미리 큐에 저장하여 가까운 노드부터 탐색하는데 사용
- 웹 서비스의 요청이나 실시간 스트리밍 데이터 등에서 데이터가 도착하는 순서대로 처리되도록 임시 저장하는 데 필수적.

## 구현

큐는 일반적으로 배열 또는 연결 리스트를 기반으로 구현될 수 있다.

1. 연결 리스트 기반 : $O(1)$ 을 보장한다.
   - 각 노드가 데이터와 다음 노드의 주소를 가지며, `Front` & `Rear` 포인터를 유지한다
   - 삽입과 삭제 모두 포인터만 변경하면 되므로 $O(1)$을 보장한다.

### JavaScript 구현

1. Array의 `shift()`와 `push()`를 활용하는 경우 push는 $O(1)$ 이지만, `shift()`는 나머지 요소를 이동시키므로, $O(N)$의 시간 복잡도를 가진다. 대규모 처리에서는 문제가 발생할 수 있다.

2. 직접 구현

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

### Rust 구현

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

## 큐의 심화 개념

### 환형 큐

배열의 처음과 끝이 논리적으로 연결되어 원형 형태를 이루는 큐로 배열 기반 구현 시 발생하는 메모리 공간의 낭비(배열 앞 빈 공간) 문제를 해결하고, 배열의 크기를 효과적으로 재사용 가능하다.

### 우선순위 큐

일반적 `FIFO`가 아닌, 데이터의 우선순위에 따라 가장 높은 우선순위를 지닌 데이터가 먼저 인출되는 큐다.

보통 힙(Heap) 자료구조를 사용하여 구현되며, 삽입 및 삭제에 $O(\log N)$의 시간 복잡도를 가진다.

네트워크 트래픽 제어와, 운영체제의 작업 스케줄링과 같은 작업에 사용된다.

### 덱

데이터의 삽입과 삭제가 양쪽 끝에서 모두 일어날 수 있는 자료구조로, 스택과 큐의 기능을 모두 수행할 수 있다.

# 여담

JavaScript (Node.js)에서 알고리즘 문제를 풀 때, `shift()`를 활용한 구현을 해도 큰 문제가 없는 경우도 많다. 우선 시간초과가 나는지 확인해보고 풀어보자.

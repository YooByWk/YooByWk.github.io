---
layout: post
title: "[TIL-250917] Python 다시하기"
subtitle: 돌고 돌아 입문했던 언어로 돌아오다
categories: [Python, Algorithm]
tags: [Python, Algorithm]
toc: true
date: 2025-09-17
banner: /assets/jsLogo.png
series: "개인공부"
---

# Python 까먹기 전에 다시.

이런저런 코테 준비 겸, F1과 각종 데이터들에 대해서 조금 경량으로 구현하는 방법은 뭐가 있을까 해서 무리없이 접근 할 수 있을 것 같은 파이썬을 다시 공부하기로 했다.

이번에 도움을 줄 책은 예~전에 사두었던 "자료구조와 함께 배우는 알고리즘 입문"

싸피에서 배웠던 익숙한 내용들과, 해당 내용을 다시 한 번 배우는 느낌으로 차근차근 접근해보려고 한다.

아마 파이썬으로 알고리즘을 풀고 나서, 추후에 같은 문제를 여러가지 언어로 풀어보는 것 또한 하나의 알고리즘 학습이 될 수 있다는 생각이 들어서 바로 트라이 트라이!

_아무래도 개인 학습 정리의 성격이 강한 게시물이 될 것 같다._

# 학습내용~

## N진법 변환해보기

```py
def conv(x: int, r: int) -> str:
    """X를 r진법으로 변경한 뒤 str로 반환하는 함수."""
    d = ""  # 변환 후 문자
    dchar = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    while x > 0:
        d += dchar[x % r]
        x //= r

    return d[::-1] # 역순 출력
```

## 특정 범위 내 소수 구하기

z / y = x 가 나누어 떨어진다면

z / x = y 또한 나누어 떨어진다.

(약수는 대칭적임)

따라서 제곱근까지만.

증명...

1. 합성수 N의 가장 작은 약수를 a라고 하자.
2. N = a \* b 로 나타낼 수 있다.
3. a는 가장 작은 약수라고 정의했으므로 a <= b 가 성립한다.
4. a _ a <= a _ b (양 변에 a를 곱해도 부등식의 방향은 변하지 않는다.)
5. a^2 <= N (2번)
6. a <= sqrt(N) 다.

즉 약수 탐색은 해당 이유로, 제곱근까지만 검사하면 된다. (~~휴~~)

#### 에라토스테네스의 체

```py

def get_prime_numbers_until(x: int) -> list:
    """
    주어진 숫자 x까지의 모든 소수를 에라토스테네스의 체를 이용해 찾습니다.
    """
    if x < 2:
        return []

    primes = [True] * (x + 1)
    primes[0] = primes[1] = False

    for i in range(2, int(x**0.5) + 1):
        if primes[i]:
            for j in range(
                i * i, x + 1, i
            ):
                primes[j] = False

    prime_numbers = [i for i, is_prime in enumerate(primes) if is_prime]

    return prime_numbers
```

무난히 나오는 모습~

## 얕은 복사 깊은 복사

```py

# 얕은 복사
x = [[1,2,3], [4,5,6]]
y = x.copy()

x[0][1] = 9 # shallow copy

print(y)
[[1,9,3],[4,5,6]]

# 앗!
# 그럼 어떻게 해결하지?
# 깊은복사!
import copy

z = copy.deepcopy(x)
# 이러면 서로 상호작용 X

```

**얕은 복사** : 빠름빠름맨, 메모리 굿.

**깊은 복사** : 독립성 굿, 다만 메모리 증가, 속도 저하.

---

_뜬금없지만 자바스크립트에서 얕은 복사 / 깊은 복사는 다음과 같다._

[MDN 문서/깊은 복사](https://developer.mozilla.org/ko/docs/Glossary/Deep_copy)

**얕은 복사** :

```js
const arr = [1, 2, 3, 4];
const copied = arr.slice();
const copied2 = [...arr];
const copied3 = Array.from(arr);
```

**깊은 복사** :

```js
const arr = [1, 2, 3, 4];
const deepcopied = JSON.parse(JSON.stringify(arr));
```

~~쩝. 파이썬 멋지네...~~

---

## 마무리하며

후아...

기초중의 기초였지만... 그래도 뭔가 해냈다!

멋지다 멋지다 멋지다

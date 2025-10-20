---
layout: post
title: "[Node.js] 프로그래머스 - 모의고사 / 실패율"
subtitle: 완전탐색의 날
categories: [JavaScript, Algorithm]
tags: [JavaScript, Algorithm]
toc: true
date: 2025-10-20
banner: /assets/jsLogo.png
series: "알고리즘"
---

# 코테 준비겸 책도 산 겸.

완전탐색 & 정렬 관련 문제 풀이

오늘의 문제

[2019 카카오 블라인드 - 실패율](https://school.programmers.co.kr/learn/courses/30/lessons/42889)

[완전탐색 - 모의고사](https://school.programmers.co.kr/learn/courses/30/lessons/42840)

## 1. 모의고사

### 문제 설명 및 접근

1. 수포자들은 특정한 패턴으로 문제를 찍는다.
2. 정답 배열과 수포자들의 패턴을 비교하며, 많은 문제를 맞힌 사람을 찾는다.
3. 동점자가 있다면 오름차순으로 정렬한다.

아이디어 : 찍는 패턴이 반복되므로, 각 수포자의 답을 굳이 answer에 맞추는 것이 아닌, `i % (패턴의 길이)` 로 찾는다.

- 1번 수포자 :`[1,2,3,4,5]`
- 2번 수포자 : `[2,1,2,3,2,4,2,5]`
- 3번 수포자 : `[3,3,1,1,2,2,4,4,5,5]`

### 풀이

수포자의 패턴을 배열에 저장한 후 정답 배열을 순회하며 수포자와 비교, 누적

마지막에는 앞에서부터 탐색하며, 동일한 수포자를 저장 (오름차순)

```js
function solution(answers) {
  const answer = [];

  // 수포자들의 찍기 패턴 정의
  const supoza = [
    [1, 2, 3, 4, 5],
    [2, 1, 2, 3, 2, 4, 2, 5],
    [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
  ];

  // 각 수포자의 정답 개수
  const scores = [0, 0, 0];

  // 정답 배열을 순회하며 각 수포자의 답과 비교
  for (let i = 0; i < answers.length; i++) {
    const correct_answer = answers[i];

    for (let j = 0; j < 3; j++) {
      // j번 수포자의 i번째 문제에 대한 예측답
      // i % supoza[j].length 로 패턴 반복
      const supoza_answer = supoza[j][i % supoza[j].length];

      if (correct_answer === supoza_answer) {
        scores[j]++;
      }
    }
  }

  // 최고 점수 찾기
  const maxScore = Math.max(...scores);

  // 동점자 발생 시 오름차순 정렬 ->
  // 인덱스 순서대로 결과 배열에 추가
  for (let i = 0; i < 3; i++) {
    if (scores[i] === maxScore) {
      answer.push(i + 1); // 수포자 번호 (1, 2, 3)
    }
  }

  return answer;
}
```

## 2. 실패율

### 문제 설명 및 접근

실패율 = 스테이지 도달했으나 클리어 못한 플레이어 / 스테이지 도달한 플레이어

실패율을 계산해 높은 스테이지부터 내림차순으로 스테이지 번호를 출력

**아이디어 & 접근**

1. 도전중인 플레이어 카운트
2. 실패율 계산
3. 정렬

### 풀이

누적 인원을 관리하며, 순차적으로 실패율을 계산한다.

`Object.entries` 를 사용하여 스테이지 번호와 실패율 쌍을 정렬 가능한 배열로 변경하여 정렬, 계산한다.

```js
function solution(N, stages) {
  // 0. 각 스테이지에 멈춰있는 사용자 수를 카운트할 배열 (N+2 크기, N+1은 클리어)
  const challenge = new Array(N + 2).fill(0);

  // 스테이지에 멈춰있는 사용자 카운트
  for (const stage of stages) {
    challenge[stage] += 1;
  }

  // 실패율을 저장할 객체. { 스테이지 번호: 실패율 }
  const fails = {};
  let total = stages.length; // 현재 스테이지에 도달한 총 인원

  for (let i = 1; i <= N; i++) {
    const fail_count = challenge[i]; // 해당 스테이지에 멈춰있는 사람 수

    // 1. 스테이지에 도달한 유저가 없는 경우 (total이 0)
    if (total === 0) {
      fails[i] = 0;
      // total이 0이므로 이후 스테이지는 모두 실패율 0이 됨.
    } else {
      // 2. 실패율 계산: 멈춘 사람 수 / 도달한 사람 수
      fails[i] = fail_count / total;
    }

    // 다음 스테이지를 위해, 현재 스테이지에 멈춰있는 사람만큼 total에서 제외
    total -= fail_count;
  }

  // 3. 정렬 로직
  // Object.entries로 [ [스테이지번호(문자열), 실패율(숫자)], ... ] 배열 생성
  const res = Object.entries(fails).sort((a, b) => {
    const stageA = Number(a[0]);
    const failRateA = a[1];
    const stageB = Number(b[0]);
    const failRateB = b[1];

    // 실패율이 다르면 실패율 기준 내림차순 정렬 (b[1] - a[1])
    if (failRateA !== failRateB) {
      return failRateB - failRateA;
    }

    // 실패율이 같으면 스테이지 번호 기준 오름차순 정렬 (a[0] - b[0])
    return stageA - stageB;
  });

  // 결과 배열에서 스테이지 번호(문자열)만 추출하여 숫자로 변환 후 반환
  return res.map((e) => Number(e[0]));
}
```

# 후기

아. 어렵다.

조금 더 시간을 들여서 의사코드를 열심히 작성해서 문제를 접근하는 연습이 필요할 것 같다.

그리고 함수로 나눠서 구현하는 것이 훨씬 좋을 것 같으니까. 해당 부분도 노력하는 방향으로.

추가적으로 `Object.entries()` 와 같은 것들과 조금 더 많이 친해질 필요가 있겠다는 생각.

이것저것 바쁘군.

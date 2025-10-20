---
layout: post
title: "농부는 대체되었다"
subtitle: 코딩 게임?
categories: [etc]
tags: [etc]
toc: true
date: 2025-10-18
---

# 엥 코딩 게임?

엥?

정말 간만에 보는 코딩 게임

예전에 비트버너인가. 했다가 방치형 전기세 게임인 것 같아서 금방 접어버린 기억이 있다.

하지만 이번에도 참지 못하고 질러버린

이름하야 농부는 대체되었다.

게임이긴 하지만, 코드를 조금 게임으로 재밌게 즐겨보자는 마음으로 포스팅을 남겨보고자 한다.

싸피시절 많이 보던 "게이미피케이션"을 직접 찾아서 츄라이 츄라이

---

![alt text](/assets/images/blog/2025-10-18-farmer/image.png)

벌써 터미널이 보이니 아찔한 것.

설치하며 살펴 본 도전과제는 다음과 같다.

![alt text](/assets/images/blog/2025-10-18-farmer/image-1.png)

이거 완전 헬로 월드...!

## 게임에 대해 알아보자.

파이썬과 비슷하다. (근데 진짜 파이썬은 아니다)

하지만 업그레이드를 통해 기능들을 열어야 한다.

당장 변수 선언도 안되고, 반복문도 돌릴 수 없는 상황이 초기 상황이니까.

1. harvest()

수확한다. 1회 수확한다

곡물이 1 증가한다.

2. while 조건:

근데 바로 쓸 수 없는 루프??? 이런..

아무튼 while 문을 만들고 나서는

```py
# while True: 도 되는데 일단 생각난 것은 1이라서 해봤는데 된다
while 1:
  harvest()
```

이런 모양으로 수확한다.

![alt text](/assets/images/blog/2025-10-18-farmer/image-3.png)

근데 느리다. 어쩔 수 없으니 참고 수확하여, 스피드를 업그레이드 할 수 있게 해야한다.

3. do_a_flip

... 드론이 한바퀴 돈다.

의미는 없다. 이럴 시간에 수확하자는 결론.

4. change_hat(모자 이름)

이쯤 타이핑해보니 자동 완성은 되는 것 같은데. (거의 IDE 환경에 유사하다)

외부 vscode로 연동도 가능하다.

일단 모자를 바꿔보자

근데 문제가 발생했다

![alt text](/assets/images/blog/2025-10-18-farmer/image-4.png)

살다살다 임포트도 바로 못쓰게 한다니.

아이고야.

이 부분도 추후 업그레이드를 통해 해금해야 하는 것 같다.

5. 속도 업그레이드와 `can_harvest() & if`

업그레이드를 하고 나니 `if`문을 드디어 사용할 수 있게 되었다.

![alt text](/assets/images/blog/2025-10-18-farmer/image-5.png)

또한 `can_harvest()` 라는 기능또한 생겼다.

아무래도 수확하면 좋은 타이밍에 판단하고 수확하는 것 같다.

![alt text](/assets/images/blog/2025-10-18-farmer/image-6.png)

그럴사한 코드가 완성되고 있다.

6. `Hats`

Hats

모자의 종류는 아무래도

```
Hats.Gray_Hat
Hats.Purple_Hat
Hats.Green_Hat
Hats.Brown_Hat
```

4개가 있는 것 같다.

![alt text](/assets/images/blog/2025-10-18-farmer/image-7.png)

모자도 바꿔주고, 땅도 확장했다.

7. `move`

땅을 확장한 만큼 드론을 움직이며, 수확해야한다.

move는 방향 4개를 가질 수 있다.

`North` `East` `South` `West`

`move(North)` 이런 스타일.

~~슬슬 귀찮아지는걸.~~

```py
# 1차원 배열 (3칸) 기준 코드
while True:
	if can_harvest():
		harvest()
		move(North)
	else:
		continue
```

이런 느낌으로 진행해도, 알아서 돌아온다.

dfs 하듯 경계범위를 설정해야 하나 싶었지만, 딱히 그렇지는 않았다.

인덱스를 나가면 어떻게되는지 확인해본 결과, 자동으로 돌아온다.

---

![alt text](/assets/images/blog/2025-10-18-farmer/image-8.png)

한번 더 확장하여 3x3의 영역이 되었다.

결국 2차원 배열의 시대가 돌아왔다!.

대대적으로 코드를 뜯어 고칠 시간이라고 할 수 있다.

대신 밖으로 나가는지 먼저 판단할 필요가 있다.

-> 9번 `get_world_size()`

```py
# 2차원 배열  (3x3)
while True:
	# TODO: for world_size -> East
	for i in range(get_world_size()):
		if can_harvest():
			harvest()
			plant(Entities.Bush)
			if (i < get_world_size()):
				move(North)
		else:
			move(North)
			continue
	move(East)
```

8. `plant`

우선 `Entities`와 이어지는 듯 하다.

당장 가진 작물은

`Bush` (목재)와 `Grass` (건초) 정도가 있는 것 같다.

적절한 효율을 가지고 가야할 것 같은데.

우선 비율을 계산해야 한다.

9. `get_world_size()` 가 있다!

![alt text](/assets/images/blog/2025-10-18-farmer/image-9.png)

우선 이런 모양으로 이상하게 움직이게 됐지만..

어쨋든 전부 수확은 한다.

이제 균형을 맞춰서 작물을 바꿔줘야 하는 시간

오늘은 여기까지.

## 결론

현재 코드는 뭔가 미흡하긴 하지만, 우선 게임 시스템에 대해 간략히 알아본 시간이었다.
어쩄든, 맵 전체를 수확하기 시작했기 때문에 슬슬 자동화와, 코드 최적화를 통해 드론이 빠릿빠릿하게 농부를 대체할 수 있도록 해야겠다.

1일차는 여기서 종료~~

약간 알고리즘에 추가적으로 내가 접근 + 구현 + 조건 제시하는 느낌

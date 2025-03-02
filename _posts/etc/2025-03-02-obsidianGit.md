---
layout: post
title: "Obsidian 저장 및 동기화하기"
subtitle: "Obsidian 깃 연결 및 모바일 연동!"
tags: Obsidian
date: 2025-03-02
categories: [obsidian]
toc: true
banner: /assets/images/obsidian-icon.png
---

## git을 이용한 Obsidian 동기화하기

원래는 NAS에 올려서 개인 깃과 개인적으로 중요한 파일을 사용하려고 했지만

집에서 나온지 어연 N년차. 본가에 설치되어있는 NAS가 뻗어버렸다!

그런고로 github와 obsidian git을 이용해 관리하고, 조금 더 나아가 핸드폰에서도 Obsidian을 이용해보기로 결정!

그러던 도중 문제 발생!

그 문제란 바로, 핸드폰에서 어떻게 깃을 이용할 것인가!  
이런 문제가 생겨버렸다. 따라서 해당 과정을 해결하는 과정을 담은 글이 되겠다.

아. 근데 만약 git 사용법을 모르신다면... 댓글....헤헤....

댓글 달려면 github 계정이 필요한데, github로 진행하는 글이라서 github로 옵시디언 관리한다 생각하시고 아이디 생성하고 하나 남겨주시면 굽신굽신...

---

## gitignore 생성

나의 경우 일단 간단한 gitignore를 생성했다.

어차피 내가 개인적으로 사용할 옵시디언이기에 플러그인이라던지 개인 키세팅같은 경우에는 업로드 되는 편이 더 이득이라는 생각 때문!

## Obsidian에 git 설치

<img 
  src="https://github.com/user-attachments/assets/468d6338-cf1f-4b24-9891-e0accf2301e3"
/>

> 📝 플러그인 바로가기 :
> [obsidian://show-plugin?id=obsidian-git](obsidian://show-plugin?id=obsidian-git)

---

### 설정하기

<img src="https://github.com/user-attachments/assets/0900d739-c68f-45fd-9f14-b2a7dfb09fea" />

내 경우엔 사실 자동 커밋은 싫지만, 혹시 모를 사태에 대비해서 1시간마다 자동으로 commit, push, pull을 하도록 했다.

또한 기본값으로 커밋 메시지가 존재하긴 하지만  
`vault backup: {{date}}` 이런 간단한 포멧으로 작성되는것은 원치 않으므로 자동 백업임을 알리는 메시지와 시간 그리고, 어떤 기기에서 (기기명 + OS) 어떤 파일의 작업하던 내용이 백업되었는지 기록되도록 했다.

<img src="https://github.com/user-attachments/assets/3b2d2ddb-5bff-431c-b06f-561c9720fc7e" />

이런 모양으로 커밋 메시지가 작성될 예정이란다.

사용의 경우

~~`/git` 을 치고 나오는 명령을 주로 사용할 것 같은데...~~

컨트롤 + P 를 통해서 사용하자.

<img src="https://github.com/user-attachments/assets/15d5fbc3-4665-41f0-87ca-28349c97acec" max-height="350px"/>

잘 나오는 모습이다.

<img src="https://github.com/user-attachments/assets/a35f75ad-50e7-4a52-8701-549e3ae94839" max-height="350px"/>

그러면 이제 안드로이드 환경의 모바일로 넘어가보도록 하자.

## Termux를 사용해 안드로이드 git 사용

> 📝 사전 준비사항
> 스토어에서 Termux를 설치하자.

Termux를 설치했다면 터미널이 반겨준다!

<img src="https://github.com/user-attachments/assets/c4376efa-8d67-4890-8cff-ad9d84397c4b" max-height="350px"/>

오. 뭔가 익숙한 느낌!

다음 명령어들을 실행하자

```bash
pkg update && pkg upgrade # 대충 Y/N의 경우 Y...
pkg install git # git 사용을 위함
pkg install gh # github cli

termux-setup-storage # termux와 핸드폰을 이어주는 storage 라는 폴더가 생긴다

```

우선 필요한것을 설치했으니 다음으로는

```sh

git config --global user.name " 이름 "
git config --global user.email " 이메일 "
```

잘 설정된 모습이다.

<img src="https://github.com/user-attachments/assets/bc12f523-53ac-43c4-9c5d-7a9806e65463" max-height="350px"/>

---

이제 깃허브에 로그인 하도록 하자

~~(git ≠ github)~~

```sh
gh auth login
```

해당 명령어를 입력하면, 브라우저를 열려고 하지만 안된다.

따로 링크와 `ㅁㅁㅁㅁ-ㅁㅁㅁㅁ`로 된 코드를 복사해서 로그인과, 코드 입력을 마치면 자동으로 termux 의 깃허브와 연동된다!

연동이 완료되었다면, 모바일 환경에 내가 작성한 파일들을 끌어올 시간이다!

### Clone!

지금까지의 과정을 잘 수행했다면 이제는 술술 풀릴 예정이다

```bash
cd ~/storage/documents
# 옵시디언은 문서라고 생각하기 때문에 해당 경로에서 진행했다
# 원하는 경로가 있다면 ~/storage/원하는경로명~
git clone 깃허브레포주소

# 완료되었다면
git config --global --add safe.directory /storage/emulated/o/documents/레포이름

# 만약 클론 받았는데 폴더 이름을 모르겠다면
$ ~/storage/documents 가 적혀있는지 확인한 후 # 혹은 본인이 설정한 경로에서
ls  # 복붙하셨다면 그냥 ls만 쳐도 나와요
```

이후 진행은 간단하다  
아! 맞다

추가적으로

깃허브 토큰과, 깃 설정을 하자. 편리하다

termux 가서 해도 되는데 음... 귀찮잖아요?

PC에서와 마찬가지로 plugin에서 git 을 찾아 (제대로 pull 받았다면 pc에서 설치한게 있기 때문에 활성화만 해주면 됨) 이름과 몇몇 설정을 해주자.

### 불러오기

---

모바일에서 옵시디언을 실행하고, On this device를 통해 불러오자.

<img src="https://github.com/user-attachments/assets/e507e6f5-6156-4fc8-bf45-07cb5ace5974" max-height="350px"/>

<img src="https://github.com/user-attachments/assets/54d8ba01-03b9-4071-9efb-548fa450a425" alt="" max-height="350px"/>

그러면 이렇게 잘 불러온 모습이다!

반가워 나의 템플릿!!

모바일에서도 바로바로 편집하고 넣을 수 있다.  
요롷게  
이미지의 경우 추가하면 바로 옵시디언으로 복사되는 듯!

<img src="https://github.com/user-attachments/assets/a5f7a469-a5cd-454f-a983-07b59306ea2e" alt="" max-height="350px"/>

# 마치며...

## 감사합니다 읽어주셔서 정말 감사합니다....

아무래도 아예 다뤄보지 않은 분들까지 설명을 드리고 싶었으나...

엄청난 시리즈물이 되버리지 않을까 하는 그런 부담감에 우선은 간단하게 나의 시행착오만 빠르게 적었다.

조금 더 사용한 후 괜찮다면 더욱 깔끔하고 멋진 버전으로 글을 써보자!

읽어주셔서 감사합니더...

그럼 총총.

> ❗❗ 까먹지말고
> /commit

---

---

## 참고자료

https://forum.obsidian.md/t/guide-using-git-to-sync-your-obsidian-vault-on-android-devices/41887

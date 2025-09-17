---
layout: post
title: "깃허브 블로그?"
subtitle: 블로그, 시작합니다.
date: 2024-02-29
categories: [블로그]
toc: true
banner: /assets/images/GithubBlog/cat.jpg
top: 1
series: "Blog"
---

![banner](/assets/images/GithubBlog/cat.jpg)

> 저도 배너가 띄우고 싶다고요 . . . 왜 안보여요 . . .

> 개발 블로그!?

## 인트로

ssafy에 들어온지도 꽤 오랜 시간이 지났다.

비전공 문과생에서 출발해 아주 조금은 코드를 작성하고 있지만 늘 배운 내용을 TIL 이라는 이름의 혼란한 장소에 저장만 하다보니 필요할 때 찾으면 정말 발견되는 경우가 없었다.

정말 많은 것을 배운 것 같다는 생각을 하지만 열심히 공부했던 기록들이 이대로면 의미없는 정보가 될 것 같기에 공부했던 내용과 앞으로 공부할 내용을 옮겨 적고, 나 뿐만 아니라 다른사람들도 도움이 되면 하는 마음으로 블로그를 해보려고 한다.

그래서 여러 블로그를 고민해봤지만 FE 를 주력으로 공부하는 지금이 **Github Page**를 이용한 내 블로그 만들기의 기회라는 생각에 바로 시작해보았다.

## Github Pages ?

> GitHub를 통해 호스트 되고 게시되는 퍼블릭 웹 페이지.
> <br> 출처 : https://docs.github.com/ko/pages/quickstart

### 사용방법 & 기본 구성

자신의 Github repository 새로운 repository를 아래와 같이 만들면 됨.
![alt text](/assets/images/GithubBlog/Repo.png)<br>
`{유저이름}.github.io`

GitHub의 Settings에서 확인 가능하다.
![alt text](/assets/images/GithubBlog/GitHubPages.png)
이곳을 자세히 보면

1. 사이트는 아까 설정한 repository의 이름(경로)에서 볼 수 있다.
2. 브랜치, 파일 경로를 설정해줄 수 있다.
   정도로 지금 내가 쓰고 있는 것을 설명할 수 있다.

생성 이후는 index.html을 이용하면 된다,

배포와 관련된 부담은 적다고 볼 수 있다.

- 깃허브가 대신 빌드해주고 배포해주는 모습  
  ![alt text](/assets/images/GithubBlog/build.png)
  우선 지금 블로그 같은 경우에도 일단 push하면 자동적으로 배포가 되고 있는 구조니까.

도메인 연결은 추후에...

테마를 적용한 지금은 다음과 같은 폴더 구조를 보인다.

![alt text](/assets/images/GithubBlog/folder.png)

## Github Blog ?

> 깃허브 페이지를 이용한 블로그 생성.

Github 블로그 작성은 사실 나중에 더 깊게 다루고자 함.

아마도 개발을 하고 계신 분들에게는 이미 유명한 github 블로그  
다만 조금은 복잡할지도 모르기에 정리하고자 한다.

### 왜 github blog

> <storng>**GitHub Pages & Jekyll** </strong> > <br>_기본 테마에는 지금 보이는 최상단의 진행바가 없었다!!!!_

#### 장점

> 커스텀이 자유롭다.  
> 2. 개발자가 많다. 3. `Markdown`

#### 단점

1. 어렵다. 어렵다. 어렵다. 복잡하다.  
   자유롭다의 다른 말은, `내가 대부분의 일을 직접 해야한다.`라는 뜻일지도 모른다. 그렇기에 그만큼 복잡하고, 조금은 더 어렵다.  
   \+ 이미지 관리가 귀찮다.  
    내가 못하는건지, 어려운건지 마크다운이 원래 그런건지는 몰라도... 파일을 넣기가 조금 귀찮은 감이 있을지도 모르겠다.
2. 초반에 작업량이 조금 많다.  
   블로그를 보다가 직접 써보니 정말 와닿는 문제였다.  
   아마도 직접 html을 구성하고 (테마를 사용하긴 했지만, 필요한 기능은 커스텀해야한다. ex: 댓글) 또한 github블로그에 올라갈 내용을 확인하기 위해서는 `jekyll serve`를 통해 확인하거나 다른 방법(docker)를 사용해야 한다.

아직은 블로그의 초반이라서 큰 장점과 단점을 구분하기는 힘든 감이 있지만 초심자의 입장에서는 이렇다는 것을 알아달라.

### Jekill?

> Jekyll은 GitHub Pages 및 간소화된 빌드 프로세스를 기본적으로 지원하는 정적 사이트 생성기

마크다운을 사용하고. Github에서 무료 호스팅을 지원한다.

다양한 테마를 지원한다.

다양한 플러그인도 지원!!

댓글도 구현 가능 !! ~~와!!~~

> 추가적인 설정은 \_confing.yml에서 가능하다!  
> ![alt text](/assets/images/GithubBlog/config.png)  
> 복잡해보이지만, 테마 설치 + 설명을 위한 주석이 85%
> <br> > <br>

---

그들이 말하는 장점은 다음과 같다.  
![alt text](/assets/images/GithubBlog/Jekyll.png)

Jekyll은 루비(Ruby)를 기반으로 한다. 한 번도 들어본적 없지만, 쓰는데 큰 문제가 없는걸 보면 쉽거나 문서가 잘 되어있는 건데 이것은 사실 [Jekyll](https://jekyllrb-ko.github.io/docs/) 문서의 빠른 시작을 보면 너무나 자세히 나와있어 설명과 별도의 검색이 의미없을 정도.

블로그를 옮기고 싶다면 [이곳으로](https://import.jekyllrb.com/docs/home/)

# 결론

> <stong style='color:red '> <span style='color:yellow'>⚠&nbsp;&nbsp;</span> 와 ! 정말 어렵다! ⚠  
> </stong>
>
> 하지만 그만큼 자유로운게 Github 블로그.  
> 보는 것 보다, 생각하는 것 보다 쉬울지도 어려울지도 모른다.
>
> 하지만 공부라는 관점에서 바라본다면 github 블로그 만큼 적절한 블로그 생태계는 없지않을까?
>
> Github블로그 시작합니다.

사실 "커스텀이 자유롭다" 가 github 블로그 선택의 가장 큰 이유였다.  
블로그를 다루는 것은 지금 배우고 있는 FE 기술을 다루는 과정이라고 생각하기에, 배운 것을 직접 사용하기 위해서 github 블로그를 조금 알아보았다. 앞으로 더 성장할 수 있는 기회가 되길.

# 참고문서

[Github Pages](https://docs.github.com/ko/pages/getting-started-with-github-pages/about-github-pages)  
 [Jekyll](https://jekyllrb-ko.github.io/docs/)

# ps.

마침 2월 29일.

~~다음 2월 29일에 다시 확인해보면 얼마나 달라져 있을지...~~

이미지가 안올라간다!!! 블로그에 이미지가 빠진다는 것은 불가능한데!!?!?

# 비상.

원드라이브에 업로드 한 이미지가 말썽...

일단은 이렇게 다시 올려보고 또 말썽이라면 이주를 고민해야할듯...

<center><img src="https://github.com/user-attachments/assets/d25b3f7c-e2ff-4ddb-baf8-cc8bcc9a7736" width="100%"></center>

&nbsp;

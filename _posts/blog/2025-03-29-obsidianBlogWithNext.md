---
layout: post
title: 옵시디언으로 블로그 만들기.
subtitle: 근데 이제 프론트 작업을 곁들인 블로그.
categories: 블로그
tags: [블로그]
toc: true
# date: YYYY-mm-dd
banner: /assets/images/obsidianBlogWithNext/verceldomainset.png
series: "Blog"
---

# 와 블로그를 또 만든다!

> 해당 포스팅은 직판장 ('직접 만든 블로그')에 업로드 되었던 글 입니다.

블로그를 또 만들어보기로 했다.

도메인도 구매한 겸, vercel이라는 친구와 익숙해질 겸...

그리고 Obsidian과 Git을 연결하고 나서부터 기존의 컴퓨터 환경에서만 진행하던 블로그 포스팅 작업을 모바일 환경에서도 이어나갈 수 있겠다는 생각이 막 들었기 때문이다.

근데 어떻게하지? 해서 시작하는 그런 포스팅

## 어떻게 진행할까?

1. git을 통해서 프론트엔드 레포가 obsidian 포스팅을 바라보게 하자
2. 프론트엔드 레포는 git api를 통해 obsidian 레포의 포스팅을 가져오자

대충 이런 막연한 과정으로 진행하기로 했다

## vercel을 써보자!

NextJS를 사용해보기로 결정!

꼭 써야겠다는 생각보다는 아무래도 Vercel이랑 친해지는 목표니까.

배포가 되어있으면 더더욱 좋기도 하고

그리고 남들이 만들어놓은 플러그인이나 그런 방향은 최소화 하는 느낌으로 진행하며 학습을 겸하기로 했다.

그리고 약간 내 놀이터같은 느낌으로 자유 주제로 이것저것 해보고싶은 마음도 좀 있어서 그렇게 하기로!

> 개발은 즐거워야 하니까
> 본의아니게 NextJS 공부하게 됨. 끼.

### Vercel에서 NextJS 만들기

슝슝 해준다.
깃헙 아이디 슝슝~

### NextJS

NextJS에서 사용한 내용 중 git 혹은 Obsidian과 관련된 내용만 여기에서 다룰 예정.

배포는 우선 Vercel에 전부 위임한 상태

추후 생각해봐야 할 것 들이 많다. 장기 개인 프로젝트가 되지 않을까?

### Vercel에서 도메인 설정해주기

1. 생성한 프로젝트에 들어가서 Settings 클릭
2. 내 도메인 적어주기.
   ![verceldomainset.png](/assets/images/obsidianBlogWithNext/verceldomainset.png)
3. 슉슈슉 하면 될것같지만 뭔가 막 나온다. 걱정하지 말자.
   ![alt text](/assets/images/obsidianBlogWithNext/verceldomainset2.png)

   이렇게 나오는 화면을 띄워두고 도메인을 구매한 곳으로 돌아가자.

4. DNS 관리를 통해 새로운 레코드를 하나 등록하자.
   아! 뭘 적어야 된냐면...
   위에서 띄워둔 페이지에 있는 친구를 그대로 따라 적으면 된다.

끝!
그러면 위에서 나온 사이트틀이 슉슈슉하고 사용할 수 있다고 나온다!
끼얏호우!

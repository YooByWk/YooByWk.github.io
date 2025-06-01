---
layout: post
title: NextJS 페이지에 Github로 정보 가져오기
subtitle: 직접 블로그를 만들어보자~
categories: 블로그
tags: [블로그, Next.js]
toc: true
# date: YYYY-mm-dd
# banner
#   image: <Link>
---

<!-- 설정 중  date : YYYY-mm-dd  -->
<!-- 파일의 이름은 YYYY-mm-dd -->
<!-- 없어도 되는 것 같음 -->

# 직판장 오픈~

> ~~정상 영업합니다~~
>
> 해당 글은 직판장에 업로드 된 글 입니다.

직판장의 원할한 서비스를 위한 준비를 다루는 포스팅입니다.

제발~ 잘 되면 좋겠다!

NextJS를 처음 써보는데... 생각보다 어렵네요...

### 시작하기

Vercel이 Nextjs 플젝을 만들어줬다.

헤헤 편하다

포폴도 여기서 만들면 좋겠다는 생각이 들었다.

이미 배포된 환경에 하나 서브도메인을 넣어버리거나 그런 느낌으로!

커스텀은 소중하니까

```bash

npm install

npm run dev

```

간만에 프론트 개발 들어갔는데 음 하나도 모르겠다!!!!!!!!!

아무튼 만들어봅시다.

## 목적

이번 프로젝트의 목표는 GitHub에 저장된 Obsidian 마크다운 파일을 동적으로 불러와 NextJS 블로그 포스트로 만들어 주는 것!

즉, 프론트엔드 코드에 마크다운 파일을 직접 넣지 않고, GitHub REST API를 통해 실시간으로 콘텐츠를 관리할 수 있는 장점!

핵심 포인트: GitHub에서 마크다운을 가져와 동적으로 블로그 콘텐츠를 생성한다...!!

## Octokit

Octokit은 Github REST API를 쉽게 상호작용 할 수 있도록 해준다.

우선 프로젝트에 추가하자.

```bash

npm install @octokit/rest

npm install -D @octokit/types

```

Octokit을 사용하기로 한 이유는 프론트엔드 코드에 md 파일을 포함하지 않고 `@octokit/rest`를 통해 외부 저장소에서 동적으로 마크다운 파일을 끌어오기 위함이다.

**주의사항 : 토큰 안전 관리!**

### GitHubBlogService 클래스

초기 설정

환경 변수 활용: process.env를 이용해 GitHub 저장소의 소유자(owner), 레포(repo), 콘텐츠 경로, 브랜치, 에셋 경로 등을 설정하자

API 클라이언트 구성: Octokit 인스턴스를 생성하며, 인증 토큰을 포함하여 GitHub API와의 연결하기

### 캐시 관리

목적: API 호출 빈도를 줄이기 위해 메모리 캐시를 사용한다!

구현 방식:

`getCacheKey()` 함수를 통해 `owner/repo/key` 형식의 고유 캐시 키 생성

`getFromCacheOrFetch()` 함수는 캐시 만료 여부를 확인한 후, 만료 시 새 데이터를 받아와 캐시를 업데이트한다.

설정: 캐시 기간은 배포 환경에 따라 12시간 정도로 설정한다. ~~호출 무서워~~

### 파일 및 콘텐츠 처리

마크다운 파일 목록: GitHub API를 통해 지정된 경로의 마크다운 파일 목록을 불러오자

파일 내용 추출: 불러온 파일 내용을 Base64 디코딩하여 텍스트로 변환한다.

이미지 처리: Obsidian의 `![[image.png]]` 구문을 감지해 GitHub의 raw URL로 변환하는 로직을 포함한다.

### Obsidian 마크다운 처리

내부 링크 변환: `[[link]]` 구문을 `[link](/posts/slug)` 형식으로 변환하여 라우팅에 활용한다.

콜아웃 박스 처리: `[!(NOTE|INFO|TIP|WARNING|DANGER|CAUTION)]` 등의 구문을 HTML 콜아웃 박스로 재구성한다.

코드 블록 처리: Markdown의 코드 블록을 HTML `<pre><code>` 태그로 감싸, 하이라이팅 처리 가능하도록 변환한다.

### 불러보기

API 함수들을 통해 실제 NextJS 페이지에서 콘텐츠를 불러오는 구조이다.

구현된 주요 함수.

`getAllPosts`: GitHub 저장소의 모든 마크다운 파일을 불러와 포스트 객체 배열로 변환한다.

`getPostBySlug`: 특정 슬러그에 해당하는 마크다운 파일의 내용을 찾아 포스트 객체로 변환한다.

`getAllSlugs`: 동적 라우팅(Static Generation)에서 필요한 모든 슬러그 목록을 제공한다.

### env 배포 환경 설정

```

GITHUB_TOKEN=your_github_token_here

GITHUB_OWNER=your_github_username

GITHUB_REPO=your_repo_name

CONTENT_PATH=content/posts

GITHUB_BRANCH=main

ASSET_PATH=assets

```

나의 경우 Vercel 대시보드에 직접 환경 변수를 설정했다.

## 마무리

어... 어떻게 되긴 했는데...

여전히 비효율적인 구조도 많아보이고... API 끌어다 쓰는거라서 얼마나 어떻게 사용할지 잘 모르겠다.

시간이 된다면 백엔드까지 직접 구현해서 편하게 글을 쓸 수 있는 환경을 만드는게 목표라면 목표!

**아자아자 화이팅!**

**직판장 화이팅!**

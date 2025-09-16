---
layout: post
title: "페이지네이션으로 바꿔보자"
subtitle: 너무 많은 게시글은 UX를 망친다.
date: 2025-09-16
categories: [블로그]
toc: true
series: "Blog"
---

# 그냥 페이지에 엄청나게 많은 글이 쏟아진다!

Jekyll 블로그를 사용중인데, 글이 많아지는 한편 글이 늘어나는게 싫어서 작성을 아예 안하던것이 생각났다.

하지만 이대로 방치하거나, 외부 사이트로 도망치는건 내 영... 별로니까!

이번 기회에 페이지네이션을 추가했다.

## 문제 발생

[지킬 깃헙](https://jekyllrb-ko.github.io/docs/pagination/)

아니 분명 별거 없는 것 처럼 되어있었지만. 작동하지 않는게 아닌가!

시키는대로 잘 `_config.yml`에 paginate 와 같은 필요한 요소를 잘 넣었지만...

메인 페이지는 여전히 모든 게시물을 보여주고 있고, page2는 레이아웃도 제대로 적용되어있지 않았던 것!

Jekyll의 경우 `index.markdown` 혹은 `index.html`을 우선적으로 읽는다고 한다.

하지만 내 블로그는 `_layouts/home.html` 이라는 요소가 있었고 이를 실제 "홈"으로 사용중이었다.

## 해결 방법

### 1. Home.html 제거

기존에 사용하던 \_layouts/home.html과 index.markdown 파일을 시원하게 삭제.

이제 Jekyll이 더 이상 이 파일들을 우선적으로 렌더링할 일이 사라짐.

다만 이러고나니 아무것도 홈에 보여지는게 없었다.

### 2. index.html을 메인 페이지로

프로젝트 루트에 index.html을 추가한 후, fornt matter에 페이지네이션 설정 추가

### config.yml 수정

```Yaml

defaults:
  - scope:
      path: "" # 루트 전체 적용
      type: "posts" # 포스트에 적용
  - scope:
      path: "" # 루트 index.html에 적용
      type: "pages"
    values:
      heading: " 🏭🦕☄ 뱅어포의 개발 공장 🏭🦕☄ "
      subheading: "신나게 개발개발!"
      banner: "/assets/images/espana.jpg"
```

이런 과정을 거치고 나니, 페이지가 잘 나오는걸 로컬에서 확인했다.

## 후기

어.

힘든것같은데 실제로는 파일 몇 개 지우니까 해결됐다.

그리고 배너라던지 이것저것 잘 나오는 걸 보니 아직 이 블로그는 더 사용할 수 있겠구나 하는 생각이 든다.

~~우리 블로그 정상 영업 합니다~~

---
layout: post
title : 'Flutter  오류 : GlobarKey & 레이아웃 오류'
subtitle: 없어도 된다면서 거짓말하는 flutter.
tags : flutter, 개발, 오류
date: 2024-04-02
categories: [
  flutter,
  개발
]
top : 3
toc: true
banner:  /assets/images/FlutterSet/flutterLogo.png
---


# Flutter에서 GlobalKey와 레이아웃 오류

Flutter를 사용하여 앱을 개발하다 보면, 다양한 오류 메시지를 마주하게 됩니다... key 안써도 된다면서 오류를 막 뱉을때가 있으니까요.  
따라서  이 포스트에서는 `Multiple widgets used the same GlobalKey`, `Vertical viewport was given unbounded height.`, `RenderBox was not laid out` 등의 오류 메시지를 해결하는 방법에 대해 간단히 적어보고자 합니다.

## GlobalKey 오류
`Multiple widgets used the same GlobalKey` 오류는 동일한 `GlobalKey`가 여러 위젯에 할당되었을 때 발생한다고 합니다. `GlobalKey`는 전역적으로 고유해야 합니다 즉, 한 번에 하나의 위젯에만 할당해야 하는것이죠. 해당 오류는 여러 위젯이 동일한 GlobalKey를 참조하려고 할 때 발생하는데, 이는 위젯의 상태를 전역적으로 관리하려는 시도에서 발생합니다.

## 해결
>각 위젯에 고유한 GlobalKey를 할당하자.

위젯을 생성할 때마다 새 `GlobalKey`를 생성하거나, 위젯별로 고유한 `GlobalKey`를 관리하는 방법이 있습니다. 이렇게 하면 각 위젯이 고유한 `GlobalKey`를 가지게 되고 오류를 피할 수 있게 됩니다.


```dart
Widget buildWidget() {
  GlobalKey key = GlobalKey();
  return Widget(key: key);
}
```

## 레이아웃 오류
> 저는 그냥 무한 스크롤이 만들고 싶었어요...
>
> 근데 레이아웃을 넘어가버려요 
> 
> 인스타 대단해

### 문제 : 
`Vertical viewport was given unbounded height.` 오류는 ListView, GridView 등의 위젯이 무제한의 높이를 가지려고 할 때 발생... 
이런 위젯(리스트뷰, 그리드뷰)들은 일반적으로 부모 위젯으로부터 제한된 높이를 받아야 함!!! 
- 스크롤 가능한 위젯이 부모 위젯으로부터 충분한 제약 조건을 받지 못하면 발생...

### 해결 : 
 `ListView` 또는 `GridView`를 `Expanded` 또는 `Flexible` 위젯으로 감싸거나, 직접 높이를 지정해야 합니다. 
 
 `Expanded` 또는 `Flexible` 위젯은 부모 위젯의 사용 가능한 공간을 채우도록 자식 위젯의 크기를 조절하는 역할입니다.

> 부모 위젯의 사용 가능한 공간을 채우도록 크기 조절하기
- 근데 이렇게 해도 오류 나는 경우도 많아요. 쩝...
```dart 
Expanded(
  child: ListView(
    // ...
  ),
)
```
> 직접 지정하기
- 이런 방법도 있는데 ~~괜찮은 방법인지는 몰루~~
- 전 급하면 이렇게 해결했어요 일단은
```dart
Container(
  height: 0.8 * MediaQuery.of(context).size.height,
  child: ListView(
    // 무한 스크롤...
  ),
)
```

## RenderBox was not laid out

위젯이 자신의 크기를 결정하지 못했을 때 발생.   
위젯이 부모 위젯으로부터 충분한 제약 조건을 받지 못하면 발생합니다.

###  해결
 이 문제를 해결하려면 위젯에 충분한 제약 조건을 제공해야 합니다. 위에서 설명한 `Expanded`, `Flexible` 등의 위젯을 사용하면 이 문제를 해결할 수 있습니다.


## 레이아웃 상 위치 조절 : Footer 같은 것 만들 때
때때로 Text 위젯이 바닥에 붙어 있어야 하는 경우가 있음.  
다만 넣다보면 중앙에 정렬 되는 경우도 많은데 제가 겪은 대부분의 경우에는 `Column` 위젯 내에서 `Text` 위젯이 `MainAxisAlignment.center`로 설정되어 있기 때문이었습니다. 이렇게 설정한 경우 `Column`의 모든 자식 위젯들을 중앙에 배치하도록 하기 때문이었습니다.

Text 위젯을 Column의 맨 아래에 배치하려면, MainAxisAlignment를 MainAxisAlignment.end로 설정하거나, Spacer 위젯을 사용하여 Text 위젯 위의 공간을 채울 수 있습니다.

```dart
Column(
  mainAxisAlignment: MainAxisAlignment.center,
  crossAxisAlignment: CrossAxisAlignment.center,
  children: [
    Container(
      height: MediaQuery.of(context).size.height * 0.8,
      // ...
    ),
    Spacer(), 
    Text('글 자 를 적 는 공 간.'),
  ],
),
```

이렇게 하면 `Spacer` 위젯이 가능한 모든 공간을 차지하고, Text 위젯은 `Column`의 맨 아래에 배치됩니다.


## 후기
- `Flutter`의 화면 구성은 CSS보다 쉬운 감이 있지만 생각보다 너무나 많은 위젯 종류로 인해 감당이 어려운 부분도 있었습니다. (~~숙련도 이슈~~)

- 레이아웃 문제 뿐 아니라 타입 지정 실수 등과 같은 여러 오류로 인해 레이아웃은 잘 위젯상으로 잡혀도 컨텐츠가 나오지 않는 경우도 있었습니다. 확실히 설계하고 차근차근 추가하는 방법도 좋을 듯 합니다.

![플러터 위젯 추가](https://1drv.ms/i/c/60d1136c8e1eeac5/IQOU5vJRjA2HRZXfgIWSJbu5AZDue1c9_11T2DwxHyueOEo?width=1024)
- 힘들게 괄호 다 맞춰가면서 추가하지 말고 이런 기능도 써보는게 어떨까요

- 플러터의 개발자 도구는 매우 좋습니다. :)


  

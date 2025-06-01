---
layout: post
title: Flutter
subtitle: Flutter 설치 & 초기 설정
tags: [Flutter, 설정]
date: 2024-03-04
categories: [Flutter]
# top : 2
toc: true
banner: /assets/images/FlutterSet/flutterLogo.png
---

# 플러터!!

## 플러터란 ?

> 구글에서 출시한 데스크톱/모바일/웹 크로스 플랫폼 GUI 프레임워크  
> ![alt text](/assets/images/FlutterSet/Cross.png "플러터 공식 : 설치 가이드")
> 리액트 네이티브(React Native)와 주로 비교되고 있는 것 같기도 <br>
> & 꽤 높은 점유율 + 높아지는 인기(관심)도를 보이고 있으며 가파른 성장세를 보이고 있다! <br> > ![alt text](/assets/images/FlutterSet/tend.png) <br> > ![alt text](/assets/images/FlutterSet/marketshare.png)<br>

## 특징

1. 크로스 플랫폼 : iOS & 안드로이드 한 번의 개발로 두개의 앱 생성 가능하다. <br>
2. Dart (언어)를 사용해 개발 -> 어디선가 본 것 같은 문법 多<br>
3. '핫 리로드(Hot Reload)' 기능을 통해 코드 변경 사항을 즉시 확인 가능하다. <br>
4. 다양한 UI 제공 & 사용자 정의 UI 구축이 용이하다.

<br>

---

# 개발환경 설정

## 개발 환경 선택

### Android Studio or Visual Studio Code

a. Android Studio :

     장점 :
       - 안드로이드 앱 개발에 최적화 된 환경
       - 플러터와 Dart 언어를 지원하는 풍부한 플로그인 제공
       - 안드로이드 에뮬레이터를 통한 테스트 환경 구축 용이
       - 코드 자동 완성, 디버깅, 리펙터링 등의 기능 제공(Jetbrains!)
       - UI 설계를 위한 시각적인 도구 제공

    단점 :
      - 무겁다. 2.3 Gb라고는 하지만 약 20~30 Gb 쯤 되는 느낌 + 시스템 자원 소비 多
      - 익숙하지 않을수도 있다.

b. Visual Studio Code :

    장점 :
      - 가벼운 프로그램. 안드로이드 스튜디오에 비해 적은 자원을 소비
      - 다양한 언어 지원하는 플러그인 제공
      - 다양한 extension들

    단점 :
      - UI 설계 도구가 안드로이드 스튜디오에 비해 제한적임
      - 플러터 개발에 필요한 기능을 추가로 설치해야 한다.

---

이 글에서는 **안드로이드 스튜디오**를 사용해 개발환경을 구성할 예정이다.

## 개발환경 구축

### 개발에 필요한 준비물

1. **플러터 SDK**
2. **Dart SDK**
3. **Android Studio**
4. **에뮬레이터 or 실제 기기**

### 안드로이드 스튜디오 설치

> 우선 git 과 [Android Studio](https://developer.android.com/studio?hl=ko)를 설치한다.

### VS Code를 통한 flutter 설치

VS Code로 Flutter도 설치할 것이다.

> 갑자기 VS Code ??  
> 수동으로 직접 SDK도 설치할 수 있습니다~~

    https://docs.flutter.dev/get-started/install/windows/mobile?tab=download

    -> Install the Flutter SDK
      To install the Flutter SDK, you can use the VS Code Flutter extension or download and install the Flutter bundle yourself. 출처 : 플러터 공식문서

---

VS Code에서 `control` + `Shift` + `p`를 통해 아래와 같이 접근한다.<br>
`flutter`를 입력하고 Flutter : New Project를 선택. <br>
![alt text](/assets/images/FlutterSet/vs_install.png)<br>
만약 플러터가 없다면 다음과 같은 알림이 나온다. <br>
![alt text](/assets/images/FlutterSet/VsCodeSDK.png) <br>
Download를 누르면 Flutter sdk를 다운받을 경로를 설정할 수 있는데,
공식 문서에서는 `%USERPROFILE` 혹은 `c:\dev`를 추천하고 있다. <br>

> `C:\Program Files`와 같은 곳은 추천하지 않는다.

---

  <details>
    <summary> 공식문서 내용 : Program Files를 비추천 하는 이유</summary>
    <div markdonw="1"> 
      
        Don’t install Flutter to a directory or path that meets one or both of the following conditions:  
        The path contains special characters or spaces.  
        The path requires elevated privileges.  
        As an example, C:\Program Files fails both conditions.

    </div>

  </details>
  <br>

---

![alt text](/assets/images/FlutterSet/VSEndInstall.png)  
 설치가 완료되면 환경변수에 _`Flutter SDK`_ 를 등록하겠냐고 나온다. <br> -> **Add SDK to PATH** 를 클릭 후 VS CODE를 **재시작**한다.

여기까지 왔다면 잘 설치됨..!

Cmd 혹은 PowerShell에서 `flutter --version` 을 입력해 플러터 버전을 확인한 모습. <br>
![alt text](/assets/images/FlutterSet/cmdCheck.png)

### 이외 설정

1.  안드로이드 스튜디오 실행

    a. SDK Platforms 에 `Android API 34.0.0` 이 설치되어있는지 확인하자.

    > ★ 안드로이드 버전은 공식문서에서 한번더 확인합시다 ★  
    >  https://docs.flutter.dev/get-started/install/windows/mobile?tab=later-start

    b. SDK tools에서 아래의 항목들이 체크되어있는지 확인하자.

         Android SDK Command-line Tools
         Android SDK Build-Tools
         Android SDK Platform-Tools
         Android Emulator

---

2. PowerShell 실행 후 하단의 명령어 실행.

   ```shell
     flutter doctor --android-licenses
   ```

   ```py
   Android sdkmanager not found. Update to the latest Android SDK and ensure that the cmdline-tools are installed to resolve this.
   ```

---

> 오류 발생!!  
>  CMD / Powershell에서 명령어 실행이 안돼요!!! <br> > <br>
> 해결 :  
>  Android Studio -> `SKD Manager` -> `SDK Tools` -> `Android SDK Command-line Tools` 설치. -> 다시 명령어 실행.

---

3. 플러터 & 다트 플러그인을 설치합니다.<br>

![alt text](/assets/images/FlutterSet/ASplug.png)

> 설치 후 IDE를 재실행하면 New Flutter Project가 나옵니다 :) <br>
>
> ![alt text](/assets/images/FlutterSet/ide.png)

# 마무리

이번에 처음 다루는 안드로이드 스튜디오, Dart, 플러터인데 즐겁게 할 수 있으면 좋겠습니다.  
직접 만든 앱이 자신의 스마트폰에서 작동하는 것을 보면 엄청나게 뿌듯하지 않을까 싶습니다...

그럼 다들 즐거운 플러터 개발 되시길!

Hasta Luego~

---
layout: post
title : 'Flutter 개발 :  MVVM ?'
subtitle: MVVM (Model, View, ViewModel) ? ? ? 
tags : flutter, 개발, 패턴
date: 2024-03-18
categories: [
  flutter,
  협업
]
# top : 3
toc: true
banner:  /assets/images/FlutterSet/flutterLogo.png
---


## Copilot과 싸우며 적은 것


# MVVM 패턴
MVVM(Model-View-ViewModel)은 소프트웨어 아키텍처 패턴 중 하나로, 사용자 인터페이스의 설계와 비즈니스 로직을 분리하는 데 사용. MVVM 패턴은 세 가지 주요 구성 요소가 있음.

Model: 데이터와 비즈니스 로직을 담당. 데이터베이스, 네트워크, 파일 시스템 등과 같은 데이터 소스와 상호 작용하며, 애플리케이션의 상태와 동작을 관리.

View: 사용자에게 보여지는 UI를 담당. 사용자의 입력을 받아 ViewModel에 전달하고, ViewModel로부터 상태 변경을 받아 화면을 업데이트.

ViewModel: Model과 View 사이의 연결 고리 역할. View로부터 입력을 받아 Model을 업데이트하고, Model의 상태 변화를 View에 반영하기 위한 데이터를 준비.

MVVM 패턴의 주요 장점 : View와 Model 사이의 의존성을 최소화, 테스트와 유지 관리를 용이하게 하는 것. 또한, View와 ViewModel은 데이터 바인딩을 통해 연결되므로, 코드의 양을 줄이고 가독성을 향상.


### MVVM 패턴!!!!

 
과정 :

  1. 사용자가 페이지 A 접근 
  2. 사용자 정보에 따라 A 페이지 데이터 호출 
  3. A 페이지 표시  
  4. 사용자 버튼 B와 상호작용 
  5. B 입력 전송  
  6. B 출력 수령  
  7. B 출력 표시 

Model: 사용자 정보와 관련된 데이터와 로직을 담당.   
-> 사용자 정보에 따라 A 페이지 데이터를 호출하는 로직이 이 부분에 해당한다.  

```dart

class UserModel {
  String? userInfo;

  Future<void> fetchUserData() async {
    // 로직: 사용자 정보에 따라 데이터를 호출
    // 예시: userInfo = await SomeDatabaseService.getUserInfo();
  }
}

```
<br>

---

> ViewModel: 사용자의 액션을 Model에 전달하고, Model로부터 데이터를 받아 View에 전달하는 역할. 
> 
> 사용자가 페이지 A에 접근하는 액션과 버튼 B와 상호작용하는 액션, 그리고 이에 따른 데이터 호출 및 전송 로직이 이 부분에 해당한다.   

```dart
class UserViewModel {
  final UserModel _userModel = UserModel();

  Future<void> loadData() async {
    await _userModel.fetchUserData();
  }

  String? get userInfo => _userModel.userInfo;
}
```
<br>

---
> View: 사용자에게 보여지는 UI 부분을 담당.
> 
>  A 페이지와 B 출력을 표시하는 부분이 이에 해당.

<br>

```dart
class UserPage extends StatelessWidget {
  final UserViewModel _viewModel = UserViewModel();

  UserPage() {
    _viewModel.loadData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Page A'),
      ),
      body: Center(
        child: Text('User Info: ${_viewModel.userInfo}'),
      ),
    );
  }
}
```

---

##  MVVM 예시
> 서로 독립적으로 구성되어 상호 작용 하므로 코드 재사용성이 늘어난다.


### MVVM   : 유저의 로그인 상황에 대한 간단 정리 실습

> UserModel: 사용자의 정보를 저장하고 관리하는 Model.   
> 이 Model은 사용자의 이름, 프로필 이미지 경로 등의 정보를 포함할 수 있다.  
> 이름, 프로필 이미지 경로 등의 정보는 Model에 위치하는 것이 적절하다
> 
> ViewModel은 이러한 데이터를 Model로부터 가져와서 View에 제공하는 역할을 한다.
>
> LoginModel을 만들고 username과 password를 이곳으로 이동시킬 수 있다. 그리고 LoginViewModel에 LoginModel을 사용하여 username과 password를 가져오고 설정하는 메서드가 작성될 수 있다.


```dart
class LoginModel {
  String _username = '';
  String _password = '';

  String get username => _username;
  String get password => _password;

  void setUsername(String value) {
    _username = value;
  }

  void setPassword(String value) {
    _password = value;
  }
}

class LoginViewModel extends ChangeNotifier {
  final LoginModel _loginModel = LoginModel();
  bool _isFocused = false;

  String get username => _loginModel.username;
  String get password => _loginModel.password;
  bool get isFocused => _isFocused;

  void setUsername(String value) {
    _loginModel.setUsername(value);
    notifyListeners();
  }

  void setPassword(String value) {
    _loginModel.setPassword(value);
    notifyListeners();
  }

  void setFocused(bool value) {
    _isFocused = value;
    notifyListeners();
  }

  void login() {
    debugPrint('Username: ${_loginModel.username}');
    debugPrint('Password: ${_loginModel.password}');
    debugPrint('clicked login button!');
  }
}
```

### 폴더 구조는 어떻게 할까?


- MVVM(Model-View-ViewModel) 패턴을 사용하는 경우, 일반적으로 다음과 같은 폴더 구조를 사용한다.

- models: 애플리케이션의 데이터를 나타내는 모델 클래스가 위치한다. 

- view_models:  View와 Model 사이의 중개자 역할을 하는 ViewModel 클래스가 위치한다.

- views: 사용자 인터페이스를 구성하는 View 클래스가 위치한다. 
```
.
├── models         // 앱 데이터의 모델 클래스 
├── view_models    // view 와 model 사이의 중개자 역할
└── views          // 사용자 인터페이스 구성
```

#### 폴더구조 

화면(screen)과 위젯(widget)을 동일한 views 또는 widgets 폴더에 저장했다. 프로젝트의 규모에 따라서 분리 할 수도 있다.  
**중요한 것은 일관성!**
 - Screen : 앱의 주요 기능을 나타내는 큰 단위의 뷰
 - Widget : 재사용 가능한 작은 단위의 뷰




#### 한 폴더에 여러개의 class 
> 너무 많이 고민하지 말자. 코드 쓰고 오류 잡는 것도 하루 종~일 걸리니까.
같은 파일에 여러개의 `class`의 `widget`을 배치해도 괜찮다. 특히 한 위젯에서 다른 위젯을 바로 사용하는 경우에는 오히려 좋을지도 모름.

그러나 위젯 클래스가 복잡하거나 파일의 길이가 **너무** 길어지는 경우, 별도의 파일로 분리하는 것이 좋다.

>> 역시 중요한것은 팀의 코딩 스타일과 이에 따른 `일관성`!!


#### changeNotifierProvider 사용할 시


```dart
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:your_project/models/user_viewmodel.dart';

class UserPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ChangeNotifierProvider<UserViewModel>(
      create: (context) => UserViewModel()..loadData(),
      child: Scaffold(
        appBar: AppBar(
          title: Text('Page A'),
        ),
        body: Consumer<UserViewModel>(
          builder: (context, viewModel, child) {
            return Center(
              child: Text('User Info: ${viewModel.userInfo}'),
            );
          },
        ),
      ),
    );
  }
}

/*
ChangeNotifierProvider를 사용하여 UserViewModel의 상태를 관리하기:

ChangeNotifierProvider는 UserViewModel의 인스턴스를 생성하고, 이를 하위 위젯 트리에 제공한다. 
loadData 메서드는 UserViewModel의 인스턴스가 생성될 때 호출된다.

Consumer<UserViewModel> 위젯은 UserViewModel의 현재 상태를 소비하고, 
UserViewModel의 상태가 변경될 때마다 자동으로 다시 빌드된다.
이를 통해 UserViewModel의 userInfo가 변경될 때마다 화면이 업데이트된다.
*/
```

### 그래도 저는 Model이랑 ViewModel이 헷갈리는데요?

MVVM 패턴에서 Model과 ViewModel의 구분은 주로 역할과 책임에 기반하여 이루어진다.   
Model : 
- 데이터와 관련된 부분
- 데이터베이스 상호작용
- 네트워크 동신
- 데이터의 변경 및 관리 등 비즈니스 로직 처리

ViewModel
- 사용자 인터페이스와 관련된 데이터의 가공 및 처리
- 사용자의 액션에 따른 이벤트 처리

ej.
1. 로그인 버튼을 누름 : ViewModel이 처리
2. 아이디와 비밀번호를 Model에서 가져온 후 ViewModel 이 사용자 입력에 따라 가공 후 로그인 동작을 Model에 요청한다.



# 오늘의 결론

공부합시다 하..하..하...    
MVC 와 어떻게 다른지는 추후 학습 예정입니다 :)   
오늘도 멸종을 면했다!

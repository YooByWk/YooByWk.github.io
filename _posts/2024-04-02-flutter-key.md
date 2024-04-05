Flutter에서 GlobalKey와 레이아웃 오류를 해결하는 방법
Flutter를 사용하여 앱을 개발하다 보면, 다양한 오류 메시지를 마주하게 됩니다. 이러한 오류 메시지들은 때때로 개발자를 혼란스럽게 만들지만, 각 오류가 무엇을 의미하는지 이해하고 적절한 해결책을 적용하면, 앱의 품질을 향상시키고 개발 시간을 단축하는 데 도움이 됩니다. 이 포스트에서는 "Multiple widgets used the same GlobalKey", "Vertical viewport was given unbounded height.", "RenderBox was not laid out" 등의 오류 메시지를 해결하는 방법에 대해 자세히 알아보겠습니다.

GlobalKey 오류
"Multiple widgets used the same GlobalKey" 오류는 동일한 GlobalKey가 여러 위젯에 할당되었을 때 발생합니다. GlobalKey는 전역적으로 고유해야 하므로, 한 번에 하나의 위젯에만 할당해야 합니다. 이 오류는 특히 여러 위젯이 동일한 GlobalKey를 참조하려고 할 때 발생하는데, 이는 위젯의 상태를 전역적으로 관리하려는 시도에서 자주 발생합니다.

이 문제를 해결하려면 각 위젯에 고유한 GlobalKey를 할당해야 합니다. 예를 들어, 위젯을 생성할 때마다 새 GlobalKey를 생성하거나, 위젯별로 고유한 GlobalKey를 관리하는 방법이 있습니다. 이렇게 하면 각 위젯이 고유한 GlobalKey를 가지게 되어, 위젯의 상태를 안전하게 관리할 수 있습니다.


```dart
Widget buildWidget() {
  GlobalKey key = GlobalKey();
  return Widget(key: key);
}
```
레이아웃 오류
"Vertical viewport was given unbounded height." 오류는 ListView, GridView 등의 위젯이 무제한의 높이를 가지려고 할 때 발생합니다. 이런 위젯들은 일반적으로 부모 위젯으로부터 제한된 높이를 받아야 합니다. 이 오류는 특히 스크롤 가능한 위젯이 부모 위젯으로부터 충분한 제약 조건을 받지 못하면 발생합니다.

이 문제를 해결하려면, ListView 또는 GridView를 Expanded 또는 Flexible 위젯으로 감싸거나, 직접 높이를 지정해야 합니다. Expanded 또는 Flexible 위젯은 부모 위젯의 사용 가능한 공간을 채우도록 자식 위젯의 크기를 조절하는 역할을 합니다.


```dart 
Expanded(
  child: ListView(
    // ...
  ),
)
```


"RenderBox was not laid out" 오류는 위젯이 자신의 크기를 결정하지 못했을 때 발생합니다. 이 오류는 특히 위젯이 부모 위젯으로부터 충분한 제약 조건을 받지 못하면 발생합니다. 이 문제를 해결하려면 위젯에 충분한 제약 조건을 제공해야 합니다. 위에서 설명한 Expanded, Flexible 등의 위젯을 사용하면 이 문제를 해결할 수 있습니다.

Text 위젯 위치 조정
때때로 Text 위젯이 바닥에 붙어 있어야 하는 경우가 있습니다. 이는 Column 위젯 내에서 Text 위젯이 MainAxisAlignment.center로 설정되어 있기 때문입니다. 이 설정은 Column의 모든 자식 위젯들을 중앙에 배치하도록 합니다.

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
    Spacer(), // 이 줄을 추가합니다.
    Text('유언장을 정상적으로 삭제하고 관리하기 위해 위 단어를 안전한 곳에 보관해주세요.'),
  ],
),
```

이렇게 하면 Spacer 위젯이 가능한 모든 공간을 차지하고, Text 위젯은 Column의 맨 아래에 배치됩니다.



---
layout: post
title: "블록체인 - 스마트 컨트랙트 트랜잭션 전송"
subtitle: "블록체인 파트 4  : 스마트 컨트랙트와 앱의 통신"
tags: [blockchain, Ethereum, flutter, Dart]
date: 2024-04-13
categories: [blockchain, Ethereum, flutter, smart contract]
toc: true
banner:
  image: https://github.com/user-attachments/assets/1b098080-1d55-43e8-a698-becc37bfdf86
---

블록체인을 활용한 앱 개발 중, 해시값을 이용해 앱에서 생성된 정보의 위변조를 확인하고 안전하게 저장해야 할 방법이 필요해졌습니다. 이에 따라 개발을 진행하다 보니 스마트 컨트랙트와 상호작용 하기 위해서는 서명이 필요하다는 사실을 새롭게 알게 되었습니다.

그래서 이번 게시글에서는 이를 활용하기 위한 기초적인 작업을 했던 내용과, 약간의 개념을 작성하려고 합니다...

시작하기에 앞서 알아두면 좋은 정보는 다음과 같습니다. 그닥 어려운 내용은 아니니까 한번 읽어보세요

1. 블록체인 기-초  
   [블록체인 시작](https://yoobywk.github.io/blockchain/intro/2024/03/05/blockchain.html) 여기에 적어봤습니당
2. 개인 키  
   사용자의 디지털 자산에 대한 접근 권한을 부여하는 값. 이 키를 통해 트랜잭션에 서명하고, 서명은 트랜잭션이 해당 개인 키의 소유자에 의해 승인되었음을 증명한다고 합니다.
3. 트랜잭션 데이터  
   트랜잭션의 세부 정보를 포함하는 것으로 보통 수신자 주소와 송금액, 가스 가격을 포함합니다.
4. 서명 알고리즘  
   개인 키와 트랜잭션 데이터를 사용해 디지털 서명을 생성하는 알고리즘. 이더리움(저는 이더리움을 쓰니까요 feat. `solidity`) ECDSA(Elliptic Curve Digital Signature Algorithm)를 일반적으로 사용한다고 합니다.

## 개발 전 준비

> 그 전에 깔아야 하는게 좀 있어요.
>
> web3 랑 관련된건데 주로 web3.js 이쪽 (_이더리움 생태계를 위한 기능을 포함하는 모듈 패키지_)이다보니,  
> Dart를 쓰는 플러터에 적용하기 위해서는 약간의 작업이 필요하답니다.  
> 블록체인 앱 개발을 위해 우선 환경설정을 시작해봅시다.

우선 아래의 두개를 준비해야 합니다.  
~~사실 전부 필수입니다..~~

1. web3dart.dart  
   `web3dart`는 위에서 설명했다시피 web3를 dart 환경에서 이용하기 위한 라이브러리입니다. 이 라이브러리를 통해 스마트 컨트랙트 배포, 호출, 트랜잭션 서명 후 전송 등의 과정이 가능해집니다. 또한 이더리움 블록체인의 상태를 읽기도 하고, 이벤트를 수신하며 지갑 관리도 가능해집니다. ~~**필수**~~
2. crypto.dart
   Dart에서 다양한 암호화 알고리즘을 사용하기 위함입니다. 이 라이브러리를 통해 트랜잭션을 해시합니다. `SHA` 알고리즘으로 기억하고 있어요
3. http.dart  
   Dart에서 HTTP 요청을 보내고 받기 위한 것입니다. 기존의 API 호출용이죠. 여기서는 블록체인 노드 혹은 다른 서버와 통신하는데 사용하기 위함입니다.

따라서 `pubspec.yaml`에 의존성을 추가합니다.

```yaml
dependencies:
  flutter:
    sdk: flutter
  web3dart: any # 블록체인 라이브러리
  crypto: any # 암호화 라이브러리
```

의존성을 추가하셨다면 터미널에서 `flutter pub get`을 통해 의존성을 설치합시다. 여기까지가 코드 작성을 위한 사전 준비였습니다.

## 작업 1 - 준비물의 연장선

우선 또 다른 준비물이 필요합니다.

1. 스마트 컨트랙트 주소
   - 컨트랙트를 배포하면 반환되는 주소가 필요합니다. 해당 주소하고 상호작용을 하는 개념이니까요. 블록체인은 절대 중앙의 API를 거쳐 반환되는게 아닙니다.
2. 스마트 컨트랙트 ABI
   - 저는 remixIde 에서 컴파일 후 ABI 값을 복사 후 프로젝트에 json 형식으로 넣었습니다. ABI는 JSON 형식으로 된 스마트 컨트렉트의 정보 파일이라고 생각하면 편합니다.
3. 사용자의 주소(Address) & 개인 키(pk)
   - 사용자가 스마트 컨트랙트와 소통하기 위해 필요합니다. view 조건이 걸린 함수에는 필수적이지 않지만, 트랜잭션 생성을 위해서는 필요해요
4. RPC URL
   - RPC URL 은 블록체인에 연결하기 위한 엔드포인트로, 사용하실 네트워크에 맞는 URL이 필요합니다.

---

---

## 작업 2 - Dart에서 소통하기 위한 기초 공사

1. 위에서 설치한 라이브러리들을 import를 해줍시다.

```dart
// 블록체인 로직을 담당할 파일.dart
import 'package:crypto/crypto.dart';
import 'package:http/http.dart';
import 'package:web3dart/web3dart.dart';
```

2. 작성합시다.
   저는 RPC URL을 `.env`에서 보관했어요.
   그리고 첫 트랜잭션의 경우 실제로 진행되는지를 확인하는 성격이 강했기 때문에 우선 PK 를 remixIDE 에서 받아서 사용했습니다. 메타마스크 지갑을 통해서 발급 후 복붙해도 괜찮아요. 추후에 앱에서 발급 후 사용하는 경우에는 해당 값을 디바이스 혹은 안전하게 저장 후 이용하면 됩니다.

```dart
  String _rpcUrl = dotenv.env['RPC_URL']?? '';
  String _pk = '개인키';
  String _contractAddress = '컨트랙트 주소 : remixIDE 혹은 다른 방법으로 배포 후 반환되는 값';
  String _ABI = '컴파일 후 나온 ABI의 값 혹은 JSON 파일 - 여기도 복붙해서 한줄로 넣어도 되는데 많이 길어요';

```

위에 작업 1에서 말헀던 기초적인 정보를 가지고 이제 `web3Client`와 이더리움 PK 라는 클래스의 credentials를 만들겁니다.
`client`는 rpc 서버에 요청을 보내기 위해 사용될 예정이고, `credential`의 경우 개인키를 통해 생성되는 것으로 서명할 때 신원을 인증하고 트랜잭션의 유효성을 보장하는 역할입니다. 자격증명이라고 생각하면 편하겠네요

```dart
_client = Web3Client(_rpcUrl, Client());
_credentials = EthPrivateKey.fromHex(_pk); // Hex로 된 pk 를 통해 credentials 를 생성합니다.
_contract = ContractAbi.fromJson(_ABI, '컨트랙트 이름 - 실제 컨트랙트 이름 X');
```

여기까지 오셨다면 이제 위에서 작성하고 생성한 요소를 통해 스마트 컨트랙트와 상호작용이 가능해졌습니다.

## 트랜잭션 보내보기

배포된 스마트 컨트랙트에 대한 정보를 작성했고 또한 상호작용을 하는데 필요한 정보도 작성이 완료되었어요. 남은 과정은 트랜잭션 전송 후 결과를 받아보는 일만 남았습니다~~

이미 함수를 배포한 상태며 또한 함수의 이름도 알고 있으니 트랜잭션을 보내는 것은 어렵지 않아요

```dart
Future sendTransaction(functionName, List<dynamic> params) async {
  final function = _contract.function(functionName); // abi를 통해 만들어진 스마트 컨트랙트에 존재하는 함수 이름
  final response = await _client.sedTransaction(
    _credentials, // 증명정보 전달
    Transaction.callContract(contract: _contract, function : function, parameters: params),
    fetchChainIdFromNetworkId: false // 이곳의 경우 전 직접 chainId를 입력해서 수행했기 때문에 false로 변경했습니다.
    chainId : '네트워크의 체인아이디',
  );
  return response;
};
```

## 함수 호출하기 feat. view

view를 실행하는데는 서명이 필요 없고, 가스비도 들지 않습니다. 따라서 서명이 필요없는 환경이지요.  
만약 remix IDE를 방문해보셨다면 첫 화면에서 반겨주는 `retrieve` 라는 함수가 있는 파일이 있는데 그곳의 view 가 붙어있는 함수를 호출할 때 쓸 수 있죠.

```solidity
// SPDX-License-Identifier: GPL-3.0
//
pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract Storage {

    uint256 number;

    /**
     * @dev Store value in variable
     * @param num value to store
     */
    function store(uint256 num) public {
        number = num;
    }

    /**
     * @dev Return value
     * @return value of 'number'
     */
     // 여기 아래의 view 라고 적혀있는 부분이 제가 설명하는 부분입니다.
     // 간단한 설명은 다음과 같습니다.
     // public : 호출 가능!
     // view : 값을 읽기만 함
     // returns (자료형) : 기대되는 return의 자료형
    function retrieve() public view returns (uint256){
        return number;
    }
}
```

이런 view 함수를 보내는 과정에서  
저의 경우에는 아래와 같은 프로젝트 명세상의 이유로 dart에서의 함수를 분리했어요.  
이 명세를 작성하는데 꽤 많은 고민이 있었지만 오히려 분리하길 잘헀다고 생각하고 있어요.

1. 누구나 확인해야 하는 정보가 있다.
2. 굳이 개인키를 발급 받지 않더라도 확인은 가능해야 한다.

그래서 이것은 `callFuntion`이라는 이름으로 하나의 함수를 더 만들었습니다.

```dart
  Future callFunction(String functionName, List<dynamic> params) async {
    final function = _contract.function(functionName);
    final response = await _client.call(
      contract: _contract,
      function: function,
      params: params,
    );
    return response;
  }
```

자세히 보면 `sendTransaction` 함수와는 다른데요 그 부분은 response를 받기 위해 client를 call 할 때 아까 전에 생성한 credentials가 들어가지 않는다는 점입니다.

이미 잘 읽으셨다면 아시겠지만 credential이 없다면 **자격증명** 이 없는거니까. 서명 없이 단순한 호출이라는 사실을 이해하실 수 있을겁니다

## 보충 사항 & 결론

야호! 트랜잭션 전송에 성공했습니다! _아마도..._
근데 저희의 함수에는 치명적인 문제가 있어요. 그것은 .... 트랜잭션이 완료될 때 까지 꽤 오랜 시간이 걸려도 기다린다는거...  
따라서 실제 앱 환경에서는 비동기 처리 후 추가적으로 사용자에게 처리 현황을 알려주거나, 처리 후 영수증이 나오면 완료로 간주 후 생성이 완료되었다는 피드백을 주는게 좋다고 생각합니다.
그리고 블록체인의 경우, 트랜잭션을 전송할 때 가스비에 따라서 처리 속도가 조금 다를 수 있는데 이 처리시간이 일반적 웹 상의 게시판에 글을 등록하는 시간보다는 길었던 것 같습니다. 길게는 20~40초도 기다려 본 것 같은데... 실제 Ethereum 메인 네트워크는 써보지 못해서 모르겠네요.  
그래도 플러터, dart 환경에서도 충분히 web3를 이용해 블록체인과 통신이 가능하니까 걱정 말고 개발해보시길 바랍니다..!  
js의 경우는 오히려 쉽고 정보도 많기도 하고 라이브러리도 좋은애들이 많아서 좋은데 flutter는 앱 환경에, dart라서 걱정하실 필요 전혀 없습니다! 저도 해냈으니까 여러분은 더 잘 하실거라 믿으며 마무리하겠습니다.
읽어주셔서 감사합니다.

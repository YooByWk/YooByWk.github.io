---
layout: post
title: Hardhat을 사용해보자
subtitle: feat. 터미널에서 트랜잭션 전송해보기
tags: [blockchain, Smart Contract, solidity, hardhat]
date: 2025-01-09
categories: [blockchain, Smart Contract, NFT]
toc: true
banner: https://github.com/user-attachments/assets/330f9b76-045b-412e-afe1-0dd3146bc62c
---

본격적인 스마트 컨트랙트 작성 전에 이미 작성한 부분에 대해서 정리함과 동시에

어떤 부분을 어떻게 개선 / 재작성 하는 것이 좋을지 생각하기 위해 한번 정리해보기로 했읍니다. . .

겸사겸사 어제 하루종일 gui없이 cli로 트랜잭션을 보내서 데이터를 확인하려고 했는데 마침 성공하여 TIL과 비슷한 성격으로 작성해보려고 합니닷

~~대충 실제로 올라간 스마트 컨트랙트 호출해서 마지막으로 확인해본다는 내용~~

목표 : 프록시 패턴을 사용한 부분에 대한 이해보다는, 실제로 호출하며 어떻게 저장된건지 로그 찍어보기

# Hardhat?

https://hardhat.org

> 이더리움 스마트 계약을 개발, 테스트, 배포, 디버깅 하는데 사용되는 node기반 개발환경

## 특징

- 플러그인 기반 : `truffle`, `web3`, `ethers` 등 여러 플러그인 단위 확장 가능
- `solidity` 컴파일러 내장. 다양한 버전 지원
- 테스트 지원
- 배포 자동화
- 메인넷 뿐 아니라 테스트넷과 상호작용 가능

## hardhat 시작하기

`npx hardhat init` 명령어를 통해 프로젝트를 시작합니다.

- vscode를 사용중이라면, hardhat extension을 깔아서 사용하면 편해요.
  - 솔리디티 파일 관련해서 포매팅, 자동완성, 기타 등등...

## hardhat config

기초 설정이 필요합니다.

`sepolia`테스트넷과 `holesky`테스트넷 두개를 사용해서 다음과 같은 config 파일을 `hardhat`을 사용할 루트 경로에 만들었습니다.

```ts
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { config as dotenvConfig } from "dotenv";
dotenvConfig(); // .env 파일 로드

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env["INFURA_API_KEY"]!}`,
      accounts: [`0x${process.env["PRIVATE_KEY"]!}`],
    },
    holesky: {
      url: "https://holesky.gateway.tenderly.co",
      accounts: [`0x${process.env["PRIVATE_KEY"]!}`],
    },
  },
};

export default config;
```

## hardhat 폴더구조

```bash
root/
  - contracts/ # 스마트 계약
  - artifacts/ # 컴파일된 결과...?
  - ignitions/ # 배포 관련
    | - modules/ # 배포 스크립트
    | - deployments/ # 배포된 컨트랙트 정보들...
  hardhat.config.ts # 위에서 말한 설정파일
```

- `remix`도 간단하니 좋은데
- `hardhat`도 꽤나 간편하니 좋다

> 컨트랙트 작성은 동일하게 솔리디티 파일을 작성하면 되는거라 패스.

## hardhat으로 배포하기

> local deploy는 건너뛰고 바로 테스트넷에 deploy 했습니다.

기본적으로 하드햇으로 프로젝트를 생성하면 `Lock` 이라는 샘플이 하나 있습니다. (contracts 폴더에 Lock.sol 하나, ignitions/modules/ 에 Lock.ts(js) 하나)

해당 파일은 견본으로 아무 과정 없이 배포할 수 있습니다.

실제로 스마트 계약을 배포하는 것 또한 해당 파일과는 크게 차이가 없었기에 간단하게 카피... 하기 좋았네요

과정은 다음과 같습니다.

1. 설정을 마칩니다. (config.ts/js)
2. 스마트 계약을 작성합니다 (이번에는 Lock을 이용합니다)
3. 배포를 위한 파일을 작성합니다.
4. `npx hardhat ignition deploy "파일경로" --network "사용할네트워크"`
5. 기다림의 시간 후 deployments의 deployed_address_json에서 계약 주소 확인

![res](https://github.com/user-attachments/assets/bcef3e3c-803c-4d38-8e6f-7fb92c1b59cf)

## ts 파일로 트랜잭션 보내보기

> 이거 정말 편했습니다.

![hardhatTS](https://github.com/user-attachments/assets/b6b94f89-d2f3-4217-b229-de32b67c740e)
저는 로그를 찍어보는걸 꽤 좋아합니다.

사실 이전에 작성한 컨트랙트가 문제가 조금 많다는 판단이 들어서 확인을 해 보아야하는 것도 있었는데, 프론트엔드를 실행하고 브라우저 - ide 과정을 거치며 개발을 하는게 편하지는 않더라고요.

그래서 hardhat을 이용해, 이미 배포되어있는 컨트랙트와 상호작용을 해보았습니다.

### 과정

1. ts 파일 작성
2. 실행 (가스비에 주의)

실로 간단합니다.

```ts
import { abi } from "abi경로/컨트랙트이름.json";
const { ethers } = require("hardhat");
const contractAddr = "컨트랙트 주소";
async function main() {
  const contract = await ethers.getContractAt(abi, contractAddr);

  try {
    const version = await contract.version(); // 작성한 컨트랙트의 함수를 호출하면 됩니다.
    console.log(version);
  } catch {
    throw new Error();
  }
}
main();
```

실행하기 :

`npx hardhat run 파일이름 --network "사용할 네트워크 이름"`

> 좋은 테스트 방법은 아닌 것 같지만, 실제 배포된 컨트랙트에 접근하는 방식이라서 조금 든든한 느낌이 들었습니다.

실제로 돌려본 결과

> 여기에 사용된 코드는 위의 예시와는 조금 달라요.

![hardhatRes](https://github.com/user-attachments/assets/b6b94f89-d2f3-4217-b229-de32b67c740e)

꽤나 잘 떠서 만족했습니다.

> TokenOwner와, getNFTsByOwner의 결과가 달라서... 이런 부분을 미리 방지하고자 기초부터 다시 학습중입니닷.

> 해당 방식으로 주기적으로 확인하며 개발할 수 있어서 편했습니다.
>
> 로컬 배포 후 진행한다면, 더욱 안전하고 빠르게 진행할 수 있을 것 같네요

## 엔딩

와.

생각보다 많이 편해요

프론트 개발도 같이 하고 있지만, 매번 로그찍는 것 보다 편하고, 개발에 있어서 조금 흐름이 끊어지지 않는 기분이 많이 들었습니다.

놓치는 부분에 대해서도 하드햇이 잘 잡아주기도 하고요.

편한것도 편한건데,위에서 말한것처럼 하드햇이 생각보다 관리를 잘 해주더라구요... 파일이나 기록같은것들을.. 특히 주소라던지 abi라던지...

아직 로컬 테스트는 진행해보지는 않았지만, 생산성 부분에서 꽤나 크게 이득을 볼 수 있을것 같다는 생각이 들었습니다.

추후에는 하드햇 내부에 이더스캔까지 포함해서 깔끔한 이력 추적을 해보고자 합니다.

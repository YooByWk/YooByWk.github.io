---
layout: post
title: "솔리디티 테스트 코드 2"
# subtitle: CI값? DID 값?
categories: [Reuse, Solidity]
tags: [Reuse, JavaScript, Solidity]
toc: true
date: 2025-08-05
---

## 1편 요약

1. Hardhat + Chai
2. 이벤트 검증

# 근데 문제가 많은...

## 난이도 상승의 주범 : Escrow의 고급 기능

### 1. 서명 테스트

> ERC20 Permit

**문제점**: 기존 ERC-20 토큰을 컨트랙트로 보내려면 approve -> transferFrom이라는 2단계 트랜잭션이 필요해 유저 경험이 불편하고 가스비가 두 번 발생

**해결책**: ERC20 Permit(EIP-2612)을 도입하여, 유저가 오프체인 서명 한 번으로 approve와 transferFrom을 한 번에 처리

**테스트 방식**

**유효성 검증**: getPermitSignature 유틸리티 함수를 사용해 올바른 서명을 생성하고, deposit 함수가 성공적으로 실행되는지 테스트.

**부정 시나리오**: 잘못된 서명을 넣었을 때 revertedWithCustomError(MyTokenContract, "ERC2612InvalidSigner")와 같은 커스텀 에러와 함께 리버트되는지 검증하여, 서명 위조를 원천적으로 차단

### 2. 시간 테스트

**문제점**: 구매자가 `claimFunds`를 호출하지 않으면 판매자는 영원히 대금을 받지 못할 수 있음.

**해결책**: 배송 완료 후 일정 기간(`AUTO_RELEASE_DELAY`)이 지나면 누구나 `autoReleaseFunds` 함수를 호출하여 판매자에게 대금을 정산할 수 있도록 함.

**테스트 방식:**

**Hardhat의 시간 조작**: `time.increase(autoReleaseDelay + 5)`를 사용해 로컬 블록체인의 시간을 자유롭게 조작함.

**긍정 시나리오**: AUTO_RELEASE_DELAY가 충분히 지난 후 autoReleaseFunds를 호출하면 성공적으로 정산되는지 확.

**부정 시나리오**: time.increase(autoReleaseDelay - 5)와 같이 아직 딜레이 시간이 지나지 않았을 때 함수를 호출하면, **revertedWithoutReason()**으로 에러가 발생하는지 검증.

### 3. 권한 테스트

**문제점**: `releaseFunds`, `refundFunds와` 같은 민감한 강제 정산/환불 기능은 오직 관리자(`ADMIN_ROLE`)만 호출할 수 있어야 함.

**해결책**: `OpenZeppelin`의 `AccessControl` 라이브러리를 상속하여, 각 역할에 맞는 권한을 부여하고 관리.

**테스트 방식:**

`Should not allow non-admin to release funds forcefully`와 같은 테스트를 통해, 관리자가 아닌 계정(`client`, `seller`, `nonRoleUser`)이 해당 함수를 호출했을 때 `revertedWithCustomError(EscrowContract, "AccessControlUnauthorizedAccount")` 와 함께 실패하는지 검증.

# 결론

이정도면 그래도 "열심히 테스트 했다" 라고 생각할 수 있는 좋은 기회 아니었을까?

![test](/assets/images/blockchain/solidityTest/solidityTest.png)

참으로 방대한 코드였지만. 뿌듯함은 엄청났다!

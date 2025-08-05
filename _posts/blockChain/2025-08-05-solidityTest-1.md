---
layout: post
title: "솔리디티 테스트 코드 1"
# subtitle: CI값? DID 값?
categories: [Reuse, Solidity]
tags: [Reuse, JavaScript, Solidity]
toc: true
date: 2025-08-05
---

## 들어가기 전에.

> 블록체인 기반의 서비스를 만든다면 어떻게 신뢰를 줄 수 있을까?
>
> 그리고 자산이 오가야 하는 핵심 로직을 어떻게 검증하고, 더 완전하게 만들 수 있을까?

1. 그냥 테스트 코드 없이 배포하기
2. 성공 케이스만 테스트하기

1.의 경우 -> 작은 버그 하나로도 컨트랙트의 신뢰성이 사라진다.

2.의 경우 -> 예외적 상황에 대한 고려가 쉽지 않음.

즉 부정적 시나리오에 대한 내구성이 낮음.

이런 생각 후, 테스트 코드에 많은 공을 들이기로 결정.

# 테스트 환경 구축 : Hardhat & Chai

## Hardhat

`Hardhat`은 이더리움 개발자를 위한 개발 환경.

로컬에서 가상의 블록체인 실행, 컨트랙트의 컴파일, 테스트를 실행 할 수 있음.

ethers.js 라이브러리와 연동되어 쉽게 배포 + 상호작용 가능

## Chai & Hardhat-Chai-Matchers

Chai는 테스트 결과를 검증하는 데 사용하는 어서션(Assertion) 라이브러리.

Hardhat-Chai-Matchers 플러그인은 revertedWith, emitted 등 스마트 컨트랙트 특화 검증 기능을 추가함

## 테스트의 3가지 핵심 시나리오

우선 `deposit` 함수를 예로 들어, 스마트 컨트랙트 테스트의 가장 중요한 세 가지 시나리오를 다루는 방식으로 테스트 코드를 구성.

### 성공(Positive) 시나리오 테스트:

목표: 기능이 올바른 입력과 조건에서 성공적으로 작동하는지 확인.

예시: `Should allow client to deposit funds using permit and emit EscrowCreated & FundsDeposited events`

이 테스트는 구매자(client)가 permit 서명을 통해 자금을 예치하고, 에스크로가 올바르게 생성되며, 관련 이벤트가 정확한 인자와 함께 발생하는지 검증.

### 실패(Negative) 시나리오 테스트:

목표: 잘못된 입력이나 조건에서 기능이 실패(Revert)하는지 확인.

예시: `Should not allow deposit with zero amount`

이 테스트는 예치 금액이 0일 때 컨트랙트가 의도적으로 트랜잭션을 되돌리는지 검증. to.be.reverted를 사용해 실패 자체를 확인하거나, revertedWith("reason")을 사용해 특정 에러 메시지까지 확인.

### 이벤트(Event) 검증:

목표: 컨트랙트가 특정 액션 후에 예상했던 이벤트를 올바른 값과 함께 방출하는지 확인.

예시: `to.emit(EscrowContract, "FundsDeposited").withArgs(escrowId, clientAddr, sellerAddr, escrowAmount, proposalId)`

이벤트는 오프체인 애플리케이션이 온체인 상태변화를 감지하는 중요한 로직이기에, 이벤트 정확성 검증 또한 필수적임.

## 주절

이런 방식으로 우선 테스트 코드를 작성하기로 했다.

---
layout: post
title: 블록체인 시작
subtitle: 블록체인을 시작해봅니다. feat. 간단개념
tags: blockchain, intro
date: 2024-03-05
categories: [blockchain, intro]
# top :
toc: true
# banner :
# image: https://bit.ly/3xTmdUP

banner:
  image: https://1drv.ms/i/c/60d1136c8e1eeac5/IQMvQxJmha7JTbEDDTw6iMjJAWYJEUirRCMAyiJPnsOezjE?width=1024
---

# 블록체인

> 주의 : 이 문서는 이미지가 거의 없습니다.

## 블록체인 개요

- 비트코인 : 정부 거대 기업으로부터 개인의 권리와 자산을 지키기 위한 운동. 사토시 나카모토가 발명
- 세계 최초의 탈중앙형 화폐
- 2009 1월 3일 사토시 나카모토의 첫 채굴이 일어나며 비트코인 네트워크 가동 시작
- 비트코인 최초 블록 에는 영국 정부의 구제금융 발표 뉴스의 제목 기록

### 블록체인 2.0

- 업계 최초 ICO (Initial Coin Offering) 를 통해 개발비 모금
- 2015 이더리움 네트워크 시작
- 탈 중앙화된 컴퓨팅 인프라. 월드 컴퓨터라고도 불린다.
- 블록체인에 스마트 컨트랙드 도입. DAO (Decentralized Autonomous Organization) 자기주권신원증명 탈중앙형 금융등의 가능성을 보여주고 Web3.0의 기반을 마련했다는 평가

### 정의 :

P2P (Peer to Peer) 네트워크를 통해 관리되는 분산 데이터 베이스의 한형태로 블록체인 노드에 디지털 서명된 거래 정보를 보관하는 **분산 원장 기술**

### 내가 이해한 것?

간단하게 일종의 데이터베이스라고 생각해도 될 것같다.

DB에 거래내용이나 뭔가 추가할 것이지만 제거 변경 불가.  
하지만 스마트 컨트렉트는 변경 가능 : 스마트 컨트랙트 주소의 업데이트나 다름없다.

블록 : 데이터베이스에 추가되는 것  
블록체인 : 서로 연결된 일련의 블록  
DApp은 이에 기반한 App

### 중앙화 vs 탈중앙화

중앙화 : 특정 기관을 통해 사용자 데이터를 저장한다.

- 하나의 데이터 소스에 모든 유저가 연결됨
- 하나의 특정 집단에게 데이터에 대한 모든 권한이 생김
  - 데이터가 사라지는 경우 : 모든 데이터 사라짐
  - "하나의 기관"이 데이터를 수정할 수 있음
- **중앙화** 네트워크

탈중앙화 :

- 각 노드에 저장되는 것.
- 상호간 듣고 동의하는 네트워크가 필요하다
- 참여하는 모든 노드가 데이터를 나눠가짐
  - 한 노드에서 데이터가 사라져도 다른 노드가 대신 데이터를 제공 가능하다.
  - = 신뢰도가 높다.

## Remix IDE

1. Solidity & Dapp 개발에 스마트 컨트랙트 실행 外 유용합니다

Remix IDE의 컴파일러와, 코드 모습  
~~익숙한 모습~~

<!-- ![remix](https://private-user-images.githubusercontent.com/139323278/397694540-91419099-cfdc-44e0-971a-cf34eec437af.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzQ2ODg4MjQsIm5iZiI6MTczNDY4ODUyNCwicGF0aCI6Ii8xMzkzMjMyNzgvMzk3Njk0NTQwLTkxNDE5MDk5LWNmZGMtNDRlMC05NzFhLWNmMzRlZWM0MzdhZi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQxMjIwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MTIyMFQwOTU1MjRaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1hZjA4MWJlYzhiZTZjMTNiMzYxNDFlZDY5ZjA4NmViN2Y2MDYwY2VjMjMxYjM4ZDJiMzQzYjhhMmVhM2Y3ODAxJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.CYuZybEyhjbEFsD-227YFyUGIGZamH6RTkCzXba-6gg) -->

<!-- remix-->
<center><img src='https://github.com/user-attachments/assets/91419099-cfdc-44e0-971a-cf34eec437af' width="80%"></center>

---

계약작성 이후 컴파일 ->

### 계약 배포 :

블록체인에서 거래가 체결되는 것.  
Remix IDE의 DEPLOY & TRANSACTIONS 에서 진행한다.

<!-- ![deploy](https://1drv.ms/i/c/60d1136c8e1eeac5/IQOBlefSNNJ3S4k35FUSWbcbAdMvs-bUW3ZY_JFEOzwfnOU?width=1024) -->

<center><img src="https://github.com/user-attachments/assets/abb9183a-e853-4fba-a0a6-cc5408951bc4" alt="Deploy" height="512px"></center>

> ps. 그 외의 기능도 다양함...

# 마무리..

블록체인도 시작합니다.
2024/03/07 Jue.

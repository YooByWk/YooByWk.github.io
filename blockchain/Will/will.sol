pragma solidity ^0.8.4;

contract Will {
    // 계약에서 호출 가능한 변수
    address owner; // 소유자 주소
    uint fortune; // 금액 : 정수
    bool deceased; // 사망 여부

    constructor() payable public {
        owner = msg.sender; // msg sender represents address being called
        fortune = msg.value; //msg value tells us how much ether is being sent  
    }

    // create modifier so the only person who can call the contract is the owner
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    // only allocate funds if friend's gramps is deceased
    // 제어자임. 아래에서 사용. 함수의 실행 조건을 말한다. 파이썬의 데코레이터?
    modifier mustBeDeceased {
        require(deceased == true);
        _;
    }    

    // list of family wallets 배열입니다.
    address payable[] familyWallets;

    // map through inheritance // 매핑
    mapping(address => uint) inheritance;

    
    // 각 주소에 유산을 할당 : 소유자만 이 함수를 실행 시킬 수 있다.
    function setInheritance(address payable wallet, uint amount) public onlyOwner {
        familyWallets.push(wallet);
        inheritance[wallet] = amount;
    } 



    // 가족 구성원 지갑 주소에 각각 지급
    function payout() private mustBeDeceased {
        // for 루프 생성
        for (uint i = 0; i <familyWallets.length; i++) {
            // 계좌의 i 인덱스에 familWallet[i], 즉 amount를 전송한다.
            familyWallets[i].transfer(inheritance[familyWallets[i]]);
        }
    }
    
    function deceased() public onlyOwner {
        isDeceased = true;
        
    }
}
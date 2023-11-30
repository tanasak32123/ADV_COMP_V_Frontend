// SPDX-License-Identifier: Non-License
pragma solidity 0.8.0;

contract Lottery  {

    uint[] public arr = [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0];

    enum StateType { ChoosingDealer, Baiting, CheckReward } 
    enum PlayType {All, Front, Back}
    enum ArrangeType {Tod, Teng}
    enum DigitType {Two, Three}

    struct BaitData {
        string baitNumber ; 
        uint256 amount ; 
        uint256 baitValue ; 
        DigitType digitType ; 
        PlayType playType ; 
        ArrangeType arrangeType;
    }

    struct PersonalData {
        BaitData[] baitsData; 
        uint256 totalReward ;  
    }

    address owner;
    address dealer; 

    uint256 stakeAmount = 10000000000000000000;
    uint256 private seed;
    uint256 private dealerReward = 0; 

    mapping(address => PersonalData) personalData ;
    mapping(string => PlayType) playMap ; 
    mapping(string => ArrangeType) arrangeMap ;
    mapping(string => DigitType) digitMap ;

    address[] public accounts ;
    address[] private dealers; 
     
    string firstPrizeNumber ; 
    string threeFrontNumber ; 
    string threeBackNumber ; 
    string twoNumber ; 

    constructor(){
        owner = msg.sender;
        initValue();

        // init play map 
        playMap["All"] = PlayType.All;
        playMap["Front"] = PlayType.Front;
        playMap["Back"] = PlayType.Back; 

        // init arrange map 
        arrangeMap["Tod"] = ArrangeType.Tod;
        arrangeMap["Teng"] = ArrangeType.Teng; 

        // init arrange map 
        digitMap["Two"] = DigitType.Two;
        digitMap["Three"] = DigitType.Three;

    }

    function initValue() internal {
        dealerReward = 0 ;
        // delete all value in dealer
        for (uint i = 0 ; i < dealers.length; i++){
            delete dealers[i] ;
        }
        
        // delete all personal data 
        for (uint i = 0 ; i < accounts.length; i++){
            for (uint j = 0 ; j < personalData[accounts[i]].baitsData.length ; j++){
                delete personalData[accounts[i]].baitsData[j]; 
            }
            personalData[accounts[i]].totalReward = 0 ;
        }

        // delete all element 
        for (uint i = 0 ; i < accounts.length; i++){
            delete accounts[i];
        }
    }

    function addDealer() payable public {
        require(msg.value == stakeAmount, "Not enough stake"); 
        payContract(msg.value);
        dealers.push(msg.sender);
    }

    function registerRewardNumber(string calldata _firstPrizeNumber, string calldata _threeFrontNumber, string calldata _threeBackNumber, string calldata _twoNumber) external {
        firstPrizeNumber = _firstPrizeNumber;
        threeFrontNumber = _threeFrontNumber;
        threeBackNumber = _threeBackNumber;
        twoNumber = _twoNumber;
    }

    function chooseDealer() payable public {
        require(dealers.length > 0,  "No dealer");
        uint idx = getRandomNumber(0, dealers.length-1);
        dealer = dealers[idx]; 
        dealerReward += stakeAmount;

        // refund stake 
        for (uint i=0 ; i < dealers.length;i++){
            if (dealers[i] != dealer){
                _transfer(payable(dealers[i]), stakeAmount);
            }
        }
    }

    function isValidTod(string memory _baitNumber, string memory _target) public pure returns(bool) {
        return keccak256(abi.encodePacked(_baitNumber)) == keccak256(abi.encodePacked(_target));
    }

    function isValidTeng(string memory _baitNumber, string memory _target) public pure returns(bool)  {
        return keccak256(abi.encodePacked(sortString(_baitNumber))) == keccak256(abi.encodePacked(sortString(_target)));
    }

    function calculateThreeDigit(string memory _baitNumber, PlayType _playType, ArrangeType _arrangeType ) internal  view returns(uint) {
        string memory target ; 
        uint totalReward = 0 ; 
        if (_playType == PlayType.Front) {
            target = threeFrontNumber; 
        }else if (_playType == PlayType.Back){
            target = threeBackNumber ;
        }

        if (_arrangeType == ArrangeType.Tod) {
            totalReward = isValidTod(_baitNumber, target) ?  totalReward + 300 : totalReward ; 
        }else if (_arrangeType == ArrangeType.Teng){
            totalReward = isValidTeng(_baitNumber, target) ?  totalReward + 200 : totalReward ; 
        }
        return totalReward;
    }

    function calculateTwoDigit(string memory _baitNumber, ArrangeType _arrangeType) internal  view returns (uint256)  {
        uint totalReward = 0 ; 
        if (_arrangeType == ArrangeType.Tod){
            //totalReward = (isValidTod(_baitNumber, firstPrizeNumber[4:])) ? totalReward + 200 : totalReward ;
            totalReward = (isValidTod(_baitNumber, twoNumber)) ? totalReward + 200 : totalReward ;
        }else if (_arrangeType == ArrangeType.Teng) {
            totalReward = (isValidTeng(_baitNumber, twoNumber)) ? totalReward + 200 : totalReward ;
        }
        return totalReward ;
    }

    function calculateReward() public   {
        for (uint i = 0 ; i < accounts.length ; i += 1) {
           PersonalData storage data = personalData[accounts[i]] ; 
           uint totalReward = 0 ; 
           // cal each bait 
           for (uint j = 0 ; j < data.baitsData.length ; j += 1){
                uint multiplier;
                if (data.baitsData[j].digitType == DigitType.Two){
                    multiplier =  calculateTwoDigit(data.baitsData[j].baitNumber, data.baitsData[j].arrangeType) ; 
                } else {
                    multiplier =  calculateThreeDigit(data.baitsData[j].baitNumber, data.baitsData[j].playType, data.baitsData[j].arrangeType) ; 
                }
                totalReward += (data.baitsData[j].baitValue * data.baitsData[j].amount * multiplier )/100 ; 
           }
           personalData[accounts[i]].totalReward = totalReward ; 
           dealerReward -= totalReward;
        }
    }

    function payReward() public {
        // iterate all accounts
        for (uint i = 0; i < accounts.length; i++) {
            if (personalData[accounts[i]].totalReward != 0){
                _transfer(payable(accounts[i]), personalData[accounts[i]].totalReward);
            }
        }

        // pay to dealer 
        _transfer(payable(dealer), dealerReward); 
    }

    function buyLottery(string calldata _baitNumber, uint _baitAmount, uint _baitValue, string calldata _playType, string calldata _arrangeType, string calldata digitType) payable external  {
        require(_baitAmount*_baitValue == msg.value, " invalid value" );
        require(msg.sender != dealer, "dealer cannot do this");
        if (!isElementExists(msg.sender)){
            accounts.push(msg.sender);
            //personalData[msg.sender] = PersonalData( BaitData , 0) ; 
        }
        personalData[msg.sender].baitsData.push(BaitData(_baitNumber, _baitAmount, _baitValue, digitMap[digitType], playMap[_playType], arrangeMap[_arrangeType]));

        // dealer reward increase
        dealerReward += (_baitAmount * _baitValue ); 
        // pay to contract
        payContract(msg.value);
    }

    function sortString(string memory inputStr) internal pure returns (string memory) {
        bytes memory inputBytes = bytes(inputStr);

        for (uint i = 0; i < inputBytes.length - 1; i++) {
            for (uint j = i + 1; j < inputBytes.length; j++) {
                if (inputBytes[i] > inputBytes[j]) {
                    // Swap characters
                    (inputBytes[i], inputBytes[j]) = (inputBytes[j], inputBytes[i]);
                }
            }
        }

        return string(inputBytes);
    }

    function getInformation() external view returns(PersonalData memory){
        return personalData[msg.sender];
    }

    function getDealer() public view returns(address) {
        return dealer ; 
    }

    function isElementExists(address _element) internal view returns (bool) {
        for (uint i = 0; i < accounts.length; i++) {
            if (accounts[i] == _element) {
                return true;
            }
        }
        return false;
    }


    function getBalance() public view returns(uint) {
        return msg.sender.balance;
    }

    function getContractBalance() public view returns(uint) {
        return address(this).balance;
    }

    function getRandomNumber(uint256 a, uint256 b) internal returns (uint256) {
        require(a <= b, "Invalid range");
        uint256 randomNumber = (uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, seed))) % (b - a + 1)) + a;
        seed = randomNumber;
        return randomNumber;
    }

    function _transfer(address payable  _to, uint256 amount) internal {
        (bool success, ) = _to.call{value: amount}(new bytes(0));
        if (!success) {
            revert("transfer error");
        }
    }

    function pay(address  _to, uint256 amount) public payable  {
            _transfer(payable(_to), amount);
    }

    event transferToContract(address from, uint amount);

    function payContract(uint amount) public payable {
        emit transferToContract(msg.sender, amount);
    }

}





    


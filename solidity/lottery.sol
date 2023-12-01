// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract Lottery  {

    int[] public arr = [0, 0, 0, 0, 0, 0, 0, 0 ,0 ,0];

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

    uint256 stakeAmount = 50000000000000000000;
    uint256 private seed;
    uint256 private dealerReward = 0; 

    mapping(address => PersonalData) personalData ;
    mapping(string => PlayType) playMap ; 
    mapping(string => ArrangeType) arrangeMap ;
    mapping(string => DigitType) digitMap ;

    address[] public accounts ;
    address[] private dealers; 
     
    string firstPrizeNumber ; 
    string threeFrontNumber1 ; 
    string threeFrontNumber2 ;  
    string threeBackNumber1 ; 
    string threeBackNumber2 ; 
    string twoNumber ; 

    constructor(){
        owner = msg.sender;
        resetValue();

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

    function resetValue() public  {
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

    function registerRewardNumber(
        string calldata _firstPrizeNumber, 
        string calldata _threeFrontNumber1, 
        string calldata _threeFrontNumber2, 
        string calldata _threeBackNumber1, 
        string calldata _threeBackNumber2, 
        string calldata _twoNumber) external {
        require(bytes(_firstPrizeNumber).length == 6, "first prize must have 6 digit");
        firstPrizeNumber = _firstPrizeNumber;
        require(bytes(_threeFrontNumber1).length == 3, "front prize must have 3 digit");
        threeFrontNumber1 = _threeFrontNumber1;
        require(bytes(_threeFrontNumber2).length == 3, "front prize must have 3 digit");
        threeFrontNumber2 = _threeFrontNumber2;
        require(bytes(_threeBackNumber1).length == 3, "back prize must have 3 digit");
        threeBackNumber1 = _threeBackNumber1;
        require(bytes(_threeBackNumber2).length == 3, "back prize must have 3 digit");
        threeBackNumber2 = _threeBackNumber2;
        require(bytes(_twoNumber).length == 2, "two number prize must have 2 digit");
        twoNumber = _twoNumber;
    }

    function chooseDealer() payable public {
        require(dealers.length > 0,  "No dealer");
        uint idx = getRandomNumber(0, dealers.length-1);
        dealer = dealers[idx]; 
        dealerReward += stakeAmount;

        // refund stake 
        for (uint i=0 ; i < dealers.length ;i++){
            if (dealers[i] != dealer){
                _transfer(payable(dealers[i]), stakeAmount);
            }
        }
    }

    function isValidTod(string memory _baitNumber, string memory _target) public pure returns(bool) {
        return keccak256(abi.encodePacked(_baitNumber)) == keccak256(abi.encodePacked(_target));
    }

    function isValidTeng(string memory _baitNumber, string memory _target) payable public  returns(bool)  {
        return keccak256(abi.encodePacked(sortString(_baitNumber))) == keccak256(abi.encodePacked(sortString(_target)));
    }

    function calculateThreeDigit(string memory _baitNumber, PlayType _playType, ArrangeType _arrangeType ) public  returns(uint) {
        string memory target1 ; // first prize 
        string memory target2 ; // three 1
        string memory target3 ; // three 2
        
        uint totalReward = 0 ; 

        if (_playType == PlayType.Front) {
            target1 = sliceString(firstPrizeNumber, 0, bytes(firstPrizeNumber).length/2);
            target2 = threeFrontNumber1;
            target3 = threeFrontNumber2; 
        }else if (_playType == PlayType.Back){
            target1 = sliceString(firstPrizeNumber, bytes(firstPrizeNumber).length/2, bytes(firstPrizeNumber).length);
            target2 = threeBackNumber1;
            target3 = threeBackNumber2; 
        }

        if (_arrangeType == ArrangeType.Tod) {
            totalReward += isValidTod(_baitNumber, target1) ?   350 : 0 ; 
            totalReward += isValidTod(_baitNumber, target2) ?   300 : 0 ; 
            totalReward += isValidTod(_baitNumber, target3) ?   300 : 0 ; 
        }else if (_arrangeType == ArrangeType.Teng){
            totalReward += isValidTeng(_baitNumber, target1) ?   250 : 0 ; 
            totalReward += isValidTeng(_baitNumber, target2) ?   200 : 0 ; 
            totalReward += isValidTeng(_baitNumber, target3) ?   200 : 0 ; 
        }
        return totalReward;
    }

    function calculateTwoDigit(string memory _baitNumber, ArrangeType _arrangeType) public  returns (uint256)  {
        uint totalReward = 0 ; 
        string memory sliceFirstPrize = sliceString(firstPrizeNumber, bytes(firstPrizeNumber).length/2 + 1, bytes(firstPrizeNumber).length);
        if (_arrangeType == ArrangeType.Tod){
            totalReward += (isValidTod(_baitNumber, sliceFirstPrize)) ?   250 : 0 ;
            totalReward += (isValidTod(_baitNumber, twoNumber)) ?   200 : 0 ;
        }else if (_arrangeType == ArrangeType.Teng) {
            totalReward += (isValidTeng(_baitNumber, sliceFirstPrize)) ?   150 : 0 ;
            totalReward += (isValidTeng(_baitNumber, twoNumber)) ?  125 : 0 ;
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
        require(_baitAmount*_baitValue == msg.value, "invalid value" );
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

    function sliceString(string memory str, uint startIndex, uint endIndex) public pure returns (string memory) {
        bytes memory strBytes = bytes(str);

        require(startIndex <= endIndex, "Invalid slice indices");
        require(endIndex <= strBytes.length, "End index out of bounds");

        bytes memory slicedBytes = new bytes(endIndex - startIndex);

        for (uint i = startIndex; i < endIndex; i++) {
            slicedBytes[i - startIndex] = strBytes[i];
        }

        return string(slicedBytes);
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





    


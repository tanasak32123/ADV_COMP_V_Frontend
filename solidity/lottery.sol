// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

contract Lottery  {
 
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

    struct LotteryInput {
        string baitNumber ;
        uint256 amount ;
        uint256 baitValue ; 
        string digitType ; 
        string playType ; 
        string arrangeType;
    }

    struct PersonalData {
        BaitData[] baitsData; 
        uint256 totalReward ;  
    }

    address dealer; 
    address lastDealer;

    uint256 stakeAmount = 50000000000000000000 ;
    uint256 private seed;
    uint256 private dealerReward = 0; 
    uint256 private lastDealerReward = 0;

    mapping(address => PersonalData) personalData ;
    mapping(address => PersonalData) lastPersonalData ;
    mapping(string => PlayType) playMap ; 
    mapping(string => ArrangeType) arrangeMap ;
    mapping(string => DigitType) digitMap ;

    address[] private accounts ;
    address[] private dealers; 
     
    string firstPrizeNumber ; 
    string threeFrontNumber1 ; 
    string threeFrontNumber2 ;  
    string threeBackNumber1 ; 
    string threeBackNumber2 ; 
    string twoNumber ; 

    constructor(){
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
        lastDealerReward = dealerReward;
        dealerReward = 0 ;
        
        lastDealer = dealer;
        dealer = address(0);
        
        // delete all value in dealer
        while(dealers.length > 0 ){
            dealers.pop();
        }
        
        // delete all personal data 
        for (uint i = 0 ; i < accounts.length; i++){
            lastPersonalData[accounts[i]] = personalData[accounts[i]] ; 
            while(personalData[accounts[i]].baitsData.length > 0){
                personalData[accounts[i]].baitsData.pop(); 
            }
            personalData[accounts[i]].totalReward = 0 ;
        }

        // delete all element 
        while(accounts.length > 0){
            accounts.pop();
        }
    }

    function addDealer() payable external {
        require(msg.value == stakeAmount, "Not enough stake"); 
        // Is sender in dealers ? 
        if (isDealerCandidate(msg.sender)) {
            revert("you are candidate");
        }
        payContract(msg.value);
        dealers.push(msg.sender);
    }

    function isDealerCandidate(address player) public view returns(bool){
        for (uint i = 0 ; i < dealers.length ; i++){
            if (dealers[i] == player) return true;
        }
        return false;
    }

    function registerRewardNumber(
        string calldata _firstPrizeNumber, 
        string calldata _threeFrontNumber1, 
        string calldata _threeFrontNumber2, 
        string calldata _threeBackNumber1, 
        string calldata _threeBackNumber2, 
        string calldata _twoNumber) internal  {
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

    function chooseDealer() payable external {
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

    function isValidTod(string memory _baitNumber, string memory _target) internal pure returns(bool) {
        return keccak256(abi.encodePacked(_baitNumber)) == keccak256(abi.encodePacked(_target));
    }

    function isValidTeng(string memory _baitNumber, string memory _target) internal pure  returns(bool)  {
        return keccak256(abi.encodePacked(sortString(_baitNumber))) == keccak256(abi.encodePacked(sortString(_target)));
    }

    function calculateThreeDigit(string memory _baitNumber, PlayType _playType, ArrangeType _arrangeType ) internal  view returns(uint) {
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

    function calculateTwoDigit(string memory _baitNumber, ArrangeType _arrangeType) internal view returns (uint256)  {
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

    function calculateReward(
        string calldata _firstPrizeNumber, 
        string calldata _threeFrontNumber1, 
        string calldata _threeFrontNumber2, 
        string calldata _threeBackNumber1, 
        string calldata _threeBackNumber2, 
        string calldata _twoNumber
    ) public {
        registerRewardNumber(_firstPrizeNumber, _threeFrontNumber1, _threeFrontNumber2, _threeBackNumber1, _threeBackNumber2, _twoNumber);
        uint totalPlayerReward = 0 ; 
        for (uint i = 0 ; i < accounts.length ; i += 1) {
           PersonalData storage data = personalData[accounts[i]] ; 
           uint playerReward = 0 ; 
           // cal each bet
           for (uint j = 0 ; j < data.baitsData.length ; j += 1){
                uint multiplier;
                if (data.baitsData[j].digitType == DigitType.Two){
                    multiplier =  calculateTwoDigit(data.baitsData[j].baitNumber, data.baitsData[j].arrangeType) ; 
                } else {
                    multiplier =  calculateThreeDigit(data.baitsData[j].baitNumber, data.baitsData[j].playType, data.baitsData[j].arrangeType) ; 
                }
                playerReward += (data.baitsData[j].baitValue * data.baitsData[j].amount * multiplier )/100 ; 
           }
           personalData[accounts[i]].totalReward = playerReward ; 
           totalPlayerReward += playerReward ; 
        }
        
        // check amount
        if (totalPlayerReward > getContractBalance()){
            uint addOn = stakeAmount/accounts.length ; 
            // refund user 
            for (uint i = 0 ; i < accounts.length ; i += 1){
                uint realReward = 0 ; 
                for (uint j = 0 ; j < personalData[accounts[i]].baitsData.length ; j += 1){
                    realReward += personalData[accounts[i]].baitsData[j].baitValue * personalData[accounts[i]].baitsData[j].amount;
                }
                
                personalData[accounts[i]].totalReward = realReward +  addOn;
            }
            dealerReward = 0 ;
        }else {
            dealerReward -= totalPlayerReward;
        }
        payReward();
        resetValue();
    }

    function payReward() internal {
        // iterate all accounts
        for (uint i = 0; i < accounts.length; i++) {
            if (personalData[accounts[i]].totalReward != 0){
                _transfer(payable(accounts[i]), personalData[accounts[i]].totalReward);
            }
        }

        // pay to dealer 
        _transfer(payable(dealer), dealerReward); 
    }

    function addLottery(
        string calldata _baitNumber, 
        uint _baitAmount, 
        uint _baitValue, 
        string calldata _playType, 
        string calldata _arrangeType, 
        string calldata digitType) payable public  
    {
        personalData[msg.sender].baitsData.push(BaitData(_baitNumber, _baitAmount, _baitValue, digitMap[digitType], playMap[_playType], arrangeMap[_arrangeType]));
        // dealer reward increase
        dealerReward += (_baitAmount * _baitValue ); 
        // pay to contract
    }

    function buyLotteries(LotteryInput[] calldata lotteryInputs) payable public {
        uint256 totalCost = 0 ; 
        // cal totalCost 
        for (uint i = 0 ; i < lotteryInputs.length; i++){
            totalCost += lotteryInputs[i].amount * lotteryInputs[i].baitValue ; 
        }
        require(totalCost == msg.value, "invalid value");
        require(msg.sender != dealer, "dealer cannot do this");
        if (!isElementExists(msg.sender)){
            accounts.push(msg.sender);
            //personalData[msg.sender] = PersonalData( BaitData , 0) ; 
        }
        for (uint i = 0 ; i < lotteryInputs.length ; i++){
            addLottery(lotteryInputs[i].baitNumber, lotteryInputs[i].amount, lotteryInputs[i].baitValue, lotteryInputs[i].playType, lotteryInputs[i].arrangeType, lotteryInputs[i].digitType); 
        }
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

    function getLastInformation() external view returns(PersonalData memory){
        return lastPersonalData[msg.sender];
    }

    function getDealer() public view returns(address) {
        return dealer ; 
    }

    function sliceString(string memory str, uint startIndex, uint endIndex) internal pure returns (string memory) {
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

    function getDealerReward() public view returns(uint) {
        return dealerReward;
    }

    function getLastDealerReward() public view returns(uint) {
        return lastDealerReward;
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

    event transferToContract(address from, uint amount);

    function payContract(uint amount) public payable {
        emit transferToContract(msg.sender, amount);
    }
}





    


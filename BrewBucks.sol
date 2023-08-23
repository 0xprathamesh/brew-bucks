// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract BrewBucks is ReentrancyGuard {

   uint256 profileId = 0;
   struct Profile {
       uint id;
       string name;
       string username;
       string bio;
       string twitterHandle;
       string profileImage;
       uint256 balance;
       uint256 createdAt;
       address walletAddress;
       uint256 totalAmountReceived;
       uint256 totalAmountWithdrawn;
   }
   struct Transaction {
       address from;
       string name;
       string message;
       uint256 amount;
       uint256 timestamp;
   }
   struct WithdrawTxn {
       uint256 amount;
       uint256 timestamp;
   }

    mapping(string => Profile) public usernameToProfile;
    mapping(uint256 => Profile) public accounts;
    mapping(address => string) public addressToUsername;
    mapping(string => bool) public usernameTaken;
    mapping(address => Transaction[]) public txns;
    mapping(address => WithdrawTxn[]) public withdrawTxns;

    event ProfileCreated(Profile _profile);

    event NewTransaction (
        address indexed from,
        string name,
        string message,
        uint256 amount,
        uint256 timestamp
    );
    

    function addProfile(string memory _name,string memory _username,string memory _bio,string memory _twitterHandle,string memory _profileImage) external nonReentrant {
        require(bytes(addressToUsername[msg.sender]).length == 0, "Account already Exists");
        require(!usernameTaken[_username], "UserName is Already Taken");
        profileId++;
        Profile memory newProfile;
        newProfile.id = profileId;
        newProfile.name = _name;
        newProfile.username = _username;
        newProfile.bio = _bio;
        newProfile.twitterHandle = _twitterHandle;
        newProfile.profileImage =  _profileImage;
        newProfile.balance = 0;
        newProfile.createdAt = block.timestamp;
        newProfile.walletAddress = msg.sender;
        newProfile.totalAmountReceived = 0;
        newProfile.totalAmountWithdrawn = 0;

        accounts[profileId] = newProfile;
        usernameToProfile[_username] = newProfile;
        addressToUsername[msg.sender] = _username;
        usernameTaken[_username] = true;
        emit ProfileCreated(newProfile);
    
    }

    function updateName(string memory _newName) external nonReentrant {
        require(bytes(_newName).length > 0, "Name cannot be empty");
        Profile storage profile = usernameToProfile[addressToUsername[msg.sender]];
        profile.name = _newName;
    }

    function updateBio(string memory _newBio) external nonReentrant {
        Profile storage profile = usernameToProfile[addressToUsername[msg.sender]];
        profile.bio = _newBio;
    }

    function updateTwitterHandle(string memory _newTwitterHandle) external nonReentrant {
        Profile storage profile = usernameToProfile[addressToUsername[msg.sender]];
        profile.twitterHandle = _newTwitterHandle;
    }

    function updateProfileImage(string memory _newProfileImage) external nonReentrant {
        Profile storage profile = usernameToProfile[addressToUsername[msg.sender]];
        profile.profileImage = _newProfileImage;
    }

    function getProfileByUsername(string memory _username) public view returns (Profile memory) {
      require(usernameToProfile[_username].walletAddress != address(0), "Profile Does not exists");
      return usernameToProfile[_username];
    }

    function getProfileByAddress() public view returns (Profile memory) {
       return usernameToProfile[addressToUsername[msg.sender]];
    }

    function getAllAccounts() external view returns (Profile[] memory) {
        Profile[] memory allAccounts =  new Profile[](profileId);
        for(uint256 i = 1; i <= profileId; i++) {
           
            allAccounts[i - 1] = accounts[i];
        }
        return allAccounts;
    }
    

function buyCoffee(address _to, string memory _name, string memory _message, uint256 _amount) external payable nonReentrant {
    require(_amount > 0, "Amount must be greater than 0");
    require(msg.value >= _amount, "Insufficient payment amount");
    require(usernameToProfile[addressToUsername[_to]].walletAddress != address(0), "Profile does not exist");
    usernameToProfile[addressToUsername[_to]].balance += _amount;
    usernameToProfile[addressToUsername[_to]].totalAmountReceived += _amount;
    require(msg.sender != _to, "You cannot treat yourself");

    require(bytes(_name).length > 0, "Name cannot be empty");
    require(bytes(_message).length > 0, "Message cannot be empty");
    require(msg.sender.balance >= _amount, "Insufficient balance to send the specified amount");

    txns[_to].push(Transaction(
        msg.sender,
        _name,
        _message,
        _amount,
        block.timestamp
    ));

    accounts[usernameToProfile[addressToUsername[_to]].id].balance += _amount;
    accounts[usernameToProfile[addressToUsername[_to]].id].totalAmountReceived += _amount;
    

    emit NewTransaction(
        msg.sender,
        _name,
        _message,
        _amount,
        block.timestamp
    );
  }

    function getTx(address _userAddress) public view returns (Transaction[] memory) {
        return txns[_userAddress];
    }

    function getTotalAmountReceivedFromSupporters(address _userAddress) public view returns (uint256) {
        return usernameToProfile[addressToUsername[_userAddress]].totalAmountReceived;
    }

    function getNumberofTreatSender(address _to) public view returns (uint256) {
        return txns[_to].length;
    }

    function withdraw(address payable _withdrawalAddress ) external nonReentrant {
        require(usernameToProfile[addressToUsername[msg.sender]].walletAddress !=address(0), "Profile Does not exists");
        uint256 amountToTransfer = usernameToProfile[addressToUsername[msg.sender]].balance;
        require(amountToTransfer > 0, "No Amount To Withdraw");
        _withdrawalAddress.transfer(amountToTransfer);
        usernameToProfile[addressToUsername[msg.sender]].balance = 0;
        usernameToProfile[addressToUsername[msg.sender]].totalAmountWithdrawn += amountToTransfer;
        withdrawTxns[msg.sender].push(WithdrawTxn(
            amountToTransfer,
            block.timestamp
        ));
    }

    function getTotalAmountWithdrawn(address _userAddress) public view returns (uint256) {
        return usernameToProfile[addressToUsername[_userAddress]].totalAmountWithdrawn;
    }
    
    function getAllWithdrawTxns(address _userAddress) public view returns (WithdrawTxn[] memory) {
        return withdrawTxns[_userAddress];
    }

}

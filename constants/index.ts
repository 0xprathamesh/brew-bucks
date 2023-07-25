const contractAddress = "0x281e32aDcB2B620A00e70D902103865187C1102D";
//0x8bBB47a6450b8028bcC28CF83A06617EA6c01C2B
const contractAbi = [
  {
    "type": "event",
    "name": "NewTransaction",
    "inputs": [
      {
        "type": "address",
        "name": "from",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "string",
        "name": "name",
        "indexed": false,
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "message",
        "indexed": false,
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "amount",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "timestamp",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ProfileCreated",
    "inputs": [
      {
        "type": "tuple",
        "name": "_profile",
        "components": [
          {
            "type": "uint256",
            "name": "id",
            "internalType": "uint256"
          },
          {
            "type": "string",
            "name": "name",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "username",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "bio",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "twitterHandle",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "profileImage",
            "internalType": "string"
          },
          {
            "type": "uint256",
            "name": "balance",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "createdAt",
            "internalType": "uint256"
          },
          {
            "type": "address",
            "name": "walletAddress",
            "internalType": "address"
          },
          {
            "type": "uint256",
            "name": "totalAmountReceived",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "totalAmountWithdrawn",
            "internalType": "uint256"
          }
        ],
        "indexed": false,
        "internalType": "struct BrewBucks.Profile"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "function",
    "name": "accounts",
    "inputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "id",
        "internalType": "uint256"
      },
      {
        "type": "string",
        "name": "name",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "username",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "bio",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "twitterHandle",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "profileImage",
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "balance",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "createdAt",
        "internalType": "uint256"
      },
      {
        "type": "address",
        "name": "walletAddress",
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "totalAmountReceived",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "totalAmountWithdrawn",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "addProfile",
    "inputs": [
      {
        "type": "string",
        "name": "_name",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "_username",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "_bio",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "_twitterHandle",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "_profileImage",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "addressToUsername",
    "inputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "string",
        "name": "",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "buyCoffee",
    "inputs": [
      {
        "type": "address",
        "name": "_to",
        "internalType": "address"
      },
      {
        "type": "string",
        "name": "_name",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "_message",
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "_amount",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "getAllAccounts",
    "inputs": [],
    "outputs": [
      {
        "type": "tuple[]",
        "name": "",
        "components": [
          {
            "type": "uint256",
            "name": "id",
            "internalType": "uint256"
          },
          {
            "type": "string",
            "name": "name",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "username",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "bio",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "twitterHandle",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "profileImage",
            "internalType": "string"
          },
          {
            "type": "uint256",
            "name": "balance",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "createdAt",
            "internalType": "uint256"
          },
          {
            "type": "address",
            "name": "walletAddress",
            "internalType": "address"
          },
          {
            "type": "uint256",
            "name": "totalAmountReceived",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "totalAmountWithdrawn",
            "internalType": "uint256"
          }
        ],
        "internalType": "struct BrewBucks.Profile[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getNumberofTreatSender",
    "inputs": [
      {
        "type": "address",
        "name": "_to",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getProfileByAddress",
    "inputs": [],
    "outputs": [
      {
        "type": "tuple",
        "name": "",
        "components": [
          {
            "type": "uint256",
            "name": "id",
            "internalType": "uint256"
          },
          {
            "type": "string",
            "name": "name",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "username",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "bio",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "twitterHandle",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "profileImage",
            "internalType": "string"
          },
          {
            "type": "uint256",
            "name": "balance",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "createdAt",
            "internalType": "uint256"
          },
          {
            "type": "address",
            "name": "walletAddress",
            "internalType": "address"
          },
          {
            "type": "uint256",
            "name": "totalAmountReceived",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "totalAmountWithdrawn",
            "internalType": "uint256"
          }
        ],
        "internalType": "struct BrewBucks.Profile"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getProfileByUsername",
    "inputs": [
      {
        "type": "string",
        "name": "_username",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "type": "tuple",
        "name": "",
        "components": [
          {
            "type": "uint256",
            "name": "id",
            "internalType": "uint256"
          },
          {
            "type": "string",
            "name": "name",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "username",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "bio",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "twitterHandle",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "profileImage",
            "internalType": "string"
          },
          {
            "type": "uint256",
            "name": "balance",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "createdAt",
            "internalType": "uint256"
          },
          {
            "type": "address",
            "name": "walletAddress",
            "internalType": "address"
          },
          {
            "type": "uint256",
            "name": "totalAmountReceived",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "totalAmountWithdrawn",
            "internalType": "uint256"
          }
        ],
        "internalType": "struct BrewBucks.Profile"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTotalAmountReceivedFromSupporters",
    "inputs": [
      {
        "type": "address",
        "name": "_userAddress",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTotalAmountWithdrawn",
    "inputs": [
      {
        "type": "address",
        "name": "_userAddress",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTx",
    "inputs": [
      {
        "type": "address",
        "name": "_userAddress",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "tuple[]",
        "name": "",
        "components": [
          {
            "type": "address",
            "name": "from",
            "internalType": "address"
          },
          {
            "type": "string",
            "name": "name",
            "internalType": "string"
          },
          {
            "type": "string",
            "name": "message",
            "internalType": "string"
          },
          {
            "type": "uint256",
            "name": "amount",
            "internalType": "uint256"
          },
          {
            "type": "uint256",
            "name": "timestamp",
            "internalType": "uint256"
          }
        ],
        "internalType": "struct BrewBucks.Transaction[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "txns",
    "inputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "address",
        "name": "from",
        "internalType": "address"
      },
      {
        "type": "string",
        "name": "name",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "message",
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "amount",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "timestamp",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "updateBio",
    "inputs": [
      {
        "type": "string",
        "name": "_newBio",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateName",
    "inputs": [
      {
        "type": "string",
        "name": "_newName",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateProfileImage",
    "inputs": [
      {
        "type": "string",
        "name": "_newProfileImage",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "updateTwitterHandle",
    "inputs": [
      {
        "type": "string",
        "name": "_newTwitterHandle",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "usernameTaken",
    "inputs": [
      {
        "type": "string",
        "name": "",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "type": "bool",
        "name": "",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "usernameToProfile",
    "inputs": [
      {
        "type": "string",
        "name": "",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "id",
        "internalType": "uint256"
      },
      {
        "type": "string",
        "name": "name",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "username",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "bio",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "twitterHandle",
        "internalType": "string"
      },
      {
        "type": "string",
        "name": "profileImage",
        "internalType": "string"
      },
      {
        "type": "uint256",
        "name": "balance",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "createdAt",
        "internalType": "uint256"
      },
      {
        "type": "address",
        "name": "walletAddress",
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "totalAmountReceived",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "totalAmountWithdrawn",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "withdraw",
    "inputs": [
      {
        "type": "address",
        "name": "_withdrawalAddress",
        "internalType": "address payable"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "withdrawTxns",
    "inputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "amount",
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "timestamp",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  }
];
export { contractAddress, contractAbi };
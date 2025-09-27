export const IntimeAbi = [
  {
      "type": "constructor",
      "inputs": [
          {
              "name": "_owner",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "_entropyAddress",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "_usdcAddress",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "_gameName",
              "type": "string",
              "internalType": "string"
          },
          {
              "name": "_startTime",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "_endTime",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "_healthDecayRate",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "_entropyCallback",
      "inputs": [
          {
              "name": "sequence",
              "type": "uint64",
              "internalType": "uint64"
          },
          {
              "name": "provider",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "randomNumber",
              "type": "bytes32",
              "internalType": "bytes32"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "battle",
      "inputs": [
          {
              "name": "p1",
              "type": "address",
              "internalType": "address"
          },
          {
              "name": "p2",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [],
      "stateMutability": "payable"
  },
  {
      "type": "function",
      "name": "endTime",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "entropy",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "contract IEntropyV2"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "gameName",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "string",
              "internalType": "string"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "healthDecayRate",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "hp",
      "inputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "isRegistered",
      "inputs": [
          {
              "name": "user",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bool",
              "internalType": "bool"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "lastUpdatedHpTime",
      "inputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "myHealth",
      "inputs": [
          {
              "name": "user",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "owner",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "player1",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "player2",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "register",
      "inputs": [
          {
              "name": "user",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "registered",
      "inputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [
          {
              "name": "",
              "type": "bool",
              "internalType": "bool"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "startTime",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "usdc",
      "inputs": [],
      "outputs": [
          {
              "name": "",
              "type": "address",
              "internalType": "contract IERC20"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "withdraw",
      "inputs": [
          {
              "name": "usdcAmt",
              "type": "uint256",
              "internalType": "uint256"
          },
          {
              "name": "user",
              "type": "address",
              "internalType": "address"
          }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "event",
      "name": "BattleResult",
      "inputs": [
          {
              "name": "winner",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "loser",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "xpAmount",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          },
          {
              "name": "currentTime",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "USDCWithdrawn",
      "inputs": [
          {
              "name": "user",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "amount",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          }
      ],
      "anonymous": false
  },
  {
      "type": "event",
      "name": "UserRegistered",
      "inputs": [
          {
              "name": "user",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "xp",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          },
          {
              "name": "deposit",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          }
      ],
      "anonymous": false
  }
] as const;
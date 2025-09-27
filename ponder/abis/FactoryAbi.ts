export const FactoryAbi = [
  {
      "type": "constructor",
      "inputs": [],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "createGame",
      "inputs": [
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
          }
      ],
      "outputs": [
          {
              "name": "gameAddress",
              "type": "address",
              "internalType": "address"
          }
      ],
      "stateMutability": "nonpayable"
  },
  {
      "type": "function",
      "name": "deployedGames",
      "inputs": [
          {
              "name": "",
              "type": "uint256",
              "internalType": "uint256"
          }
      ],
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
      "name": "getAllDeployedGames",
      "inputs": [],
      "outputs": [
          {
              "name": "games",
              "type": "address[]",
              "internalType": "address[]"
          }
      ],
      "stateMutability": "view"
  },
  {
      "type": "function",
      "name": "getDeployedGamesCount",
      "inputs": [],
      "outputs": [
          {
              "name": "count",
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
      "type": "event",
      "name": "GameCreated",
      "inputs": [
          {
              "name": "gameAddress",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "owner",
              "type": "address",
              "indexed": true,
              "internalType": "address"
          },
          {
              "name": "gameName",
              "type": "string",
              "indexed": false,
              "internalType": "string"
          },
          {
              "name": "startTime",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          },
          {
              "name": "endTime",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
          }
      ],
      "anonymous": false
  }
] as const;
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "./Intime.sol";

contract Factory {
    // Events
    event GameCreated(
        address indexed gameAddress, address indexed owner, string gameName, uint256 startTime, uint256 endTime
    );

    // Array to store all deployed game addresses
    address[] public deployedGames;

    address public owner;

    constructor() {
        owner = msg.sender;
    }

    function createGame(
        string memory _gameName,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _healthDecayRate,
        address _entropyAddress,
        address _usdcAddress
    ) external returns (address gameAddress) {
        require(msg.sender == owner, "Only owner can call this function");
        require(_startTime > block.timestamp, "Start time must be in the future");
        require(_endTime > _startTime, "End time must be after start time");
        require(_healthDecayRate > 0, "Health decay rate must be greater than 0");

        // Deploy new Intime contract
        Intime newGame = new Intime(
            msg.sender, // owner
            _entropyAddress, // entropy address
            _usdcAddress, // USDC address
            _gameName, // game name
            _startTime, // start time
            _endTime, // end time
            _healthDecayRate // health decay rate
        );

        gameAddress = address(newGame);

        // Store the deployed game address
        deployedGames.push(gameAddress);

        emit GameCreated(gameAddress, msg.sender, _gameName, _startTime, _endTime);

        return gameAddress;
    }

    /**
     * @dev Get the total number of deployed games
     * @return count Number of deployed games
     */
    function getDeployedGamesCount() external view returns (uint256 count) {
        return deployedGames.length;
    }

    /**
     * @dev Get all deployed game addresses
     * @return games Array of all deployed game addresses
     */
    function getAllDeployedGames() external view returns (address[] memory games) {
        return deployedGames;
    }
}

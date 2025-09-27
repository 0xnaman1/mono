// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {IEntropyConsumer} from "@pythnetwork/entropy-sdk-solidity/IEntropyConsumer.sol";
import {IEntropyV2} from "@pythnetwork/entropy-sdk-solidity/IEntropyV2.sol";
import {console2} from "forge-std/console2.sol";
import {IERC20} from "./IERC20.sol";

contract Intime is IEntropyConsumer {
    // Events
    event UserRegistered(address indexed user, uint256 xp, uint256 deposit);
    event BattleResult(address indexed winner, address indexed loser, uint256 xpAmount, uint256 currentTime);

    address public owner;

    address public player1;
    address public player2;

    string public gameName;
    uint256 public startTime;
    uint256 public endTime;
    uint256 public healthDecayRate;

    mapping(address => bool) public registered;
    mapping(address => uint256) public hp;
    mapping(address => uint256) public lastUpdatedHpTime;

    IEntropyV2 public entropy;
    IERC20 public usdc;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier afterStartTime() {
        require(block.timestamp >= startTime, "Game has not started");
        _;
    }

    modifier beforeStartTime() {
        require(block.timestamp < startTime, "Game has already started");
        _;
    }

    modifier beforeEndTime() {
        require(block.timestamp <= endTime, "Game has ended");
        _;
    }

    constructor(
        address _owner,
        address _entropyAddress,
        address _usdcAddress,
        string memory _gameName,
        uint256 _startTime,
        uint256 _endTime,
        uint256 _healthDecayRate
    ) {
        owner = _owner;
        entropy = IEntropyV2(_entropyAddress);
        gameName = _gameName;
        startTime = _startTime;
        endTime = _endTime;
        healthDecayRate = _healthDecayRate;
        usdc = IERC20(_usdcAddress);
    }

    function register(address user) external beforeStartTime {
        require(!registered[user], "User already registered");
        usdc.transferFrom(msg.sender, address(this), 1e6);
        registered[user] = true;
        hp[user] = 100;
        lastUpdatedHpTime[user] = startTime;

        emit UserRegistered(user, 100, 1e18);
    }

    function isRegistered(address user) external view returns (bool) {
        return registered[user];
    }

    function battle(address p1, address p2) external payable onlyOwner afterStartTime beforeEndTime {
        require(registered[p1], "Player1 not registered");
        require(registered[p2], "Player2 not registered");
        require(p1 != p2, "Player1 and Player2 cannot be the same");

        player1 = p1;
        player2 = p2;

        // get the required fee
        uint128 requestFee = entropy.getFeeV2();
        // check if the user has sent enough fees
        if (msg.value < requestFee) revert("not enough fees");

        // pay the fees and request a random number from entropy
        entropy.requestV2{value: requestFee}();
    }

    function entropyCallback(uint64, address, bytes32 randomNumber) internal override {
        uint256 currentTime = block.timestamp;

        uint256 timeElapsed1 = currentTime - lastUpdatedHpTime[player1];
        uint256 timeElapsed2 = currentTime - lastUpdatedHpTime[player2];

        uint256 decayAmount1 = timeElapsed1 / healthDecayRate;
        uint256 decayAmount2 = timeElapsed2 / healthDecayRate;

        uint256 currentHp1 = hp[player1];
        uint256 currentHp2 = hp[player2];

        if (decayAmount1 > currentHp1) {
            hp[player1] = 0;
        }

        if (decayAmount2 > currentHp2) {
            hp[player2] = 0;
        }

        require(hp[player1] > 0, "Player1 has no HP");
        require(hp[player2] > 0, "Player2 has no HP");

        int256 hpAmount = mapRandomNumber(randomNumber, 1, 100);
        int256 winner = mapRandomNumber(randomNumber, 1, 2);

        if (winner == 1) {
            hp[player1] += uint256(hpAmount) - decayAmount1;
            hp[player2] -= uint256(hpAmount) - decayAmount2;
        } else {
            hp[player2] += uint256(hpAmount) - decayAmount2;
            hp[player1] -= uint256(hpAmount) - decayAmount1;
        }

        // Update the last updated time for both players
        lastUpdatedHpTime[player1] = currentTime;
        lastUpdatedHpTime[player2] = currentTime;

        emit BattleResult(player1, player2, uint256(hpAmount), currentTime);
    }

    function getEntropy() internal view override returns (address) {
        return address(entropy);
    }

    function mapRandomNumber(bytes32 randomNumber, int256 minRange, int256 maxRange) internal pure returns (int256) {
        uint256 range = uint256(maxRange - minRange + 1);
        return minRange + int256(uint256(randomNumber) % range);
    }

    function myHealth(address user) external view returns (uint256) {
        return hp[user];
    }
}

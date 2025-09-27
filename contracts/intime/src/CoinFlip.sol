// contracts/src/CoinFlip.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@pythnetwork/entropy-sdk-solidity/IEntropyV2.sol";
import "@pythnetwork/entropy-sdk-solidity/IEntropyConsumer.sol";

contract CoinFlip is IEntropyConsumer {
    event FlipRequested(uint64 sequenceNumber);
    event FlipResult(uint64 sequenceNumber, uint256 xNumber);

    uint256 public xNumber;

    IEntropyV2 entropy;

    constructor(address _entropy) {
        entropy = IEntropyV2(_entropy);
    }

    // This method is required by the IEntropyConsumer interface
    function getEntropy() internal view override returns (address) {
        return address(entropy);
    }

    function request() external payable {
        // get the required fee
        uint128 requestFee = entropy.getFeeV2();
        // check if the user has sent enough fees
        if (msg.value < requestFee) revert("not enough fees");

        // pay the fees and request a random number from entropy
        uint64 sequenceNumber = entropy.requestV2{value: requestFee}();

        // emit event
        emit FlipRequested(sequenceNumber);
    }

    function entropyCallback(uint64 sequenceNumber, address _providerAddress, bytes32 randomNumber) internal override {
        xNumber = uint256(randomNumber);

        emit FlipResult(sequenceNumber, xNumber);
    }

    function getXNumber() external view returns (uint256) {
        return xNumber;
    }
}

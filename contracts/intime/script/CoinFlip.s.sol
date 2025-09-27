// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {CoinFlip} from "../src/CoinFlip.sol";

contract CounterScript is Script {
    CoinFlip public coinFlip;

    address public entropy = address(0x41c9e39574F40Ad34c79f1C99B66A45eFB830d4c);

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        coinFlip = new CoinFlip(entropy);

        vm.stopBroadcast();
    }
}

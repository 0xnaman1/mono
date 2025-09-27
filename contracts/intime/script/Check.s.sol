// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {CoinFlip} from "../src/CoinFlip.sol";

contract CounterScript is Script {
    CoinFlip public coinFlip = CoinFlip(0x7e2b3F8AD748943C03374a069f835d9e42BC30e0);

    address public owner;

    function setUp() public {
        uint256 PK = vm.envUint("OWNER_PK");
        owner = vm.addr(PK);
    }

    function run() public {
        vm.startBroadcast(owner);

        console.log("xNumber", coinFlip.getXNumber());

        coinFlip.request{value: 15000000000001}();

        console.log("xNumber later", coinFlip.getXNumber());

        vm.stopBroadcast();
    }
}

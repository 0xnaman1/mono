// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Factory} from "../src/Factory.sol";

contract DeployFactoryScript is Script {
    address public owner;

    function setUp() public {
        uint256 ownerPk = vm.envUint("OWNER_PK");
        owner = vm.addr(ownerPk);
    }

    function run() public {
        vm.startBroadcast();
        Factory factory = new Factory();
        console.log("Factory deployed at", address(factory));
        vm.stopBroadcast();
    }
}

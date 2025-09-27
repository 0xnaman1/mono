// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {Factory} from "../src/Factory.sol";
import {Intime} from "../src/Intime.sol";

contract DeployGameScript is Script {
    address public owner;
    Factory public factory;

    address public entropy = address(0x41c9e39574F40Ad34c79f1C99B66A45eFB830d4c);
    address public usdc = address(0x036CbD53842c5426634e7929541eC2318f3dCF7e);

    function setUp() public {
        uint256 ownerPk = vm.envUint("OWNER_PK");
        owner = vm.addr(ownerPk);

        factory = Factory(vm.envAddress("FACTORY"));
    }

    function run() public {
        vm.startBroadcast();

        Intime game = Intime(
            factory.createGame("Intime", block.timestamp + 1 hours, block.timestamp + 2 hours, 20, entropy, usdc)
        );

        console.log("Game deployed at", address(game));

        vm.stopBroadcast();
    }
}

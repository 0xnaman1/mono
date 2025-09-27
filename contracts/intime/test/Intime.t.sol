// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {Intime} from "../src/Intime.sol";
import {Factory} from "../src/Factory.sol";
import {IERC20} from "../src/IERC20.sol";

contract IntimeTest is Test {
    Intime public intime;
    Factory public factory;

    address public alice;
    address public bob;
    address public owner;

    address public entropy = address(0x41c9e39574F40Ad34c79f1C99B66A45eFB830d4c);
    address public usdc = address(0x036CbD53842c5426634e7929541eC2318f3dCF7e);

    function setUp() public {
        // Import the private key from .env and use it to set the owner address
        uint256 ownerPk = vm.envUint("OWNER_PK");
        owner = vm.addr(ownerPk);
        alice = makeAddr("alice");
        bob = makeAddr("bob");

        vm.deal(alice, 0.0003 ether);
        vm.deal(bob, 0.0003 ether);
        vm.deal(owner, 1 ether);

        vm.startPrank(owner);

        IERC20(usdc).transfer(alice, 1e6);
        IERC20(usdc).transfer(bob, 1e6);

        factory = new Factory();
        intime =
            Intime(factory.createGame("Intime", block.timestamp + 1 hours, block.timestamp + 2 hours, 1, entropy, usdc));
        vm.stopPrank();

        vm.startPrank(alice);
        IERC20(usdc).approve(address(intime), 1e6);
        intime.register(alice);
        vm.stopPrank();

        vm.startPrank(bob);
        IERC20(usdc).approve(address(intime), 1e6);
        intime.register(bob);
        vm.stopPrank();
    }

    // function test_register() public {
    //     assertEq(intime.registered(alice), false);
    //     assertEq(intime.registered(bob), false);
    //     assertEq(address(intime).balance, 0);

    //     vm.startPrank(alice);
    //     IERC20(usdc).approve(address(intime), 1e6);
    //     intime.register(alice);
    //     vm.stopPrank();

    //     // Verify Alice is registered and contract received ether
    //     assertEq(intime.registered(alice), true);
    //     assertEq(IERC20(usdc).balanceOf(address(intime)), 1e6);

    //     vm.startPrank(bob);
    //     IERC20(usdc).approve(address(intime), 1e6);
    //     intime.register(bob);
    //     vm.stopPrank();

    //     // Verify both are registered and contract has received total ether
    //     assertEq(intime.registered(alice), true);
    //     assertEq(intime.registered(bob), true);
    //     assertEq(IERC20(usdc).balanceOf(address(intime)), 2e6);

    //     console.log("alice registered", intime.registered(alice));
    // }

    function test_battle() public {
        vm.warp(block.timestamp + 1 hours + 1);
        vm.startPrank(owner);
        intime.battle{value: 15000000000001}(alice, bob);
        vm.stopPrank();
    }

    function test_withdraw() public {
        test_battle();

        vm.warp(block.timestamp + 2 hours + 1);
        vm.startPrank(owner);
        intime.withdraw(1e6, alice);
        vm.stopPrank();

        assertEq(IERC20(usdc).balanceOf(alice), 1e6);
        assertEq(IERC20(usdc).balanceOf(address(intime)), 1e6);
    }
}

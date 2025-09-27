import { NextRequest, NextResponse } from "next/server";
import { createWalletClient, createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";

import { mainnet } from "viem/chains";

// Configuration - you should move this to environment variables
const CONFIG = {
  faucetPK: process.env.PK || "",
  factory: "0x9D11971281d8481Aba69161936391A64F466A071",
  game: "0x09507C45f36E0f633e81f4D8579666fd327De321",
  rpc: process.env.RPC_URL || "https://eth-mainnet.g.alchemy.com/v2/demo",
  battleContractAddress: process.env.BATTLE_CONTRACT_ADDRESS || "",
};

// Battle contract ABI - you'll need to replace this with your actual contract ABI
const battleAbi = [
  {
    inputs: [
      { name: "player1", type: "address" },
      { name: "player2", type: "address" },
    ],
    name: "battle",
    outputs: [
      { name: "winner", type: "address" },
      { name: "damage", type: "uint256" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export const viemClient = createWalletClient({
  account: privateKeyToAccount(`0x${CONFIG.faucetPK}`),
  transport: http(CONFIG.rpc),
  chain: mainnet,
});

export const viemPublicClient = createPublicClient({
  transport: http(CONFIG.rpc),
  chain: mainnet,
});

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { player1Address, player2Address } = body;

    // Validate input
    if (!player1Address || !player2Address) {
      return NextResponse.json(
        { error: "Both player1Address and player2Address are required" },
        { status: 400 }
      );
    }

    // Validate Ethereum addresses
    const addressRegex = /^0x[a-fA-F0-9]{40}$/;
    if (
      !addressRegex.test(player1Address) ||
      !addressRegex.test(player2Address)
    ) {
      return NextResponse.json(
        { error: "Invalid Ethereum address format" },
        { status: 400 }
      );
    }

    // Check if addresses are different
    if (player1Address.toLowerCase() === player2Address.toLowerCase()) {
      return NextResponse.json(
        { error: "Player addresses must be different" },
        { status: 400 }
      );
    }

    // Validate contract address
    if (!CONFIG.battleContractAddress) {
      return NextResponse.json(
        { error: "Battle contract address not configured" },
        { status: 500 }
      );
    }

    // Validate private key
    if (!CONFIG.faucetPK) {
      return NextResponse.json(
        { error: "Private key not configured" },
        { status: 500 }
      );
    }

    // Call the battle function on the smart contract
    const hash = await viemClient.writeContract({
      address: CONFIG.battleContractAddress as `0x${string}`,
      abi: battleAbi,
      functionName: "battle",
      args: [player1Address as `0x${string}`, player2Address as `0x${string}`],
      chain: viemClient.chain,
    });

    // Wait for transaction confirmation
    const transaction = await viemPublicClient.waitForTransactionReceipt({
      hash: hash,
    });

    // Return success response
    return NextResponse.json({
      success: true,
      transactionHash: transaction.transactionHash,
      blockNumber: transaction.blockNumber,
      gasUsed: transaction.gasUsed?.toString(),
      message: "Battle executed successfully",
    });
  } catch (error: any) {
    console.error("Battle API Error:", error);

    // Handle specific error types
    if (error.message?.includes("insufficient funds")) {
      return NextResponse.json(
        { error: "Insufficient funds for transaction" },
        { status: 402 }
      );
    }

    if (error.message?.includes("user rejected")) {
      return NextResponse.json(
        { error: "Transaction rejected by user" },
        { status: 400 }
      );
    }

    if (error.message?.includes("gas")) {
      return NextResponse.json(
        { error: "Gas estimation failed or insufficient gas" },
        { status: 400 }
      );
    }

    if (error.message?.includes("nonce")) {
      return NextResponse.json(
        { error: "Nonce error - please try again" },
        { status: 409 }
      );
    }

    if (error.message?.includes("network")) {
      return NextResponse.json(
        { error: "Network error - please check your connection" },
        { status: 503 }
      );
    }

    if (error.message?.includes("contract")) {
      return NextResponse.json(
        { error: "Contract interaction failed" },
        { status: 400 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}

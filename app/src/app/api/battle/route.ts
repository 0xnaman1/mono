import { CONFIG } from "@/lib/config";
import { NextRequest, NextResponse } from "next/server";
import { createWalletClient, createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { InTimeAbi } from "@/app/interfaces/InTimeAbi";

import { mainnet } from "viem/chains";

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
    const { gameAddress, player1Address, player2Address } = body;

    // Validate input
    if (!player1Address || !player2Address || !gameAddress) {
      return NextResponse.json(
        {
          error:
            "Both player1Address, player2Address and gameAddress are required",
        },
        { status: 400 }
      );
    }

    // Validate Ethereum addresses
    const addressRegex = /^0x[a-fA-F0-9]{40}$/;
    if (
      !addressRegex.test(player1Address) ||
      !addressRegex.test(player2Address) ||
      !addressRegex.test(gameAddress)
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
    if (!CONFIG.game) {
      return NextResponse.json(
        { error: "Game contract address not configured" },
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
      address: CONFIG.game as `0x${string}`,
      abi: InTimeAbi,
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

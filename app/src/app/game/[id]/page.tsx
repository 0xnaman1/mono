"use client";

import { ArrowLeft, Trophy, Heart, Sword } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import BattleDrawer from "@/components/BattleDrawer";
import { useState, useEffect } from "react";
import { useWalletClient, useAccount } from "wagmi";
import { parseEther } from "viem";

// Contract configuration
const CONTRACT_ADDRESS = "0x58706f42b71b44b463E085707Afb62456608cA8e"; // Replace with actual contract address
const CONTRACT_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "player",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
] as const;

export default function GamePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const walletClient = useWalletClient();
  const { address: eoa } = useAccount();

  // Register section state
  const [registerAddress, setRegisterAddress] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Transaction state
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Sample game data - in real app this would come from API
  const gameData = {
    id: params.id,
    title: "Time Rush Challenge",
    duration: "2:00 PM - 4:00 PM",
    progress: 65,
    myHealth: 78, // Current HP out of 100
    maxHealth: 100,
  };

  // Sample leaderboard data
  const leaderboard = [
    {
      rank: 1,
      address: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
      score: 2450,
      health: 95,
    },
    {
      rank: 2,
      address: "0x8ba1f109551bD432803012645Hac136c",
      score: 2380,
      health: 88,
    },
    {
      rank: 3,
      address: "0x1234567890abcdef1234567890abcdef12345678",
      score: 2290,
      health: 92,
    },
    {
      rank: 4,
      address: "0xabcdef1234567890abcdef1234567890abcdef12",
      score: 2150,
      health: 76,
    },
    {
      rank: 5,
      address: "0x9876543210fedcba9876543210fedcba98765432",
      score: 2080,
      health: 83,
    },
    {
      rank: 6,
      address: "0x456789abcdef0123456789abcdef0123456789ab",
      score: 1950,
      health: 67,
    },
    {
      rank: 7,
      address: "0xfedcba9876543210fedcba9876543210fedcba98",
      score: 1820,
      health: 89,
    },
    {
      rank: 8,
      address: "0x3456789abcdef0123456789abcdef0123456789a",
      score: 1750,
      health: 71,
    },
    {
      rank: 9,
      address: "0xdcba9876543210fedcba9876543210fedcba9876",
      score: 1680,
      health: 85,
    },
    {
      rank: 10,
      address: "0x23456789abcdef0123456789abcdef0123456789",
      score: 1620,
      health: 79,
    },
  ];

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getHealthColor = (health: number) => {
    if (health >= 80) return "bg-green-500";
    if (health >= 60) return "bg-yellow-500";
    if (health >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  const scanNFC = async () => {
    if (!isClient) {
      setError("NFC scanning is only available in the browser");
      return;
    }

    setIsScanning(true);
    setError(null);

    try {
      // Dynamically import the libhalo package only when needed
      const { execHaloCmdWeb } = await import("@arx-research/libhalo/api/web");

      let command = {
        name: "sign",
        keyNo: 1,
        message: "010203",
      };

      const res = await execHaloCmdWeb(command);

      if (res && res.publicKey) {
        // Convert public key to Ethereum address
        const address = `0x${res.publicKey.slice(-40)}`;
        setRegisterAddress(address);
      }
    } catch (error) {
      console.error("NFC scan failed:", error);
      setError(
        "NFC scan failed. Please make sure your device supports NFC and try again."
      );
    } finally {
      setIsScanning(false);
    }
  };

  const registerTransaction = async () => {
    if (!walletClient.data || !eoa || !registerAddress) {
      setError("Wallet not connected or NFC address not available");
      return;
    }

    setIsTransactionLoading(true);
    setError(null);

    try {
      // Execute the contract transaction
      const hash = await walletClient.data.writeContract({
        abi: CONTRACT_ABI,
        address: CONTRACT_ADDRESS,
        functionName: "initialize",
        args: [registerAddress],
        value: parseEther("2"), // $2 stake
        account: eoa,
      });

      setTransactionHash(hash);
      console.log("Transaction submitted:", hash);
    } catch (error) {
      console.error("Transaction failed:", error);
      setError("Transaction failed. Please try again.");
    } finally {
      setIsTransactionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              {gameData.title}
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Game Info & Health */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Game Status
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Duration</p>
                  <p className="font-medium">{gameData.duration}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">Progress</p>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${gameData.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {gameData.progress}% complete
                  </p>
                </div>
              </div>
            </div>

            {/* Register Section */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Register
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Connect your ETHGlobal NFC tag to register for the game after
                staking $2 and get a chance to compete against multiple people.
              </p>

              {/* Error Display */}
              {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Debug Info - Remove this in production */}
              <div className="mb-4 p-3 bg-gray-100 border border-gray-300 rounded-lg text-xs">
                <p>
                  <strong>Debug Info:</strong>
                </p>
                <p>
                  NFC Address:{" "}
                  {registerAddress ? "✅ Scanned" : "❌ Not scanned"}
                </p>
                <p>
                  Wallet Connected: {eoa ? "✅ Connected" : "❌ Not connected"}
                </p>
                <p>
                  Wallet Client:{" "}
                  {walletClient.data ? "✅ Available" : "❌ Not available"}
                </p>
                <p>
                  Transaction Loading:{" "}
                  {isTransactionLoading ? "⏳ Loading" : "✅ Ready"}
                </p>
                <p>
                  Button Disabled:{" "}
                  {!registerAddress ||
                  !eoa ||
                  !walletClient.data ||
                  isTransactionLoading
                    ? "❌ Yes"
                    : "✅ No"}
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-100 rounded-lg p-4">
                  {registerAddress ? (
                    <p className="font-mono text-sm">
                      {formatAddress(registerAddress)}
                    </p>
                  ) : (
                    <p className="text-gray-500">Connect your NFC card</p>
                  )}
                </div>

                <Button
                  onClick={scanNFC}
                  disabled={isScanning}
                  variant="outline"
                  className="w-full"
                >
                  {isScanning ? "Scanning..." : "Connect NFC Card"}
                </Button>

                <Button
                  onClick={registerTransaction}
                  className="w-full"
                  disabled={
                    !registerAddress ||
                    !eoa ||
                    !walletClient.data ||
                    isTransactionLoading
                  }
                >
                  {isTransactionLoading
                    ? "Processing Transaction..."
                    : transactionHash
                    ? "Registration Complete!"
                    : "Register for Game"}
                </Button>

                {transactionHash && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 text-sm">
                      Transaction successful! Hash:{" "}
                      {transactionHash.slice(0, 10)}...
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Battle Section */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 mb-6">
              <div className="flex items-center mb-4">
                <Sword className="h-5 w-5 text-red-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Battle Arena
                </h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Challenge other players in real-time battles
              </p>
              <BattleDrawer>
                <Button className="w-full">
                  <Sword className="h-4 w-4 mr-2" />
                  Enter Battle
                </Button>
              </BattleDrawer>
            </div>

            {/* Health Points */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <div className="flex items-center mb-4">
                <Heart className="h-5 w-5 text-red-500 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">
                  My Health
                </h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Health Points</span>
                  <span className="font-medium">
                    {gameData.myHealth}/{gameData.maxHealth}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${getHealthColor(
                      gameData.myHealth
                    )}`}
                    style={{
                      width: `${
                        (gameData.myHealth / gameData.maxHealth) * 100
                      }%`,
                    }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Critical</span>
                  <span>Full Health</span>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center">
                  <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Leaderboard
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {leaderboard.map((player) => (
                    <div
                      key={player.rank}
                      className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-sm font-semibold">
                          {player.rank}
                        </div>
                        <div>
                          <p className="font-mono text-sm font-medium text-gray-900">
                            {formatAddress(player.address)}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="w-16 bg-gray-200 rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full ${getHealthColor(
                                  player.health
                                )}`}
                                style={{ width: `${player.health}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500">
                              {player.health} HP
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          {player.score}
                        </p>
                        <p className="text-xs text-gray-500">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

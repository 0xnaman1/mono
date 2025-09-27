"use client";

import { useState, useEffect } from "react";
import { X, Swords } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface BattleDrawerProps {
  children: React.ReactNode;
}

export default function BattleDrawer({ children }: BattleDrawerProps) {
  const [battleOpen, setBattleOpen] = useState(false);
  const [player1Address, setPlayer1Address] = useState<string | null>(null);
  const [player2Address, setPlayer2Address] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const scanNFC = async (player: "player1" | "player2") => {
    if (!isClient) {
      setError("NFC scanning is only available in the browser");
      return;
    }

    setIsScanning(player);
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

        // Check if address is already used by the other player
        const otherPlayerAddress =
          player === "player1" ? player2Address : player1Address;
        if (
          otherPlayerAddress &&
          otherPlayerAddress.toLowerCase() === address.toLowerCase()
        ) {
          setError(
            "This address is already connected to the other player. Please use a different NFC card."
          );
          return;
        }

        if (player === "player1") {
          setPlayer1Address(address);
        } else {
          setPlayer2Address(address);
        }
      }
    } catch (error) {
      console.error("NFC scan failed:", error);
      setError(
        "NFC scan failed. Please make sure your device supports NFC and try again."
      );
    } finally {
      setIsScanning(null);
    }
  };

  return (
    <Drawer open={battleOpen} onOpenChange={setBattleOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="h-screen !w-screen !max-w-none">
        <div className="w-full h-full flex flex-col">
          <DrawerHeader className="relative">
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4 h-8 w-8"
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close battle</span>
              </Button>
            </DrawerClose>
            <DrawerTitle className="text-center text-2xl font-bold">
              Battle Arena
            </DrawerTitle>
          </DrawerHeader>

          {/* Error Display */}
          {error && (
            <div className="mx-8 mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <p className="text-sm text-gray-600 mb-4 px-8">
            Connect your ETHGlobal NFC tag to fight the battle again another
            player. Each player needs to scan their NFC tag to connect. Once
            both players are connected, the battle will start.
          </p>

          {/* Battle Layout */}
          <div className="flex flex-col justify-between p-8 gap-4">
            {/* Player 1 */}
            <div className="text-center">
              <Button
                onClick={() => scanNFC("player1")}
                disabled={isScanning === "player1"}
                variant={player1Address ? "secondary" : "outline"}
                className="w-full h-20 text-lg font-semibold bg-white hover:bg-gray-50 text-gray-900 border-gray-300"
              >
                {player1Address ? (
                  <span className="font-mono text-sm">
                    {formatAddress(player1Address)}
                  </span>
                ) : isScanning === "player1" ? (
                  "Scanning..."
                ) : (
                  "Connect Player 1"
                )}
              </Button>
            </div>

            {/* Battle Center */}
            <Button className="p-10">
              <div className="flex items-center gap-3">
                <Swords className="h-6 w-6" />
                <h4 className="text-center text-lg font-semibold">Fight</h4>
              </div>
            </Button>

            {/* Player 2 */}
            <div className="text-center">
              <Button
                onClick={() => scanNFC("player2")}
                disabled={isScanning === "player2"}
                variant={player2Address ? "secondary" : "outline"}
                className="w-full h-20 text-lg font-semibold bg-white hover:bg-gray-50 text-gray-900 border-gray-300"
              >
                {player2Address ? (
                  <span className="font-mono text-sm">
                    {formatAddress(player2Address)}
                  </span>
                ) : isScanning === "player2" ? (
                  "Scanning..."
                ) : (
                  "Connect Player 2"
                )}
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

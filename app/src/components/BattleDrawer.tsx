"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web";

interface BattleDrawerProps {
  children: React.ReactNode;
}

export default function BattleDrawer({ children }: BattleDrawerProps) {
  const [battleOpen, setBattleOpen] = useState(false);
  const [player1Address, setPlayer1Address] = useState<string | null>(null);
  const [player2Address, setPlayer2Address] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<string | null>(null);

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const scanNFC = async (player: "player1" | "player2") => {
    setIsScanning(player);
    try {
      let command = {
        name: "sign",
        keyNo: 1,
        message: "010203",
      };

      const res = await execHaloCmdWeb(command);

      if (res && res.publicKey) {
        // Convert public key to Ethereum address
        const address = `0x${res.publicKey.slice(-40)}`;

        if (player === "player1") {
          setPlayer1Address(address);
        } else {
          setPlayer2Address(address);
        }
      }
    } catch (error) {
      console.error("NFC scan failed:", error);
      alert("NFC scan failed. Please try again.");
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

          {/* Battle Layout */}
          <div className="flex-1 flex flex-col justify-between p-8">
            {/* Player 1 */}
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Player 1</h3>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                {player1Address ? (
                  <p className="font-mono text-sm">
                    {formatAddress(player1Address)}
                  </p>
                ) : (
                  <p className="text-gray-500">0join...2424</p>
                )}
              </div>
              <Button
                onClick={() => scanNFC("player1")}
                disabled={isScanning === "player1"}
                variant="outline"
                className="w-full"
              >
                {isScanning === "player1"
                  ? "Scanning..."
                  : "Join with ETHGlobal NFC"}
              </Button>
            </div>

            {/* Battle Center */}
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-gray-200 rounded-lg p-8 w-full max-w-md">
                <div className="">
                  <h4 className="text-center text-lg font-semibold">Fight</h4>
                </div>
              </div>
            </div>

            {/* Player 2 */}
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Player 2</h3>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                {player2Address ? (
                  <p className="font-mono text-sm">
                    {formatAddress(player2Address)}
                  </p>
                ) : (
                  <p className="text-gray-500">join with ethglobal nfc</p>
                )}
              </div>
              <Button
                onClick={() => scanNFC("player2")}
                disabled={isScanning === "player2"}
                variant="outline"
                className="w-full"
              >
                {isScanning === "player2"
                  ? "Scanning..."
                  : "Join with ETHGlobal NFC"}
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useNFCStore, NFCBandInfo } from "@/lib/state";
import { Menu, Wifi, CheckCircle, AlertCircle } from "lucide-react";

export function NFCLoginDrawer() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { bandInfo, setBandInfo, login, logout, clearBandInfo } = useNFCStore();

  const handleNFCScan = async () => {
    setIsScanning(true);
    setError(null);
    setScanResult(null);

    try {
      // Dynamically import the libhalo package only when needed
      const { execHaloCmdWeb } = await import("@arx-research/libhalo/api/web");

      let command = {
        name: "sign",
        keyNo: 1,
        message: "010203",
      };

      const res = await execHaloCmdWeb(command);

      if (res && res.publicKey && res.etherAddress) {
        // Create band info from libhalo response
        const bandData: NFCBandInfo = {
          id: `band-${res.etherAddress.slice(-8)}`,
          name: `Halo Band ${res.etherAddress.slice(-4)}`,
          publicKey: res.publicKey,
          etherAddress: res.etherAddress,
          signature: res.signature,
          digest: res.input?.digest,
          message: res.input?.message,
          timestamp: Date.now(),
        };

        setBandInfo(bandData);
        setScanResult(`Successfully scanned band: ${bandData.name}`);
        login();
      } else {
        setError("No valid response from NFC band");
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

  const handleClearBandInfo = () => {
    clearBandInfo();
    logout();
    setScanResult(null);
    setError(null);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="sm">
          <Menu className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen">
        <div className="mx-auto w-full max-w-sm p-6">
          <DrawerHeader className="text-center">
            <DrawerTitle className="text-2xl font-bold">
              {bandInfo ? "Band Connected" : "Band Login"}
            </DrawerTitle>
            <DrawerDescription>
              {bandInfo
                ? "Your Halo band is connected. Scan a new band or clear current data."
                : "Scan your Halo NFC band to authenticate and store your information"}
            </DrawerDescription>
          </DrawerHeader>

          <div className="space-y-6 mt-8">
            {/* NFC Scan Section */}
            <div className="text-center space-y-4">
              <div
                className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
                  bandInfo ? "bg-green-100" : "bg-blue-100"
                }`}
              >
                <Wifi
                  className={`h-8 w-8 ${
                    bandInfo ? "text-green-600" : "text-blue-600"
                  }`}
                />
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-semibold">
                  {bandInfo ? "Scan New Band" : "Scan Your Band"}
                </h3>
                <p className="text-sm text-gray-600">
                  {bandInfo
                    ? "Hold a new Halo NFC band near your device to replace current data"
                    : "Hold your Halo NFC band near your device to authenticate"}
                </p>
              </div>

              <Button
                onClick={handleNFCScan}
                disabled={isScanning}
                className="w-full"
                size="lg"
                variant={bandInfo ? "outline" : "default"}
              >
                {isScanning ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Scanning...
                  </>
                ) : (
                  <>
                    <Wifi className="h-4 w-4 mr-2" />
                    {bandInfo ? "Scan New Band" : "Start Halo Scan"}
                  </>
                )}
              </Button>
            </div>

            {/* Status Messages */}
            {scanResult && (
              <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm text-green-800">{scanResult}</span>
              </div>
            )}

            {error && (
              <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600" />
                <span className="text-sm text-red-800">{error}</span>
              </div>
            )}

            {/* Current Band Info */}
            {bandInfo && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-10">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-semibold text-sm text-green-800">
                    Connected Band Info:
                  </h4>
                  <Button
                    onClick={handleClearBandInfo}
                    variant="outline"
                    size="sm"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Clear
                  </Button>
                </div>
                <div className="text-xs space-y-1 text-green-700">
                  <div>
                    <strong>Name:</strong> {bandInfo.name}
                  </div>

                  <div>
                    <strong>Ethereum Address:</strong>{" "}
                    {bandInfo.etherAddress || "N/A"}
                  </div>
                  <div>
                    <strong>Public Key:</strong>{" "}
                    {bandInfo.publicKey
                      ? `${bandInfo.publicKey.substring(0, 20)}...`
                      : "N/A"}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

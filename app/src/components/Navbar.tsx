"use client";

import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-gray-900">🕐 InTime </h1>

          <div className="flex items-center gap-4">
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-2xl font-bold text-gray-900">InTime 🕐</h1>

          <div className="flex items-center gap-4">
            <ConnectButton />
            <Drawer direction="right">
              <DrawerTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-4 w-4" />
                  <span className="sr-only">Open sidebar</span>
                </Button>
              </DrawerTrigger>
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
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </DrawerClose>
                    <DrawerTitle>Game Menu</DrawerTitle>
                    <DrawerDescription>
                      Navigate through game features and settings.
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="flex-1 p-4 overflow-y-auto">
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg bg-gray-100">
                        <h3 className="font-semibold text-gray-900">
                          Quick Actions
                        </h3>
                        <p className="text-sm text-gray-600">
                          Start a new game or continue your progress
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-gray-100">
                        <h3 className="font-semibold text-gray-900">
                          Settings
                        </h3>
                        <p className="text-sm text-gray-600">
                          Adjust game preferences and controls
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-gray-100">
                        <h3 className="font-semibold text-gray-900">
                          Leaderboard
                        </h3>
                        <p className="text-sm text-gray-600">
                          View top players and achievements
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-gray-100">
                        <h3 className="font-semibold text-gray-900">Profile</h3>
                        <p className="text-sm text-gray-600">
                          Manage your gaming profile
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </header>
  );
}

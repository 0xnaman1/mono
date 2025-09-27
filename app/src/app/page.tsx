"use client";

import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function Home() {
  const router = useRouter();

  const games = [
    {
      id: "time-rush",
      title: "Time Rush Challenge",
      duration: "2:00 PM - 4:00 PM",
      progress: 65,
      color: "bg-blue-600",
    },
    {
      id: "speed-quest",
      title: "Speed Quest",
      duration: "3:30 PM - 5:30 PM",
      progress: 25,
      color: "bg-green-600",
    },
    {
      id: "clock-tower",
      title: "Clock Tower Defense",
      duration: "6:00 PM - 8:00 PM",
      progress: 0,
      color: "bg-purple-600",
    },
    {
      id: "time-warp",
      title: "Time Warp Arena",
      duration: "1:00 PM - 3:00 PM",
      progress: 90,
      color: "bg-red-600",
    },
    {
      id: "chrono-battle",
      title: "Chrono Battle",
      duration: "4:00 PM - 6:00 PM",
      progress: 15,
      color: "bg-yellow-600",
    },
    {
      id: "temporal-race",
      title: "Temporal Race",
      duration: "7:00 PM - 9:00 PM",
      progress: 0,
      color: "bg-gray-400",
    },
  ];

  const handleGameClick = (gameId: string) => {
    router.push(`/game/${gameId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with toggle button */}
      <header className="sticky top-0 z-50 bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold text-gray-900">InTime 🕐</h1>
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
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to 🕐 InTime
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12">
            Welcome to our gaming platform where time matters. Experience
            immersive gameplay with real-time features and interactive elements
            designed for the modern gamer.
          </p>

          {/* Games List */}
          <div className="w-full max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Available Games
            </h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {games.map((game) => (
                <div
                  key={game.id}
                  className="bg-white rounded-lg shadow-md p-6 border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleGameClick(game.id)}
                >
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">
                    {game.title}
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Duration:</span>
                      <span>{game.duration}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${game.color} h-2 rounded-full`}
                        style={{ width: `${game.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>
                        {game.progress === 0
                          ? "Starting soon"
                          : game.progress >= 90
                          ? "Almost finished"
                          : "In progress"}
                      </span>
                      <span>{game.progress}% complete</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-center">
            <a
              className="flex items-center gap-2 hover:underline hover:underline-offset-4"
              href="https://twitter.com/0xstatemachine"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                aria-hidden
                src="/globe.svg"
                alt="Twitter icon"
                width={16}
                height={16}
              />
              @0xstatemachine
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

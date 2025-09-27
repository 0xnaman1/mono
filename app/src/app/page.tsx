"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

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
      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* Hero Section with Logo */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <div className="order-1 md:order-2">
              <Image
                src="/intime.png"
                alt="InTime Logo"
                width={200}
                height={200}
                className="hover:animate-bounce transition-all duration-300"
                style={{
                  animation: "shake 2s ease-in-out infinite",
                }}
              />
            </div>
            <div className="text-center md:text-left order-2 md:order-1">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to 🕐 InTime
              </h2>
              <div className="text-lg text-gray-600 max-w-2xl space-y-4">
                <p>
                  InTime lets you stake 2$ and play a game with other people
                  wearing ETHGlobal NFC bands where you compete against each
                  other to sustain your HP and get ranked on the leaderboard.
                </p>
                <p>
                  When the game ends the person who managed to keep the max HP
                  out of players participating will win the collectively staked
                  amount.
                </p>
              </div>
            </div>
          </div>

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

          {/* How to Play Section */}
          <div className="w-full max-w-4xl mx-auto mt-12">
            <div className="text-left bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                How to Play?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Register & Stake
                    </p>
                    <p className="text-gray-600">
                      Go to our site, pick an upcoming game to participate,
                      register for it by using your NFC and staking 2$.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Battle & Maintain HP
                    </p>
                    <p className="text-gray-600">
                      When the game starts you get 100 HP, and your goal is to
                      keep it as close to 100 as you can as it will keep
                      decaying with time. Find other participants and battle
                      with them by scanning your and the opponent's NFC bands.
                      One of you will get random increment from the other
                      person, yes you can also lose HP 🙁.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900">Win the Prize</p>
                    <p className="text-gray-600">
                      At the end of the game, the person on top of leaderboard
                      i.e the person with max HP at that time will win.
                    </p>
                  </div>
                </div>
              </div>
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

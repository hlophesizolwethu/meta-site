"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, Crown } from "lucide-react"

export function LeaderboardSection() {
  const leaderboard = [
    {
      rank: 1,
      name: "Jane Smith",
      company: "CyberSafe Inc",
      xp: 2100,
      level: 5,
      badges: 8,
      icon: Crown,
      color: "text-yellow-400",
    },
    {
      rank: 2,
      name: "Demo User",
      company: "Meta-Phoenix",
      xp: 1500,
      level: 4,
      badges: 6,
      icon: Trophy,
      color: "text-gray-300",
    },
    {
      rank: 3,
      name: "John Doe",
      company: "TechCorp",
      xp: 1250,
      level: 3,
      badges: 4,
      icon: Medal,
      color: "text-orange-400",
    },
    {
      rank: 4,
      name: "Alex Johnson",
      company: "SecureNet",
      xp: 850,
      level: 2,
      badges: 3,
      icon: Award,
      color: "text-blue-400",
    },
    {
      rank: 5,
      name: "Sarah Wilson",
      company: "InfoSec Pro",
      xp: 720,
      level: 2,
      badges: 2,
      icon: Award,
      color: "text-blue-400",
    },
  ]

  return (
    <section id="leaderboard" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Security Champions Leaderboard</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            See how you rank against other cybersecurity professionals in our community
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-black border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-center">
                <Trophy className="h-6 w-6 mr-2 text-yellow-400" />
                Top Security Experts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((user) => {
                  const IconComponent = user.icon
                  return (
                    <div
                      key={user.rank}
                      className={`flex items-center justify-between p-4 rounded-lg transition-all ${
                        user.rank <= 3
                          ? "bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/30"
                          : "bg-gray-900"
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <IconComponent className={`h-6 w-6 ${user.color}`} />
                          <span className="text-2xl font-bold text-white">#{user.rank}</span>
                        </div>
                        <div>
                          <div className="text-white font-semibold text-lg">{user.name}</div>
                          <div className="text-gray-400 text-sm">{user.company}</div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-yellow-400 font-bold text-lg">{user.xp}</div>
                          <div className="text-gray-500 text-xs">XP</div>
                        </div>
                        <div className="text-center">
                          <Badge variant="outline" className="text-purple-300 border-purple-400">
                            Level {user.level}
                          </Badge>
                        </div>
                        <div className="text-center">
                          <div className="text-blue-400 font-semibold">{user.badges}</div>
                          <div className="text-gray-500 text-xs">Badges</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 text-center">
                <p className="text-gray-400 text-sm">
                  Complete more challenges to climb the leaderboard and earn exclusive badges!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

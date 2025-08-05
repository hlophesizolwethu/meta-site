import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Award, Target } from "lucide-react"

export function XPRewardsInfo() {
  const xpLevels = [
    { level: 1, xp: "0-499", badge: "Novice", color: "bg-gray-600", icon: Target },
    { level: 2, xp: "500-999", badge: "Apprentice", color: "bg-green-600", icon: Star },
    { level: 3, xp: "1000-1999", badge: "Expert", color: "bg-blue-600", icon: Award },
    { level: 4, xp: "2000-2999", badge: "Master", color: "bg-purple-600", icon: Trophy },
    { level: 5, xp: "3000+", badge: "Legend", color: "bg-yellow-600", icon: Trophy },
  ]

  const challengeTypes = [
    { type: "Beginner", xp: "50-100 XP", description: "Basic security concepts and awareness" },
    { type: "Intermediate", xp: "150-250 XP", description: "Network security and threat analysis" },
    { type: "Advanced", xp: "300-500 XP", description: "Malware analysis and incident response" },
    { type: "Expert", xp: "600-1000 XP", description: "Advanced persistent threats and forensics" },
  ]

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">XP Rewards & Progression</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Earn experience points by completing challenges and unlock exclusive badges as you advance
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* XP Levels */}
          <Card className="bg-black border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
                Level Progression
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {xpLevels.map((level) => {
                  const IconComponent = level.icon
                  return (
                    <div key={level.level} className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${level.color} rounded-full flex items-center justify-center`}>
                          <IconComponent className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <div className="text-white font-semibold">Level {level.level}</div>
                          <div className="text-gray-400 text-sm">{level.xp} XP</div>
                        </div>
                      </div>
                      <Badge className={`${level.color} text-white border-0`}>{level.badge}</Badge>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Challenge Types */}
          <Card className="bg-black border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Target className="h-5 w-5 mr-2 text-purple-400" />
                Challenge Rewards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {challengeTypes.map((challenge, index) => (
                  <div key={index} className="p-3 bg-gray-900 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-white font-semibold">{challenge.type}</div>
                      <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                        {challenge.xp}
                      </Badge>
                    </div>
                    <div className="text-gray-400 text-sm">{challenge.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

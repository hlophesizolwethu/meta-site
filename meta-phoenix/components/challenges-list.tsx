"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Clock, Users, Play, Lock } from "lucide-react"

interface SecurityChallenge {
  id: string
  title: string
  description: string
  difficulty_level: string
  xp_reward: number
  category: string
  challenge_type: string
}

interface ChallengesListProps {
  challenges: SecurityChallenge[]
}

export function ChallengesList({ challenges }: ChallengesListProps) {
  const defaultChallenges = [
    {
      id: "1",
      title: "Network Intrusion Detection",
      description: "Analyze network traffic logs to identify potential intrusion attempts and malicious activities.",
      difficulty_level: "Intermediate",
      xp_reward: 250,
      category: "Network Security",
      challenge_type: "Lab",
    },
    {
      id: "2",
      title: "Malware Analysis Challenge",
      description:
        "Reverse engineer a suspicious executable to understand its behavior and create detection signatures.",
      difficulty_level: "Advanced",
      xp_reward: 500,
      category: "Malware Analysis",
      challenge_type: "CTF",
    },
    {
      id: "3",
      title: "Cryptography Puzzle",
      description: "Decrypt encrypted messages using various cryptographic techniques and identify vulnerabilities.",
      difficulty_level: "Expert",
      xp_reward: 750,
      category: "Cryptography",
      challenge_type: "CTF",
    },
    {
      id: "4",
      title: "Phishing Email Detection",
      description: "Identify phishing attempts in a collection of emails and explain the indicators of compromise.",
      difficulty_level: "Beginner",
      xp_reward: 100,
      category: "Social Engineering",
      challenge_type: "Quiz",
    },
    {
      id: "5",
      title: "Incident Response Simulation",
      description: "Lead an incident response team through a simulated security breach scenario.",
      difficulty_level: "Advanced",
      xp_reward: 600,
      category: "Incident Response",
      challenge_type: "Simulation",
    },
    {
      id: "6",
      title: "Web Application Security",
      description: "Find and exploit vulnerabilities in a web application using ethical hacking techniques.",
      difficulty_level: "Intermediate",
      xp_reward: 300,
      category: "Web Security",
      challenge_type: "Lab",
    },
  ]

  const challengesToShow = challenges.length > 0 ? challenges : defaultChallenges

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "bg-green-600"
      case "intermediate":
        return "bg-blue-600"
      case "advanced":
        return "bg-purple-600"
      case "expert":
        return "bg-red-600"
      default:
        return "bg-gray-600"
    }
  }

  const handleStartChallenge = (challengeId: string, title: string) => {
    alert(
      `Starting challenge: ${title}\n\nThis would redirect to the challenge interface where you can:\n• Access the challenge environment\n• Submit your solutions\n• Earn XP points upon completion\n• Unlock achievement badges`,
    )
  }

  const handleViewLeaderboard = () => {
    const element = document.getElementById("leaderboard")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Available Challenges</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Choose from a variety of cybersecurity challenges designed to test and improve your skills
          </p>
          <Button
            onClick={handleViewLeaderboard}
            variant="outline"
            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black bg-transparent"
          >
            <Trophy className="h-4 w-4 mr-2" />
            View Leaderboard
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {challengesToShow.map((challenge) => (
            <Card
              key={challenge.id}
              className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge className={`${getDifficultyColor(challenge.difficulty_level)} text-white border-0`}>
                    {challenge.difficulty_level}
                  </Badge>
                  <div className="flex items-center text-yellow-400">
                    <Trophy className="h-4 w-4 mr-1" />
                    <span className="font-semibold">{challenge.xp_reward} XP</span>
                  </div>
                </div>
                <CardTitle className="text-lg text-white">{challenge.title}</CardTitle>
                <CardDescription className="text-gray-400">{challenge.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{challenge.category}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{challenge.challenge_type}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => handleStartChallenge(challenge.id, challenge.title)}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Challenge
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30">
            <CardContent className="p-8 text-center">
              <Lock className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">More Challenges Coming Soon!</h3>
              <p className="text-gray-300 mb-4">
                We're constantly adding new challenges across different cybersecurity domains. Stay tuned for:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
                <div>• Cloud Security Challenges</div>
                <div>• IoT Security Labs</div>
                <div>• AI/ML Security Puzzles</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

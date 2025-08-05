"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Trophy } from "lucide-react"

interface CompanyInfo {
  name: string
  hero_title: string
  hero_subtitle: string
  tagline: string
}

interface HeroProps {
  companyInfo: CompanyInfo | null
}

export function Hero({ companyInfo }: HeroProps) {
  const title = companyInfo?.hero_title || "Securing the Digital Frontier"
  const subtitle =
    companyInfo?.hero_subtitle ||
    "Meta-Phoenix delivers cutting-edge cybersecurity solutions and pioneering research to protect your digital assets from evolving threats."

  const handleExploreServices = () => {
    const element = document.getElementById("services")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleResearchInsights = () => {
    const element = document.getElementById("research")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <Badge className="mb-6 bg-purple-600/20 text-purple-300 border-purple-500/30 hover:bg-purple-600/30">
            Leading in Cybersecurity Research
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">{title}</h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">{subtitle}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button
            size="lg"
            onClick={handleExploreServices}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg"
          >
            Explore Services
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={handleResearchInsights}
            className="border-gray-400 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-4 text-lg bg-transparent"
          >
            Research Insights
          </Button>
        </div>

        {/* Gamification Element */}
        <div className="flex items-center justify-center space-x-2 text-yellow-400 bg-black/30 backdrop-blur-sm rounded-full px-6 py-3 max-w-md mx-auto">
          <Trophy className="h-5 w-5" />
          <span className="text-sm font-medium">
            Join our security challenges and earn XP points to unlock exclusive resources
          </span>
        </div>
      </div>
    </section>
  )
}

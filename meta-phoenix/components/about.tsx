"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Award, Globe } from "lucide-react"

interface CompanyInfo {
  name: string
  description: string
  mission: string
  vision: string
}

interface AboutProps {
  companyInfo: CompanyInfo | null
}

export function About({ companyInfo }: AboutProps) {
  const mission =
    companyInfo?.mission ||
    "To advance cybersecurity through innovative research and provide cutting-edge protection solutions for the digital age."
  const vision =
    companyInfo?.vision ||
    "To be the global leader in cybersecurity research and education, creating a safer digital world for everyone."

  const stats = [
    { icon: Shield, label: "Security Solutions", value: "500+" },
    { icon: Users, label: "Protected Organizations", value: "1,200+" },
    { icon: Award, label: "Research Papers", value: "150+" },
    { icon: Globe, label: "Countries Served", value: "45+" },
  ]

  const handleLearnMoreResearch = () => {
    const element = document.getElementById("research")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="about" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">About Meta-Phoenix</h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              {companyInfo?.description ||
                "Meta-Phoenix is at the forefront of cybersecurity innovation, combining advanced research with practical security solutions. Our team of world-class researchers and security experts work tirelessly to stay ahead of emerging threats and protect organizations worldwide."}
            </p>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Our Mission</h3>
              <p className="text-gray-400 leading-relaxed">{mission}</p>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold text-white mb-4">Our Vision</h3>
              <p className="text-gray-400 leading-relaxed">{vision}</p>
            </div>

            <Button onClick={handleLearnMoreResearch} className="bg-purple-600 hover:bg-purple-700">
              Learn More About Our Research
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <Card key={index} className="bg-gray-900 border-gray-800 text-center">
                  <CardContent className="p-6">
                    <IconComponent className="h-8 w-8 text-purple-400 mx-auto mb-4" />
                    <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

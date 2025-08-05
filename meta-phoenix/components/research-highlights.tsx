"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, ArrowRight, ExternalLink } from "lucide-react"

interface ResearchProject {
  id: string
  title: string
  description: string
  status: string
  publication_date: string
  researchers: string[]
  tags: string[]
}

interface ResearchHighlightsProps {
  research: ResearchProject[]
}

export function ResearchHighlights({ research }: ResearchHighlightsProps) {
  const defaultResearch = [
    {
      id: "1",
      title: "AI-Driven Malware Detection in IoT Devices",
      description: "Developing machine learning algorithms to identify and prevent malware attacks on IoT devices.",
      status: "Published",
      publication_date: "2024-01-15",
      researchers: ["Dr. Sarah Chen", "Prof. Michael Johnson"],
      tags: ["AI", "IoT Security", "Malware Detection"],
    },
    {
      id: "2",
      title: "Quantum-Resistant Cryptography Implementation",
      description: "Research into post-quantum cryptographic methods for future security challenges.",
      status: "In Progress",
      publication_date: "2024-03-20",
      researchers: ["Dr. Alex Rodriguez", "Dr. Emily Watson"],
      tags: ["Quantum Computing", "Cryptography"],
    },
  ]

  const researchToShow = research.length > 0 ? research : defaultResearch

  const handleReadPaper = (projectId: string, title: string) => {
    window.location.href = `/research/${projectId}`
  }

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Latest Research</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Pioneering cybersecurity research that shapes the future of digital protection
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {researchToShow.map((project) => (
            <Card key={project.id} className="bg-gray-900 border-gray-800 hover:border-blue-500/50 transition-all">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={project.status === "Published" ? "default" : "secondary"} className="text-xs">
                    {project.status}
                  </Badge>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(project.publication_date).toLocaleDateString()}
                  </div>
                </div>
                <CardTitle className="text-lg text-white leading-tight">{project.title}</CardTitle>
                <CardDescription className="text-gray-400">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-gray-700 text-gray-400">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Users className="h-3 w-3 mr-2" />
                    <span>{project.researchers.join(", ")}</span>
                  </div>
                  <Button
                    onClick={() => handleReadPaper(project.id, project.title)}
                    variant="ghost"
                    size="sm"
                    className="w-full text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                  >
                    Read Full Paper
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/research">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent">
              View All Research
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

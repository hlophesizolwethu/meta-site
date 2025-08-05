"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, ExternalLink, Download } from "lucide-react"

interface ResearchProject {
  id: string
  title: string
  description: string
  status: string
  publication_date: string
  researchers: string[]
  tags: string[]
}

interface ResearchGridProps {
  research: ResearchProject[]
}

export function ResearchGrid({ research }: ResearchGridProps) {
  const defaultResearch = [
    {
      id: "1",
      title: "AI-Driven Malware Detection in IoT Devices",
      description:
        "Developing machine learning algorithms to identify and prevent malware attacks on Internet of Things devices in real-time using behavioral analysis and pattern recognition.",
      status: "Published",
      publication_date: "2024-01-15",
      researchers: ["Dr. Sarah Chen", "Prof. Michael Johnson", "Dr. Alex Kim"],
      tags: ["AI", "IoT Security", "Malware Detection", "Machine Learning"],
    },
    {
      id: "2",
      title: "Quantum-Resistant Cryptography Implementation",
      description:
        "Research into post-quantum cryptographic methods to secure communications against future quantum computing threats and ensure long-term data protection.",
      status: "In Progress",
      publication_date: "2024-03-20",
      researchers: ["Dr. Alex Rodriguez", "Dr. Emily Watson", "Prof. David Liu"],
      tags: ["Quantum Computing", "Cryptography", "Future Security", "Post-Quantum"],
    },
    {
      id: "3",
      title: "Behavioral Analysis for Insider Threat Detection",
      description:
        "Using behavioral analytics and machine learning to identify potential insider threats within organizational networks through user activity monitoring.",
      status: "Under Review",
      publication_date: "2024-02-10",
      researchers: ["Prof. David Kim", "Dr. Lisa Thompson", "Dr. Mark Wilson"],
      tags: ["Behavioral Analysis", "Insider Threats", "Machine Learning", "User Analytics"],
    },
    {
      id: "4",
      title: "Zero Trust Architecture in Cloud Environments",
      description:
        "Implementing and evaluating zero trust security models for hybrid and multi-cloud infrastructures with focus on identity verification and access control.",
      status: "Published",
      publication_date: "2023-11-30",
      researchers: ["Dr. Jennifer Lee", "Prof. Robert Chen", "Dr. Amanda Foster"],
      tags: ["Zero Trust", "Cloud Security", "Architecture", "Identity Management"],
    },
    {
      id: "5",
      title: "Advanced Persistent Threat Attribution",
      description:
        "Developing techniques for accurately attributing advanced persistent threats to specific threat actors using digital forensics and intelligence analysis.",
      status: "In Progress",
      publication_date: "2024-04-15",
      researchers: ["Dr. Thomas Anderson", "Dr. Maria Garcia", "Prof. James Wright"],
      tags: ["APT", "Threat Attribution", "Forensics", "Threat Intelligence"],
    },
    {
      id: "6",
      title: "Blockchain Security in Financial Systems",
      description:
        "Analyzing security vulnerabilities in blockchain implementations within financial systems and developing enhanced protection mechanisms.",
      status: "Published",
      publication_date: "2023-09-22",
      researchers: ["Dr. Kevin Park", "Prof. Sarah Mitchell", "Dr. Ryan Cooper"],
      tags: ["Blockchain", "Financial Security", "Cryptocurrency", "DeFi"],
    },
  ]

  const researchToShow = research.length > 0 ? research : defaultResearch

  const handleReadPaper = (projectId: string, title: string) => {
    window.location.href = `/research/${projectId}`
  }

  const handleDownloadPaper = (projectId: string, title: string) => {
    alert(`Downloading research paper: ${title} - would download PDF file`)
  }

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Research Publications</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore our comprehensive collection of cybersecurity research papers and ongoing projects
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {researchToShow.map((project) => (
            <Card
              key={project.id}
              className="bg-black border-gray-800 hover:border-blue-500/50 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant={
                      project.status === "Published"
                        ? "default"
                        : project.status === "In Progress"
                          ? "secondary"
                          : "outline"
                    }
                    className="text-xs"
                  >
                    {project.status}
                  </Badge>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    {new Date(project.publication_date).toLocaleDateString()}
                  </div>
                </div>
                <CardTitle className="text-lg text-white leading-tight">{project.title}</CardTitle>
                <CardDescription className="text-gray-400 text-sm leading-relaxed">
                  {project.description}
                </CardDescription>
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

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleReadPaper(project.id, project.title)}
                      variant="ghost"
                      size="sm"
                      className="flex-1 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                    >
                      Read Paper
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </Button>
                    {project.status === "Published" && (
                      <Button
                        onClick={() => handleDownloadPaper(project.id, project.title)}
                        variant="ghost"
                        size="sm"
                        className="flex-1 text-green-400 hover:text-green-300 hover:bg-green-900/20"
                      >
                        Download
                        <Download className="h-3 w-3 ml-2" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

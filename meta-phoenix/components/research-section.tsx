"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Calendar, Users } from "lucide-react"

interface ResearchProject {
  id: string
  title: string
  description: string
  status: string
  publication_date: string
  researchers: string[]
  tags: string[]
}

interface ResearchSectionProps {
  research: ResearchProject[]
}

export function ResearchSection({ research }: ResearchSectionProps) {
  const defaultResearch = [
    {
      id: "1",
      title: "AI-Driven Malware Detection in IoT Devices",
      description:
        "Developing machine learning algorithms to identify and prevent malware attacks on Internet of Things devices in real-time.",
      status: "Published",
      publication_date: "2024-01-15",
      researchers: ["Dr. Sarah Chen", "Prof. Michael Johnson"],
      tags: ["AI", "IoT Security", "Malware Detection"],
    },
    {
      id: "2",
      title: "Quantum-Resistant Cryptography Implementation",
      description:
        "Research into post-quantum cryptographic methods to secure communications against future quantum computing threats.",
      status: "In Progress",
      publication_date: "2024-03-20",
      researchers: ["Dr. Alex Rodriguez", "Dr. Emily Watson"],
      tags: ["Quantum Computing", "Cryptography", "Future Security"],
    },
    {
      id: "3",
      title: "Behavioral Analysis for Insider Threat Detection",
      description:
        "Using behavioral analytics and machine learning to identify potential insider threats within organizational networks.",
      status: "Under Review",
      publication_date: "2024-02-10",
      researchers: ["Prof. David Kim", "Dr. Lisa Thompson"],
      tags: ["Behavioral Analysis", "Insider Threats", "Machine Learning"],
    },
  ]

  const researchToShow = research.length > 0 ? research : defaultResearch

  const handleReadPaper = (projectId: string, title: string) => {
    // This would typically open the research paper or redirect to publication
    alert(`Opening research paper: ${title} - would redirect to publication page`)
  }

  const handleViewAllResearch = () => {
    // This would typically navigate to a research page
    alert("View All Research - would navigate to research archive page")
  }

  return (
    <section id="research" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Latest Research</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Pioneering cybersecurity research that shapes the future of digital protection
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
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

        <div className="text-center mt-12">
          <Button
            onClick={handleViewAllResearch}
            variant="outline"
            className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
          >
            View All Research
          </Button>
        </div>
      </div>
    </section>
  )
}

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, ArrowRight } from "lucide-react"

interface ResearchProject {
  id: string
  title: string
  description: string
  status: string
  publication_date: string
  researchers: string[]
  tags: string[]
}

interface RelatedResearchProps {
  research: ResearchProject[]
}

export function RelatedResearch({ research }: RelatedResearchProps) {
  if (research.length === 0) return null

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Related Research</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore more cutting-edge cybersecurity research from our team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {research.map((project) => (
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
                <CardTitle className="text-lg text-white leading-tight line-clamp-2">{project.title}</CardTitle>
                <CardDescription className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-gray-700 text-gray-400">
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs border-gray-700 text-gray-400">
                        +{project.tags.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center text-gray-500 text-xs">
                    <Users className="h-3 w-3 mr-2" />
                    <span className="line-clamp-1">{project.researchers.join(", ")}</span>
                  </div>

                  <Link href={`/research/${project.id}`}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-blue-400 hover:text-blue-300 hover:bg-blue-900/20"
                    >
                      Read Full Paper
                      <ArrowRight className="h-3 w-3 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
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

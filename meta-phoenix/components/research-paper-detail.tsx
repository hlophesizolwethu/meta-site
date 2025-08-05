"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Users, Download, ExternalLink, BookOpen, Target, BarChart, Lightbulb, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface ResearchProject {
  id: string
  title: string
  description: string
  status: string
  publication_date: string
  researchers: string[]
  tags: string[]
  research_papers?: Array<{
    id: string
    title: string
    abstract: string
    methodology: string
    results: string
    conclusions: string
    keywords: string[]
    pdf_url: string
    doi?: string
    journal?: string
  }>
}

interface ResearchPaperDetailProps {
  project: ResearchProject
}

export function ResearchPaperDetail({ project }: ResearchPaperDetailProps) {
  const paper = project.research_papers?.[0]

  const handleDownloadPaper = () => {
    if (paper?.pdf_url) {
      window.open(paper.pdf_url, "_blank")
    } else {
      alert("PDF download will be available soon")
    }
  }

  const handleCitePaper = () => {
    const citation = `${project.researchers.join(", ")} (${new Date(project.publication_date).getFullYear()}). ${project.title}. ${paper?.journal || "Meta-Phoenix Research"}.`
    navigator.clipboard.writeText(citation)
    alert("Citation copied to clipboard!")
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <section className="relative py-12 bg-gradient-to-br from-purple-900/50 via-blue-900/50 to-indigo-900/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Link href="/research">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Research
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Badge
              variant={
                project.status === "Published" ? "default" : project.status === "In Progress" ? "secondary" : "outline"
              }
            >
              {project.status}
            </Badge>
            <div className="flex items-center text-gray-400 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(project.publication_date).toLocaleDateString()}
            </div>
            {paper?.journal && <div className="text-gray-400 text-sm">Published in {paper.journal}</div>}
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">{project.title}</h1>

          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center text-gray-300">
              <Users className="h-4 w-4 mr-2" />
              <span className="text-sm">{project.researchers.join(", ")}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="border-gray-600 text-gray-300">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Button onClick={handleDownloadPaper} className="bg-purple-600 hover:bg-purple-700">
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button
              onClick={handleCitePaper}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Cite Paper
            </Button>
            {paper?.doi && (
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
                <ExternalLink className="h-4 w-4 mr-2" />
                View DOI
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Abstract */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-purple-400" />
                    Abstract
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">{paper?.abstract || project.description}</p>
                </CardContent>
              </Card>

              {/* Methodology */}
              {paper?.methodology && (
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Target className="h-5 w-5 mr-2 text-blue-400" />
                      Methodology
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed">{paper.methodology}</p>
                  </CardContent>
                </Card>
              )}

              {/* Results */}
              {paper?.results && (
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <BarChart className="h-5 w-5 mr-2 text-green-400" />
                      Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed">{paper.results}</p>
                  </CardContent>
                </Card>
              )}

              {/* Conclusions */}
              {paper?.conclusions && (
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Lightbulb className="h-5 w-5 mr-2 text-yellow-400" />
                      Conclusions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 leading-relaxed">{paper.conclusions}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Paper Info */}
              <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Paper Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-1">Status</h4>
                    <Badge variant={project.status === "Published" ? "default" : "secondary"}>{project.status}</Badge>
                  </div>

                  <Separator className="bg-gray-700" />

                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Authors</h4>
                    <div className="space-y-1">
                      {project.researchers.map((researcher, index) => (
                        <p key={index} className="text-gray-300 text-sm">
                          {researcher}
                        </p>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-gray-700" />

                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-1">Publication Date</h4>
                    <p className="text-gray-300 text-sm">
                      {new Date(project.publication_date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  {paper?.journal && (
                    <>
                      <Separator className="bg-gray-700" />
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-1">Journal</h4>
                        <p className="text-gray-300 text-sm">{paper.journal}</p>
                      </div>
                    </>
                  )}

                  {paper?.keywords && paper.keywords.length > 0 && (
                    <>
                      <Separator className="bg-gray-700" />
                      <div>
                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Keywords</h4>
                        <div className="flex flex-wrap gap-1">
                          {paper.keywords.map((keyword, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-gray-600 text-gray-400">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/30">
                <CardContent className="p-6">
                  <h4 className="text-white font-semibold mb-4">Research Actions</h4>
                  <div className="space-y-3">
                    <Button onClick={handleDownloadPaper} className="w-full bg-purple-600 hover:bg-purple-700">
                      <Download className="h-4 w-4 mr-2" />
                      Download Full Paper
                    </Button>
                    <Button
                      onClick={handleCitePaper}
                      variant="outline"
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Copy Citation
                    </Button>
                    <Link href="/contact">
                      <Button
                        variant="outline"
                        className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        <Users className="h-4 w-4 mr-2" />
                        Contact Authors
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

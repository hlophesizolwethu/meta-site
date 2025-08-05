"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Users } from "lucide-react"

export function ResearchCTA() {
  const handleCollaborate = () => {
    window.location.href = "/contact?subject=Research Collaboration"
  }

  return (
    <section className="py-16 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-black/50 border-purple-500/30 backdrop-blur-sm">
          <CardContent className="p-8 md:p-12 text-center">
            <BookOpen className="h-16 w-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Interested in Our Research?</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Join our research community, collaborate on cutting-edge projects, or access our full research database
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button onClick={handleCollaborate} size="lg" className="bg-purple-600 hover:bg-purple-700 px-8 py-3">
                <Users className="mr-2 h-5 w-5" />
                Collaborate With Us
              </Button>
              <Link href="/research">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-3 bg-transparent"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Browse All Research
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-400">
              <div>
                <div className="text-purple-400 font-semibold">150+ Papers</div>
                <div>Published research</div>
              </div>
              <div>
                <div className="text-purple-400 font-semibold">50+ Collaborations</div>
                <div>Academic partnerships</div>
              </div>
              <div>
                <div className="text-purple-400 font-semibold">25+ Active Projects</div>
                <div>Ongoing research</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

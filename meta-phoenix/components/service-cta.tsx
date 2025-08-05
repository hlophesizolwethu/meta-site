"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Phone, ArrowRight } from "lucide-react"

export function ServiceCTA() {
  const handleGetStarted = () => {
    window.location.href = "/contact"
  }

  const handleEmergencyCall = () => {
    alert("Emergency Security Response - connecting to 24/7 hotline")
  }

  return (
    <section className="py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-black/50 border-purple-500/30 backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            <Shield className="h-16 w-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Secure Your Organization?</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Don't wait for a security incident. Our experts are ready to assess your current security posture and
              implement comprehensive protection strategies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button onClick={handleGetStarted} size="lg" className="bg-purple-600 hover:bg-purple-700 px-8 py-4">
                Get Free Security Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                onClick={handleEmergencyCall}
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 bg-transparent"
              >
                <Phone className="mr-2 h-5 w-5" />
                Emergency Response
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-400">
              <div>
                <div className="text-purple-400 font-semibold">Free Assessment</div>
                <div>No obligation consultation</div>
              </div>
              <div>
                <div className="text-purple-400 font-semibold">24/7 Support</div>
                <div>Round-the-clock monitoring</div>
              </div>
              <div>
                <div className="text-purple-400 font-semibold">Expert Team</div>
                <div>Certified security professionals</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Phone } from "lucide-react"

export function CTASection() {
  const handleEmergencyContact = () => {
    alert("Emergency Security Response - would connect to 24/7 hotline")
  }

  return (
    <section className="py-20 bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <Shield className="h-16 w-16 text-purple-300 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Secure Your Digital Assets?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Don't wait for a security breach. Let our experts assess your current security posture and implement
            comprehensive protection strategies tailored to your organization.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link href="/contact">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 px-8 py-4 text-lg">
              Get Free Security Assessment
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            onClick={handleEmergencyContact}
            className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 text-lg bg-transparent"
          >
            <Phone className="mr-2 h-5 w-5" />
            Emergency Response
          </Button>
        </div>

        <p className="text-sm text-purple-200">
          24/7 Security Operations Center • Rapid Incident Response • Expert Consultation
        </p>
      </div>
    </section>
  )
}

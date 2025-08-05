"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Network, Database, Eye, Lock, AlertTriangle, ArrowRight } from "lucide-react"

interface SecurityService {
  id: string
  title: string
  description: string
  features: string[]
  icon_type: string
  threat_level: string
}

interface SecurityServicesProps {
  services: SecurityService[]
}

const iconMap = {
  threat: Eye,
  network: Network,
  data: Database,
  shield: Shield,
  lock: Lock,
  alert: AlertTriangle,
}

export function SecurityServices({ services }: SecurityServicesProps) {
  const defaultServices = [
    {
      id: "1",
      title: "Threat Detection",
      description:
        "Advanced AI-powered threat detection and response systems to identify and neutralize security threats in real-time.",
      features: ["Real-time Monitoring", "AI Analysis", "Automated Response", "Threat Intelligence"],
      icon_type: "threat",
      threat_level: "Critical",
    },
    {
      id: "2",
      title: "Network Security",
      description:
        "Comprehensive network protection solutions including firewalls, intrusion detection, and secure network architecture.",
      features: ["Firewall Management", "IDS/IPS", "VPN Solutions", "Network Segmentation"],
      icon_type: "network",
      threat_level: "High",
    },
    {
      id: "3",
      title: "Data Protection",
      description:
        "End-to-end data encryption, backup solutions, and compliance management to safeguard your sensitive information.",
      features: ["Data Encryption", "Backup & Recovery", "Compliance", "Access Control"],
      icon_type: "data",
      threat_level: "Critical",
    },
  ]

  const servicesToShow = services.length > 0 ? services : defaultServices

  const handleServiceInquiry = (serviceTitle: string) => {
    const element = document.getElementById("contact")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      // Pre-fill the contact form with service information
      setTimeout(() => {
        const subjectInput = document.querySelector('input[placeholder="Security Challenge"]') as HTMLInputElement
        if (subjectInput) {
          subjectInput.value = `Inquiry about ${serviceTitle}`
        }
      }, 500)
    }
  }

  const handleLearnMore = (serviceId: string) => {
    // This would typically open a detailed service page or modal
    alert(`Learn more about service ${serviceId} - would open detailed information`)
  }

  return (
    <section id="services" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Security Services</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Comprehensive cybersecurity solutions backed by advanced research and gamified learning experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesToShow.map((service) => {
            const IconComponent = iconMap[service.icon_type as keyof typeof iconMap] || Shield

            return (
              <Card
                key={service.id}
                className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-purple-600/20 rounded-lg">
                      <IconComponent className="h-8 w-8 text-purple-400" />
                    </div>
                    <Badge
                      variant={service.threat_level === "Critical" ? "destructive" : "secondary"}
                      className="text-xs"
                    >
                      {service.threat_level}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                  <CardDescription className="text-gray-400">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-700 text-gray-300">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        onClick={() => handleServiceInquiry(service.title)}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                        size="sm"
                      >
                        Request Assessment
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                      <Button
                        onClick={() => handleLearnMore(service.id)}
                        variant="outline"
                        className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                        size="sm"
                      >
                        Learn More
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={() => handleServiceInquiry("Custom Security Solution")}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3"
          >
            Get Custom Security Solution
          </Button>
        </div>
      </div>
    </section>
  )
}

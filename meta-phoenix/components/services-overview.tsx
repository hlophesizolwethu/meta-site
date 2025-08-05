"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Network, Database, Eye, Lock, AlertTriangle, ArrowRight } from "lucide-react"

interface SecurityService {
  id: string
  title: string
  description: string
  features: string[]
  icon_type: string
  threat_level: string
}

interface ServicesOverviewProps {
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

export function ServicesOverview({ services }: ServicesOverviewProps) {
  const defaultServices = [
    {
      id: "1",
      title: "Threat Detection",
      description: "Advanced AI-powered threat detection and response systems.",
      features: ["Real-time Monitoring", "AI Analysis", "Automated Response"],
      icon_type: "threat",
      threat_level: "Critical",
    },
    {
      id: "2",
      title: "Network Security",
      description: "Comprehensive network protection solutions and architecture.",
      features: ["Firewall Management", "IDS/IPS", "VPN Solutions"],
      icon_type: "network",
      threat_level: "High",
    },
    {
      id: "3",
      title: "Data Protection",
      description: "End-to-end data encryption and compliance management.",
      features: ["Data Encryption", "Backup & Recovery", "Compliance"],
      icon_type: "data",
      threat_level: "Critical",
    },
  ]

  const servicesToShow = services.length > 0 ? services : defaultServices

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Security Services</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Comprehensive cybersecurity solutions backed by advanced research and proven methodologies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {servicesToShow.map((service) => {
            const IconComponent = iconMap[service.icon_type as keyof typeof iconMap] || Shield

            return (
              <Card
                key={service.id}
                className="bg-black border-gray-800 hover:border-purple-500/50 transition-all duration-300"
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
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service.features.map((feature, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-gray-700 text-gray-300">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Link href="/services">
            <Button className="bg-purple-600 hover:bg-purple-700 px-8 py-3">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

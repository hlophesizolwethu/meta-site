"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Network, Database, Eye, Lock, AlertTriangle, ArrowRight, CheckCircle } from "lucide-react"

interface SecurityService {
  id: string
  title: string
  description: string
  features: string[]
  icon_type: string
  threat_level: string
}

interface ServicesListProps {
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

export function ServicesList({ services }: ServicesListProps) {
  const defaultServices = [
    {
      id: "1",
      title: "Advanced Threat Detection",
      description:
        "AI-powered threat detection and response systems that identify and neutralize security threats in real-time using machine learning and behavioral analysis.",
      features: [
        "Real-time Monitoring",
        "AI-Powered Analysis",
        "Automated Response",
        "Threat Intelligence",
        "Behavioral Analytics",
        "Zero-Day Detection",
      ],
      icon_type: "threat",
      threat_level: "Critical",
    },
    {
      id: "2",
      title: "Network Security Solutions",
      description:
        "Comprehensive network protection including next-generation firewalls, intrusion detection systems, and secure network architecture design.",
      features: [
        "Next-Gen Firewalls",
        "IDS/IPS Systems",
        "VPN Solutions",
        "Network Segmentation",
        "Zero Trust Architecture",
        "Traffic Analysis",
      ],
      icon_type: "network",
      threat_level: "High",
    },
    {
      id: "3",
      title: "Data Protection & Encryption",
      description:
        "End-to-end data encryption, secure backup solutions, and compliance management to safeguard your most sensitive information.",
      features: [
        "Advanced Encryption",
        "Secure Backups",
        "Compliance Management",
        "Access Control",
        "Data Loss Prevention",
        "Key Management",
      ],
      icon_type: "data",
      threat_level: "Critical",
    },
    {
      id: "4",
      title: "Security Assessment & Auditing",
      description:
        "Comprehensive security audits, penetration testing, and vulnerability assessments to identify and address security gaps.",
      features: [
        "Vulnerability Scanning",
        "Penetration Testing",
        "Security Audits",
        "Compliance Testing",
        "Risk Assessment",
        "Remediation Planning",
      ],
      icon_type: "shield",
      threat_level: "High",
    },
    {
      id: "5",
      title: "Incident Response & Forensics",
      description:
        "24/7 incident response services with digital forensics capabilities to quickly contain breaches and investigate security incidents.",
      features: [
        "24/7 Response Team",
        "Digital Forensics",
        "Breach Containment",
        "Evidence Collection",
        "Recovery Planning",
        "Legal Support",
      ],
      icon_type: "alert",
      threat_level: "Critical",
    },
    {
      id: "6",
      title: "Security Training & Awareness",
      description:
        "Comprehensive cybersecurity training programs to educate your team on the latest threats, best practices, and compliance requirements.",
      features: [
        "Security Awareness",
        "Phishing Simulation",
        "Compliance Training",
        "Technical Workshops",
        "Certification Prep",
        "Custom Curricula",
      ],
      icon_type: "lock",
      threat_level: "Medium",
    },
  ]

  const servicesToShow = services.length > 0 ? services : defaultServices

  const handleServiceInquiry = (serviceTitle: string) => {
    window.location.href = `/contact?service=${encodeURIComponent(serviceTitle)}`
  }

  const handleLearnMore = (serviceId: string) => {
    alert(`Learn more about service ${serviceId} - would open detailed service information`)
  }

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Comprehensive Security Services</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            From threat detection to incident response, we provide end-to-end cybersecurity solutions tailored to your
            organization's needs
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {servicesToShow.map((service) => {
            const IconComponent = iconMap[service.icon_type as keyof typeof iconMap] || Shield

            return (
              <Card
                key={service.id}
                className="bg-black border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
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
                      {service.threat_level} Priority
                    </Badge>
                  </div>
                  <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                  <CardDescription className="text-gray-400 leading-relaxed">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-3">Key Features:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {service.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-300">
                            <CheckCircle className="h-3 w-3 text-green-400 mr-2 flex-shrink-0" />
                            {feature}
                          </div>
                        ))}
                      </div>
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
                        Learn More Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

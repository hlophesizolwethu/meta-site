import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Shield, Network, Lock, Eye, Zap } from "lucide-react"

export function ResearchAreas() {
  const areas = [
    {
      icon: Brain,
      title: "Artificial Intelligence Security",
      description: "AI-powered threat detection, machine learning security, and adversarial AI protection.",
      color: "text-purple-400",
    },
    {
      icon: Lock,
      title: "Quantum Cryptography",
      description: "Post-quantum cryptographic methods and quantum-resistant security protocols.",
      color: "text-blue-400",
    },
    {
      icon: Network,
      title: "Network Security",
      description: "Zero-trust architectures, network forensics, and advanced intrusion detection.",
      color: "text-green-400",
    },
    {
      icon: Eye,
      title: "Behavioral Analysis",
      description: "User behavior analytics, insider threat detection, and anomaly identification.",
      color: "text-yellow-400",
    },
    {
      icon: Shield,
      title: "IoT Security",
      description: "Internet of Things security, device authentication, and edge computing protection.",
      color: "text-indigo-400",
    },
    {
      icon: Zap,
      title: "Incident Response",
      description: "Digital forensics, threat attribution, and automated incident response systems.",
      color: "text-red-400",
    },
  ]

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Research Focus Areas</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our research spans multiple domains of cybersecurity, addressing current challenges and future threats
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area, index) => {
            const IconComponent = area.icon
            return (
              <Card
                key={index}
                className="bg-gray-900 border-gray-800 hover:border-purple-500/30 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-gray-800 rounded-lg mr-4">
                      <IconComponent className={`h-8 w-8 ${area.color}`} />
                    </div>
                    <CardTitle className="text-lg text-white">{area.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 leading-relaxed">{area.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

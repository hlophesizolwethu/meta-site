import { Card, CardContent } from "@/components/ui/card"
import { Shield, Lightbulb, Users, Award, Globe, Zap } from "lucide-react"

interface CompanyInfo {
  name: string
  description: string
  mission: string
  vision: string
  values?: string[]
}

interface CompanyValuesProps {
  companyInfo: CompanyInfo | null
}

export function CompanyValues({ companyInfo }: CompanyValuesProps) {
  const values = [
    {
      icon: Shield,
      title: "Security First",
      description: "Every decision we make prioritizes the security and protection of our clients' digital assets.",
      color: "text-purple-400",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We continuously push the boundaries of cybersecurity through cutting-edge research and technology.",
      color: "text-blue-400",
    },
    {
      icon: Users,
      title: "Collaboration",
      description:
        "We believe in the power of teamwork, both within our organization and with our clients and partners.",
      color: "text-green-400",
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for the highest standards in everything we do, from research to service delivery.",
      color: "text-yellow-400",
    },
    {
      icon: Globe,
      title: "Global Impact",
      description: "Our work contributes to a safer digital world, protecting organizations and individuals globally.",
      color: "text-indigo-400",
    },
    {
      icon: Zap,
      title: "Agility",
      description: "We adapt quickly to emerging threats and evolving cybersecurity landscapes.",
      color: "text-red-400",
    },
  ]

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Core Values</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            The principles that guide our work and define our commitment to cybersecurity excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon
            return (
              <Card
                key={index}
                className="bg-black border-gray-800 hover:border-purple-500/30 transition-all duration-300 text-center"
              >
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className={`h-8 w-8 ${value.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{value.description}</p>
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

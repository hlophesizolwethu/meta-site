import { Card, CardContent } from "@/components/ui/card"
import { FileText, Award, Users, Globe, TrendingUp, Calendar } from "lucide-react"

export function PublicationStats() {
  const stats = [
    {
      icon: FileText,
      label: "Research Papers",
      value: "150+",
      description: "Published in top-tier journals",
      color: "text-purple-400",
    },
    {
      icon: Award,
      label: "Citations",
      value: "2,500+",
      description: "Academic citations received",
      color: "text-blue-400",
    },
    {
      icon: Users,
      label: "Collaborations",
      value: "50+",
      description: "Academic partnerships",
      color: "text-green-400",
    },
    {
      icon: Globe,
      label: "Conferences",
      value: "75+",
      description: "International presentations",
      color: "text-yellow-400",
    },
    {
      icon: TrendingUp,
      label: "Impact Factor",
      value: "8.5",
      description: "Average journal impact",
      color: "text-indigo-400",
    },
    {
      icon: Calendar,
      label: "Active Projects",
      value: "25+",
      description: "Ongoing research initiatives",
      color: "text-red-400",
    },
  ]

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Research Impact</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our research contributions to the global cybersecurity community and academic excellence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card
                key={index}
                className="bg-black border-gray-800 text-center hover:border-purple-500/30 transition-all"
              >
                <CardContent className="p-6">
                  <IconComponent className={`h-10 w-10 ${stat.color} mx-auto mb-4`} />
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold text-gray-300 mb-1">{stat.label}</div>
                  <div className="text-sm text-gray-500">{stat.description}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

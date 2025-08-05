import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Award, Globe, TrendingUp, Clock } from "lucide-react"

export function StatsSection() {
  const stats = [
    { icon: Shield, label: "Security Solutions Deployed", value: "500+", color: "text-purple-400" },
    { icon: Users, label: "Organizations Protected", value: "1,200+", color: "text-blue-400" },
    { icon: Award, label: "Research Papers Published", value: "150+", color: "text-green-400" },
    { icon: Globe, label: "Countries Served", value: "45+", color: "text-yellow-400" },
    { icon: TrendingUp, label: "Threat Detection Rate", value: "99.7%", color: "text-red-400" },
    { icon: Clock, label: "Average Response Time", value: "<5min", color: "text-indigo-400" },
  ]

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Proven Track Record</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our commitment to cybersecurity excellence is reflected in our achievements and client success stories
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
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

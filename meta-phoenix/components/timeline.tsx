import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Award, Globe, Users, Rocket, Shield } from "lucide-react"

export function Timeline() {
  const milestones = [
    {
      year: "2018",
      icon: Rocket,
      title: "Company Founded",
      description:
        "Meta-Phoenix established in Eswatini with a vision to advance cybersecurity research and protection.",
      color: "text-purple-400",
    },
    {
      year: "2019",
      icon: Users,
      title: "Team Expansion",
      description: "Assembled world-class team of cybersecurity researchers and industry experts.",
      color: "text-blue-400",
    },
    {
      year: "2020",
      icon: Award,
      title: "First Major Research",
      description: "Published groundbreaking research on AI-driven threat detection systems.",
      color: "text-green-400",
    },
    {
      year: "2021",
      icon: Shield,
      title: "SOC Launch",
      description: "Launched 24/7 Security Operations Center providing round-the-clock protection services.",
      color: "text-yellow-400",
    },
    {
      year: "2022",
      icon: Globe,
      title: "Global Expansion",
      description: "Extended operations to serve clients across 45+ countries worldwide.",
      color: "text-indigo-400",
    },
    {
      year: "2024",
      icon: Calendar,
      title: "Innovation Continues",
      description: "Leading research in quantum-resistant cryptography and next-generation security solutions.",
      color: "text-red-400",
    },
  ]

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Journey</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Key milestones in our mission to secure the digital frontier and advance cybersecurity research
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-600 to-blue-600 rounded-full"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => {
              const IconComponent = milestone.icon
              const isEven = index % 2 === 0

              return (
                <div key={index} className={`flex items-center ${isEven ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`w-1/2 ${isEven ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <Card className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className={`flex items-center ${isEven ? "justify-end" : "justify-start"} mb-4`}>
                          <div className={`p-2 bg-gray-800 rounded-lg ${isEven ? "mr-3" : "ml-3 order-2"}`}>
                            <IconComponent className={`h-6 w-6 ${milestone.color}`} />
                          </div>
                          <div className={`${isEven ? "order-2" : "order-1"}`}>
                            <div className="text-2xl font-bold text-white">{milestone.year}</div>
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">{milestone.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline dot */}
                  <div className="relative z-10">
                    <div className="w-4 h-4 bg-purple-600 rounded-full border-4 border-black"></div>
                  </div>

                  <div className="w-1/2"></div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

import { Card, CardContent } from "@/components/ui/card"
import { Search, Shield, Cog, CheckCircle } from "lucide-react"

export function ServiceProcess() {
  const steps = [
    {
      icon: Search,
      title: "Security Assessment",
      description: "Comprehensive evaluation of your current security posture and identification of vulnerabilities.",
      color: "text-blue-400",
    },
    {
      icon: Shield,
      title: "Custom Solution Design",
      description: "Tailored security strategy and implementation plan based on your specific requirements.",
      color: "text-purple-400",
    },
    {
      icon: Cog,
      title: "Implementation & Deployment",
      description: "Professional installation and configuration of security solutions with minimal disruption.",
      color: "text-green-400",
    },
    {
      icon: CheckCircle,
      title: "Monitoring & Support",
      description: "24/7 monitoring, maintenance, and ongoing support to ensure optimal security performance.",
      color: "text-yellow-400",
    },
  ]

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Security Process</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            A proven methodology that ensures comprehensive protection and seamless implementation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            return (
              <Card key={index} className="bg-gray-900 border-gray-800 text-center relative">
                <CardContent className="p-6">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-gray-900 border-2 border-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-purple-400 font-bold text-sm">{index + 1}</span>
                    </div>
                  </div>
                  <IconComponent className={`h-12 w-12 ${step.color} mx-auto mb-4 mt-4`} />
                  <h3 className="text-lg font-semibold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

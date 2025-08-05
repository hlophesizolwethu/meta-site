import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Eye, Heart } from "lucide-react"

interface CompanyInfo {
  name: string
  description: string
  mission: string
  vision: string
  values?: string[]
}

interface MissionVisionProps {
  companyInfo: CompanyInfo | null
}

export function MissionVision({ companyInfo }: MissionVisionProps) {
  const mission =
    companyInfo?.mission ||
    "To advance cybersecurity through innovative research and provide cutting-edge protection solutions for the digital age."
  const vision =
    companyInfo?.vision ||
    "To be the global leader in cybersecurity research and education, creating a safer digital world for everyone."

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Purpose & Direction</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Driven by a clear mission and guided by an ambitious vision for the future of cybersecurity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="bg-black border-gray-800 hover:border-purple-500/50 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center mb-4">
                <div className="p-3 bg-purple-600/20 rounded-lg mr-4">
                  <Target className="h-8 w-8 text-purple-400" />
                </div>
                <CardTitle className="text-2xl text-white">Our Mission</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-lg leading-relaxed">{mission}</p>
            </CardContent>
          </Card>

          <Card className="bg-black border-gray-800 hover:border-blue-500/50 transition-all duration-300">
            <CardHeader>
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-600/20 rounded-lg mr-4">
                  <Eye className="h-8 w-8 text-blue-400" />
                </div>
                <CardTitle className="text-2xl text-white">Our Vision</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-lg leading-relaxed">{vision}</p>
            </CardContent>
          </Card>
        </div>

        {/* Core Principles */}
        <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border-purple-500/30">
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg mr-4">
                <Heart className="h-8 w-8 text-purple-400" />
              </div>
              <CardTitle className="text-2xl text-white">Our Commitment</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto">
              We are committed to advancing the field of cybersecurity through rigorous research, innovative solutions,
              and unwavering dedication to protecting organizations and individuals from evolving digital threats. Our
              work contributes to a safer, more secure digital ecosystem for everyone.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

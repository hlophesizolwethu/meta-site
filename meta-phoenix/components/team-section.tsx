import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Twitter, Mail, User } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  position: string
  bio: string
  skills: string[]
  image_url?: string
  linkedin_url?: string
  twitter_url?: string
  email?: string
}

interface TeamSectionProps {
  team: TeamMember[]
}

export function TeamSection({ team }: TeamSectionProps) {
  const defaultTeam = [
    {
      id: "1",
      name: "Dr. Sarah Chen",
      position: "Chief Security Officer",
      bio: "Leading cybersecurity expert with 15+ years experience in threat detection and AI-powered security solutions.",
      skills: ["AI Security", "Threat Detection", "Research Leadership", "Strategic Planning"],
      image_url: "",
      linkedin_url: "#",
      email: "s.chen@metaphoenix.co.sz",
    },
    {
      id: "2",
      name: "Prof. Michael Johnson",
      position: "Head of Research",
      bio: "Renowned cybersecurity researcher specializing in quantum cryptography and advanced threat analysis.",
      skills: ["Quantum Cryptography", "Research", "Academic Leadership", "Publications"],
      image_url: "",
      twitter_url: "#",
      email: "m.johnson@metaphoenix.co.sz",
    },
    {
      id: "3",
      name: "Alex Rodriguez",
      position: "Senior Security Architect",
      bio: "Expert in designing and implementing enterprise-scale security architectures and zero-trust frameworks.",
      skills: ["Security Architecture", "Zero Trust", "Enterprise Security", "Cloud Security"],
      image_url: "",
      linkedin_url: "#",
      email: "a.rodriguez@metaphoenix.co.sz",
    },
    {
      id: "4",
      name: "Dr. Emily Watson",
      position: "Incident Response Lead",
      bio: "Specialist in digital forensics and incident response with extensive experience in breach investigation.",
      skills: ["Digital Forensics", "Incident Response", "Malware Analysis", "Crisis Management"],
      image_url: "",
      linkedin_url: "#",
      email: "e.watson@metaphoenix.co.sz",
    },
    {
      id: "5",
      name: "David Kim",
      position: "Security Operations Manager",
      bio: "Operations expert managing 24/7 security operations center and coordinating global security initiatives.",
      skills: ["SOC Management", "Operations", "Team Leadership", "Process Optimization"],
      image_url: "",
      email: "d.kim@metaphoenix.co.sz",
    },
    {
      id: "6",
      name: "Lisa Thompson",
      position: "Compliance & Risk Manager",
      bio: "Compliance specialist ensuring adherence to international security standards and regulatory requirements.",
      skills: ["Compliance", "Risk Management", "Auditing", "Regulatory Affairs"],
      image_url: "",
      linkedin_url: "#",
      email: "l.thompson@metaphoenix.co.sz",
    },
  ]

  const teamToShow = team.length > 0 ? team : defaultTeam

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Meet Our Security Experts</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our team of world-class cybersecurity professionals, researchers, and industry experts dedicated to
            protecting your digital assets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamToShow.map((member) => (
            <Card
              key={member.id}
              className="bg-gray-900 border-gray-800 hover:border-purple-500/50 transition-all duration-300 overflow-hidden"
            >
              <div className="aspect-square bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                {member.image_url ? (
                  <img
                    src={member.image_url || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <User className="h-16 w-16 text-purple-400 mx-auto mb-2" />
                    <div className="text-white text-2xl font-bold">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </div>
                )}
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-white mb-1">{member.name}</h3>
                <p className="text-purple-400 font-medium mb-3">{member.position}</p>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{member.bio}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {member.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs border-gray-700 text-gray-300">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="flex space-x-3">
                  {member.linkedin_url && (
                    <a
                      href={member.linkedin_url}
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  )}
                  {member.twitter_url && (
                    <a
                      href={member.twitter_url}
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

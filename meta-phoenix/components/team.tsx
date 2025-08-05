import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Linkedin, Twitter, Mail } from "lucide-react"

interface TeamMember {
  id: string
  name: string
  position: string
  bio: string
  skills: string[]
  image_url: string
  linkedin_url?: string
  twitter_url?: string
  email?: string
}

interface TeamProps {
  team: TeamMember[]
}

export function Team({ team }: TeamProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the talented professionals driving innovation at Meta Phoenix Tech
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.length > 0 ? (
            team.map((member) => (
              <Card key={member.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  {member.image_url ? (
                    <img
                      src={member.image_url || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-white text-4xl font-bold">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-purple-600 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {member.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-3">
                    {member.linkedin_url && (
                      <a href={member.linkedin_url} className="text-gray-400 hover:text-purple-600">
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                    {member.twitter_url && (
                      <a href={member.twitter_url} className="text-gray-400 hover:text-purple-600">
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-purple-600">
                        <Mail className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500">Team members will be loaded from the database</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

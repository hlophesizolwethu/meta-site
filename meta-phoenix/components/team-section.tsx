"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase"
import { Mail, Linkedin, Twitter, Github, MapPin, Calendar, Award, Users, ArrowRight, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface TeamMember {
  id: string
  name: string
  position: string
  bio: string
  image_url?: string
  email?: string
  linkedin_url?: string
  twitter_url?: string
  github_url?: string
  location?: string
  joined_date?: string
  specializations?: string[]
  achievements?: string[]
  status?: string
}

interface TeamImageProps {
  src?: string
  alt: string
  name: string
}

function TeamImage({ src, alt, name }: TeamImageProps) {
  const [imageLoading, setImageLoading] = useState(true)
  const [imageError, setImageError] = useState(false)

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  const handleImageError = () => {
    setImageLoading(false)
    setImageError(true)
  }

  if (!src || imageError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
        <span className="text-white text-2xl font-bold">{getInitials(name)}</span>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      {imageLoading && (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
        </div>
      )}
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        fill
        className={`object-cover transition-opacity duration-300 ${imageLoading ? "opacity-0" : "opacity-100"}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  )
}

export function TeamSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("team_members")
          .select("*")
          .eq("active", true)
          .order("display_order", { ascending: true })

        if (error) {
          console.error("Error fetching team members:", error)
          setTeamMembers(getDefaultTeamMembers())
        } else if (data && data.length > 0) {
          setTeamMembers(data)
        } else {
          setTeamMembers(getDefaultTeamMembers())
        }
      } catch (error) {
        console.error("Error:", error)
        setTeamMembers(getDefaultTeamMembers())
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  const getDefaultTeamMembers = (): TeamMember[] => [
    {
      id: "1",
      name: "Simelane S. Gcinizwi 'Spice'",
      position: "Chief Technology Officer",
      bio: "Leading cybersecurity expert with 15+ years of experience in AI-driven security solutions and threat intelligence.",
      image_url: "/team/spice.jpg",
      email: "sarah.chen@meta-phoenix.tech",
      linkedin_url: "https://linkedin.com/in/sarahchen",
      location: "San Francisco, CA",
      joined_date: "2020-01-15",
      specializations: ["AI Security", "Threat Intelligence", "Machine Learning", "IoT Security"],
      achievements: ["IEEE Security Award 2023", "Top 40 Under 40 in Cybersecurity"],
      status: "Available",
    },
    {
      id: "2",
      name: "Hlophe S. Sizolwethu 'Furman'",
      position: "Head of Research",
      bio: "Renowned researcher in quantum cryptography and post-quantum security with 20+ published papers.",
      image_url: "/team/furman.jpg",
      email: "michael.johnson@meta-phoenix.tech",
      linkedin_url: "https://linkedin.com/in/michaeljohnson",
      github_url: "https://github.com/mjohnson",
      location: "Boston, MA",
      joined_date: "2019-08-20",
      specializations: ["Quantum Cryptography", "Post-Quantum Security", "Research", "Academia"],
      achievements: ["NSF Research Grant Recipient", "Quantum Security Pioneer Award"],
      status: "Available",
    },
    {
      id: "3",
      name: "Dr. Alex Rodriguez",
      position: "Senior Security Architect",
      bio: "Expert in zero-trust architecture and cloud security with extensive experience in enterprise environments.",
      image_url: "/team/alex-rodriguez.jpg",
      email: "alex.rodriguez@meta-phoenix.tech",
      linkedin_url: "https://linkedin.com/in/alexrodriguez",
      twitter_url: "https://twitter.com/alexrodriguez",
      location: "Austin, TX",
      joined_date: "2021-03-10",
      specializations: ["Zero Trust", "Cloud Security", "Enterprise Architecture", "DevSecOps"],
      achievements: ["CISSP Certified", "Cloud Security Alliance Member"],
      status: "Busy",
    },
    {
      id: "4",
      name: "Dr. Emily Watson",
      position: "Malware Analysis Lead",
      bio: "Specialist in advanced persistent threats and malware reverse engineering with government and private sector experience.",
      image_url: "/team/emily-watson.jpg",
      email: "emily.watson@meta-phoenix.tech",
      linkedin_url: "https://linkedin.com/in/emilywatson",
      github_url: "https://github.com/ewatson",
      location: "Washington, DC",
      joined_date: "2020-11-05",
      specializations: ["Malware Analysis", "Reverse Engineering", "APT Research", "Digital Forensics"],
      achievements: ["SANS Certified Incident Handler", "Malware Research Excellence Award"],
      status: "Available",
    },
    {
      id: "5",
      name: "Prof. David Kim",
      position: "Behavioral Analytics Director",
      bio: "Pioneer in behavioral analytics for insider threat detection with expertise in user behavior modeling.",
      image_url: "/team/david-kim.jpg",
      email: "david.kim@meta-phoenix.tech",
      linkedin_url: "https://linkedin.com/in/davidkim",
      location: "Seattle, WA",
      joined_date: "2021-07-12",
      specializations: ["Behavioral Analytics", "Insider Threats", "User Modeling", "Psychology"],
      achievements: ["Behavioral Security Research Award", "Published Author"],
      status: "Available",
    },
    {
      id: "6",
      name: "Dr. Lisa Thompson",
      position: "Blockchain Security Specialist",
      bio: "Leading expert in blockchain security and cryptocurrency forensics with fintech industry experience.",
      image_url: "/team/lisa-thompson.jpg",
      email: "lisa.thompson@meta-phoenix.tech",
      linkedin_url: "https://linkedin.com/in/lisathompson",
      twitter_url: "https://twitter.com/lisathompson",
      location: "New York, NY",
      joined_date: "2022-02-28",
      specializations: ["Blockchain Security", "Cryptocurrency", "DeFi", "Financial Technology"],
      achievements: ["Blockchain Security Certification", "FinTech Innovation Award"],
      status: "Available",
    },
  ]

  const handleContactMember = (email?: string, name?: string) => {
    if (email) {
      window.location.href = `mailto:${email}?subject=Consultation Request&body=Hello ${name}, I would like to discuss a potential cybersecurity consultation.`
    } else {
      window.location.href = "/contact"
    }
  }

  const getStatusColor = (status?: string) => {
    switch (status) {
      case "Available":
        return "bg-green-500"
      case "Busy":
        return "bg-yellow-500"
      case "Unavailable":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Expert Team</h2>
            <div className="flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-purple-400" />
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Expert Team</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Meet the cybersecurity professionals and researchers driving innovation in digital security
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member) => (
            <Card
              key={member.id}
              className="bg-black border-gray-800 hover:border-purple-500/50 transition-all duration-300 group overflow-hidden"
            >
              <div className="relative">
                {/* Profile Image */}
                <div className="relative h-64 w-full overflow-hidden">
                  <TeamImage src={member.image_url} alt={member.name} name={member.name} />

                  {/* Status Indicator */}
                  {member.status && (
                    <div className="absolute top-4 right-4">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(member.status)}`} />
                    </div>
                  )}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      onClick={() => handleContactMember(member.email, member.name)}
                      className="bg-purple-600 hover:bg-purple-700 transform scale-90 group-hover:scale-100 transition-transform duration-300"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Contact
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-purple-400 font-medium mb-2">{member.position}</p>
                    <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
                  </div>

                  {/* Location and Join Date */}
                  <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                    {member.location && (
                      <div className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        {member.location}
                      </div>
                    )}
                    {member.joined_date && (
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        Since {new Date(member.joined_date).getFullYear()}
                      </div>
                    )}
                  </div>

                  {/* Specializations */}
                  {member.specializations && member.specializations.length > 0 && (
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {member.specializations.slice(0, 3).map((spec, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-gray-700 text-gray-400">
                            {spec}
                          </Badge>
                        ))}
                        {member.specializations.length > 3 && (
                          <Badge variant="outline" className="text-xs border-gray-700 text-gray-400">
                            +{member.specializations.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Achievements */}
                  {member.achievements && member.achievements.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center text-xs text-gray-500 mb-2">
                        <Award className="h-3 w-3 mr-1" />
                        Recent Achievements
                      </div>
                      <div className="space-y-1">
                        {member.achievements.slice(0, 2).map((achievement, index) => (
                          <p key={index} className="text-xs text-gray-400">
                            • {achievement}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social Links */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-800">
                    {member.email && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleContactMember(member.email, member.name)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800"
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                    )}
                    {member.linkedin_url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800"
                      >
                        <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {member.twitter_url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800"
                      >
                        <a href={member.twitter_url} target="_blank" rel="noopener noreferrer">
                          <Twitter className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    {member.github_url && (
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-800"
                      >
                        <a href={member.github_url} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    <div className="ml-auto">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(member.status)}`} />
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">{teamMembers.length}+</div>
            <div className="text-gray-400">Expert Team Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
            <div className="text-gray-400">Years Combined Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">100+</div>
            <div className="text-gray-400">Research Publications</div>
          </div>
        </div>

        {/* Join Our Team CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-purple-500/30 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Join Our Team</h3>
              <p className="text-gray-400 mb-6">
                We're always looking for talented cybersecurity professionals and researchers to join our mission
              </p>
              <Link href="/contact">
                <Button className="bg-purple-600 hover:bg-purple-700">
                  View Open Positions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

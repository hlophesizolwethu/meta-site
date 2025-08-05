"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, CheckCircle, Loader2 } from "lucide-react"

interface CompanyInfo {
  name: string
  address?: string
  phone?: string
  email?: string
  business_hours?: string
}

interface ContactProps {
  companyInfo: CompanyInfo | null
}

export function Contact({ companyInfo }: ContactProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const address = companyInfo?.address || "Mbabane, Eswatini"
  const phone = companyInfo?.phone || "+268 79368989 | +268 76648871"
  const email = companyInfo?.email || "meta.phoenix.eswatini.8@gmail.com"
  const businessHours = companyInfo?.business_hours || "24/7 Security Operations Center"

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log("Form submitted:", formData)
    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      })
    }, 3000)
  }

  const handleEmergencyResponse = () => {
    alert("Emergency Response activated - would connect to 24/7 security hotline")
  }

  const handleScheduleConsultation = () => {
    alert("Schedule Consultation - would open calendar booking system")
  }

  const handleCallEmergency = () => {
    window.open(`tel:${phone}`, "_self")
  }

  const handleEmailContact = () => {
    window.open(`mailto:${email}?subject=Security Inquiry`, "_self")
  }

  if (isSubmitted) {
    return (
      <section id="contact" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Card className="max-w-md mx-auto bg-green-900/20 border-green-500/30">
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-green-300">
                  Thank you for contacting Meta-Phoenix. Our security team will respond within 24 hours.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Secure Your Digital Future</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Ready to enhance your cybersecurity posture? Contact our security experts today.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <Card className="bg-black border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Get Security Consultation</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="bg-gray-900 border-gray-700 text-white"
                      required
                    />
                    <Input
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="bg-gray-900 border-gray-700 text-white"
                      required
                    />
                  </div>
                  <Input
                    name="email"
                    placeholder="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-gray-900 border-gray-700 text-white"
                    required
                  />
                  <Input
                    name="company"
                    placeholder="Company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="bg-gray-900 border-gray-700 text-white"
                  />
                  <Input
                    name="subject"
                    placeholder="Security Challenge"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="bg-gray-900 border-gray-700 text-white"
                    required
                  />
                  <Textarea
                    name="message"
                    placeholder="Describe your security requirements..."
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-gray-900 border-gray-700 text-white"
                    required
                  />
                  <Button type="submit" disabled={isSubmitting} className="w-full bg-purple-600 hover:bg-purple-700">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Request...
                      </>
                    ) : (
                      "Request Security Assessment"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-purple-400 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Headquarters</h4>
                    <p className="text-gray-400">{address}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-purple-400 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Emergency Hotline</h4>
                    <p className="text-gray-400">{phone}</p>
                    <Button
                      onClick={handleCallEmergency}
                      variant="ghost"
                      size="sm"
                      className="text-purple-400 hover:text-purple-300 p-0 h-auto"
                    >
                      Call Now
                    </Button>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-purple-400 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Security Team</h4>
                    <p className="text-gray-400">{email}</p>
                    <Button
                      onClick={handleEmailContact}
                      variant="ghost"
                      size="sm"
                      className="text-purple-400 hover:text-purple-300 p-0 h-auto"
                    >
                      Send Email
                    </Button>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-purple-400 mr-4 mt-1" />
                  <div>
                    <h4 className="font-semibold text-white">Availability</h4>
                    <p className="text-gray-400">{businessHours}</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-purple-900/20 border-purple-500/30">
              <CardContent className="p-6">
                <h4 className="font-semibold text-purple-300 mb-2">Emergency Security Response</h4>
                <p className="text-purple-200 mb-4">
                  Experiencing a security incident? Our rapid response team is available 24/7 to help contain and
                  resolve threats.
                </p>
                <Button
                  onClick={handleEmergencyResponse}
                  variant="outline"
                  className="border-purple-400 text-purple-300 hover:bg-purple-600 hover:text-white bg-transparent"
                >
                  Emergency Response
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/20 border-blue-500/30">
              <CardContent className="p-6">
                <h4 className="font-semibold text-blue-300 mb-2">Free Security Consultation</h4>
                <p className="text-blue-200 mb-4">
                  Schedule a complimentary security assessment with our experts to identify vulnerabilities and
                  improvement opportunities.
                </p>
                <Button
                  onClick={handleScheduleConsultation}
                  variant="outline"
                  className="border-blue-400 text-blue-300 hover:bg-blue-600 hover:text-white bg-transparent"
                >
                  Schedule Consultation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

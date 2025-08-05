"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, CheckCircle, Loader2, Shield, AlertTriangle } from "lucide-react"

export function ContactSection() {
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
    alert("🚨 Emergency Security Response activated - connecting to 24/7 security hotline")
  }

  const handleScheduleConsultation = () => {
    alert("📅 Schedule Consultation - would open calendar booking system")
  }

  const handleCallEmergency = () => {
    window.open("tel:+268XXXXXXX", "_self")
  }

  const handleEmailContact = () => {
    window.open("mailto:security@metaphoenix.co.sz?subject=Security Inquiry", "_self")
  }

  if (isSubmitted) {
    return (
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Card className="max-w-md mx-auto bg-green-900/20 border-green-500/30">
              <CardContent className="p-8 text-center">
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Message Sent Successfully!</h3>
                <p className="text-green-300 mb-4">
                  Thank you for contacting Meta-Phoenix. Our security team will respond within 24 hours.
                </p>
                <p className="text-sm text-green-400">
                  For urgent security matters, please call our emergency hotline: +268 XX XXX XXXX
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-purple-400" />
                  Get Security Consultation
                </CardTitle>
                <p className="text-gray-400">
                  Fill out the form below and our security experts will get back to you within 24 hours.
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="firstName"
                      placeholder="First Name *"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="bg-black border-gray-700 text-white placeholder:text-gray-500"
                      required
                    />
                    <Input
                      name="lastName"
                      placeholder="Last Name *"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="bg-black border-gray-700 text-white placeholder:text-gray-500"
                      required
                    />
                  </div>
                  <Input
                    name="email"
                    placeholder="Email Address *"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-black border-gray-700 text-white placeholder:text-gray-500"
                    required
                  />
                  <Input
                    name="company"
                    placeholder="Company/Organization"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="bg-black border-gray-700 text-white placeholder:text-gray-500"
                  />
                  <Input
                    name="subject"
                    placeholder="Security Challenge/Subject *"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="bg-black border-gray-700 text-white placeholder:text-gray-500"
                    required
                  />
                  <Textarea
                    name="message"
                    placeholder="Describe your security requirements, current challenges, or incident details... *"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-black border-gray-700 text-white placeholder:text-gray-500"
                    required
                  />
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending Security Request...
                      </>
                    ) : (
                      <>
                        <Shield className="mr-2 h-4 w-4" />
                        Request Security Assessment
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    * Required fields. All communications are encrypted and secure.
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-purple-400 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">Security Operations Center</h4>
                    <p className="text-gray-400">Mbabane, Eswatini</p>
                    <p className="text-sm text-gray-500">Global cybersecurity operations</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-purple-400 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">24/7 Emergency Hotline</h4>
                    <p className="text-gray-400">+268 XX XXX XXXX</p>
                    <Button
                      onClick={handleCallEmergency}
                      variant="ghost"
                      size="sm"
                      className="text-purple-400 hover:text-purple-300 p-0 h-auto mt-1"
                    >
                      Call Emergency Line →
                    </Button>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-purple-400 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">Security Team</h4>
                    <p className="text-gray-400">security@metaphoenix.co.sz</p>
                    <Button
                      onClick={handleEmailContact}
                      variant="ghost"
                      size="sm"
                      className="text-purple-400 hover:text-purple-300 p-0 h-auto mt-1"
                    >
                      Send Secure Email →
                    </Button>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-purple-400 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-white">Response Times</h4>
                    <p className="text-gray-400">Emergency: &lt;5 minutes</p>
                    <p className="text-gray-400">General Inquiries: &lt;24 hours</p>
                    <p className="text-sm text-green-400">🟢 Security Operations Center: Always Online</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Response Card */}
            <Card className="bg-red-900/20 border-red-500/30">
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <AlertTriangle className="h-6 w-6 text-red-400 mr-3" />
                  <h4 className="font-semibold text-red-300 text-lg">Security Emergency?</h4>
                </div>
                <p className="text-red-200 mb-4">
                  Experiencing an active security incident, data breach, or cyber attack? Our rapid response team is
                  available 24/7 to help contain and resolve threats immediately.
                </p>
                <div className="space-y-2">
                  <Button onClick={handleEmergencyResponse} className="w-full bg-red-600 hover:bg-red-700 text-white">
                    🚨 Activate Emergency Response
                  </Button>
                  <p className="text-xs text-red-300 text-center">
                    Average response time: &lt;5 minutes • Global incident response team
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Consultation Card */}
            <Card className="bg-blue-900/20 border-blue-500/30">
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <Shield className="h-6 w-6 text-blue-400 mr-3" />
                  <h4 className="font-semibold text-blue-300 text-lg">Free Security Assessment</h4>
                </div>
                <p className="text-blue-200 mb-4">
                  Schedule a complimentary security consultation with our experts to identify vulnerabilities and
                  improvement opportunities in your current security posture.
                </p>
                <div className="space-y-2">
                  <Button
                    onClick={handleScheduleConsultation}
                    variant="outline"
                    className="w-full border-blue-400 text-blue-300 hover:bg-blue-600 hover:text-white bg-transparent"
                  >
                    📅 Schedule Free Consultation
                  </Button>
                  <p className="text-xs text-blue-300 text-center">
                    No obligation • Expert analysis • Customized recommendations
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Location/Map Placeholder */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-6">
                <h4 className="font-semibold text-white mb-3">Our Location</h4>
                <div className="bg-gray-800 rounded-lg p-8 text-center">
                  <MapPin className="h-12 w-12 text-purple-400 mx-auto mb-3" />
                  <p className="text-gray-300 mb-2">Meta-Phoenix Security Operations Center</p>
                  <p className="text-gray-400 text-sm">Mbabane, Eswatini</p>
                  <p className="text-gray-500 text-xs mt-2">
                    Serving clients globally with local expertise in Southern Africa
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

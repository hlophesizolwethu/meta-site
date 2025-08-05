import { ContactHero } from "@/components/contact-hero"
import { ContactSection } from "@/components/contact-section"

export const metadata = {
  title: "Contact Us - Meta Phoenix Tech",
  description: "Get in touch with our cybersecurity experts. 24/7 emergency response available for security incidents.",
}

export default function ContactPage() {
  return (
    <div className="bg-black min-h-screen">
      <ContactHero />
      <ContactSection />
    </div>
  )
}

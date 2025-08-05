import { createClient } from "@/lib/supabase"
import { ServicesHero } from "@/components/services-hero"
import { ServicesList } from "@/components/services-list"
import { ServiceProcess } from "@/components/service-process"
import { ServiceCTA } from "@/components/service-cta"

export const metadata = {
  title: "Cybersecurity Services - Meta Phoenix Tech",
  description:
    "Comprehensive cybersecurity services including threat detection, network security, data protection, and incident response.",
}

export default async function ServicesPage() {
  const supabase = createClient()

  const { data: services } = await supabase
    .from("security_services")
    .select("*")
    .eq("active", true)
    .order("order_index")

  return (
    <div className="bg-black min-h-screen">
      <ServicesHero />
      <ServicesList services={services || []} />
      <ServiceProcess />
      <ServiceCTA />
    </div>
  )
}

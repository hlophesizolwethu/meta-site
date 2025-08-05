import { createClient } from "@/lib/supabase"
import { Hero } from "@/components/hero"
import { ServicesOverview } from "@/components/services-overview"
import { ResearchHighlights } from "@/components/research-highlights"
import { StatsSection } from "@/components/stats-section"
import { CTASection } from "@/components/cta-section"

export default async function HomePage() {
  const supabase = createClient()

  // Fetch dynamic content from database
  const { data: companyInfo } = await supabase.from("company_info").select("*").single()
  const { data: featuredServices } = await supabase
    .from("security_services")
    .select("*")
    .eq("active", true)
    .limit(3)
    .order("order_index")
  const { data: featuredResearch } = await supabase.from("research_projects").select("*").eq("featured", true).limit(2)

  return (
    <div className="bg-black">
      <Hero companyInfo={companyInfo} />
      <ServicesOverview services={featuredServices || []} />
      <ResearchHighlights research={featuredResearch || []} />
      <StatsSection />
      <CTASection />
    </div>
  )
}

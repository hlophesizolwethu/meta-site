import { createClient } from "@/lib/supabase"
import { AboutHero } from "@/components/about-hero"
import { MissionVision } from "@/components/mission-vision"
import { TeamSection } from "@/components/team-section"
import { CompanyValues } from "@/components/company-values"
import { Timeline } from "@/components/timeline"

export const metadata = {
  title: "About Us - Meta Phoenix Tech",
  description:
    "Learn about Meta Phoenix Tech's mission to secure the digital frontier through innovative cybersecurity research and solutions.",
}

export default async function AboutPage() {
  const supabase = createClient()

  const { data: companyInfo } = await supabase.from("company_info").select("*").single()
  const { data: team } = await supabase.from("team_members").select("*").eq("active", true).order("order_index")

  return (
    <div className="bg-black min-h-screen">
      <AboutHero companyInfo={companyInfo} />
      <MissionVision companyInfo={companyInfo} />
      <TeamSection team={team || []} />
      <CompanyValues companyInfo={companyInfo} />
      <Timeline />
    </div>
  )
}

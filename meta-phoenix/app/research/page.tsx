import { createClient } from "@/lib/supabase"
import { ResearchHero } from "@/components/research-hero"
import { ResearchGrid } from "@/components/research-grid"
import { ResearchAreas } from "@/components/research-areas"
import { PublicationStats } from "@/components/publication-stats"

export const metadata = {
  title: "Cybersecurity Research - Meta Phoenix Tech",
  description:
    "Pioneering cybersecurity research in AI-driven threat detection, quantum cryptography, and behavioral analysis.",
}

export default async function ResearchPage() {
  const supabase = createClient()

  const { data: research } = await supabase
    .from("research_projects")
    .select("*")
    .eq("active", true)
    .order("publication_date", { ascending: false })

  return (
    <div className="bg-black min-h-screen">
      <ResearchHero />
      <ResearchGrid research={research || []} />
      <ResearchAreas />
      <PublicationStats />
    </div>
  )
}

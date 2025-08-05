import { createClient } from "@/lib/supabase"
import { ChallengesHero } from "@/components/challenges-hero"
import { ChallengesList } from "@/components/challenges-list"
import { LeaderboardSection } from "@/components/leaderboard-section"
import { XPRewardsInfo } from "@/components/xp-rewards-info"

export const metadata = {
  title: "Security Challenges - Meta Phoenix Tech",
  description:
    "Join gamified cybersecurity challenges to earn XP points, unlock badges, and advance your security skills.",
}

export default async function ChallengesPage() {
  const supabase = createClient()

  const { data: challenges } = await supabase
    .from("security_challenges")
    .select("*")
    .eq("active", true)
    .order("order_index")

  return (
    <div className="bg-black min-h-screen">
      <ChallengesHero />
      <XPRewardsInfo />
      <ChallengesList challenges={challenges || []} />
      <LeaderboardSection />
    </div>
  )
}

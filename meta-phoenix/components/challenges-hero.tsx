export function ChallengesHero() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Security Challenges</h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
          Test your cybersecurity skills, earn XP points, unlock badges, and climb the leaderboard
        </p>
        <div className="flex items-center justify-center space-x-8 text-sm text-purple-200">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <span>Gamified Learning</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
            <span>Real-World Scenarios</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
            <span>Skill Progression</span>
          </div>
        </div>
      </div>
    </section>
  )
}

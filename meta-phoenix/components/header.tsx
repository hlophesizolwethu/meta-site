"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { X, Trophy, LogOut, Settings, Award } from "lucide-react"
import { AuthModal } from "@/components/auth-modal"
import { getCurrentUser, getUserProgress, logoutUser, type User, type UserProgress } from "@/lib/auth"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Research", href: "/research" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    setIsLoading(true)
    const currentUser = await getCurrentUser()
    if (currentUser) {
      setUser(currentUser)
      const progress = await getUserProgress(currentUser.id)
      setUserProgress(progress)
    }
    setIsLoading(false)
  }

  const handleLogin = async (loggedInUser: User) => {
    setUser(loggedInUser)
    const progress = await getUserProgress(loggedInUser.id)
    setUserProgress(progress)
  }

  const handleLogout = async () => {
    await logoutUser()
    setUser(null)
    setUserProgress(null)
  }

  const handleGetStarted = () => {
    if (user) {
      window.location.href = "/services"
    } else {
      setIsAuthModalOpen(true)
    }
  }

  return (
    <>
      <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">MP</span>
                </div>
                <span className="text-white font-semibold text-lg hidden sm:block">Meta-Phoenix</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium transition-colors ${
                      pathname === item.href
                        ? "text-purple-400 border-b-2 border-purple-400"
                        : "text-gray-300 hover:text-purple-400"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </nav>

            {/* User Info & Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {user && userProgress && (
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => (window.location.href = "/challenges")}
                    className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 transition-colors"
                    title="Join Security Challenges to Earn More XP"
                  >
                    <Trophy className="h-4 w-4" />
                    <span className="text-sm font-medium">{userProgress.total_xp} XP</span>
                  </Button>
                  <Badge variant="outline" className="text-purple-300 border-purple-400">
                    Level {userProgress.level}
                  </Badge>
                </div>
              )}

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                      <Trophy className="h-4 w-4 mr-2" />
                      <span className="hidden lg:inline">{user.full_name || user.email}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700">
                    <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800">
                      <Settings className="h-4 w-4 mr-2" />
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800">
                      <Award className="h-4 w-4 mr-2" />
                      My Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="text-gray-300 hover:text-white hover:bg-gray-800"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="text-gray-300 hover:text-white"
                  disabled={isLoading}
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  {isLoading ? "..." : "Login"}
                </Button>
              )}

              <Button
                size="sm"
                onClick={handleGetStarted}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-white"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Trophy className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-800">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 text-base font-medium ${
                      pathname === item.href ? "text-purple-400" : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="pt-4 border-t border-gray-800 space-y-3">
                  {user && userProgress && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => (window.location.href = "/challenges")}
                      className="flex items-center justify-between px-3 text-yellow-400 hover:text-yellow-300"
                      title="Join Security Challenges"
                    >
                      <div className="flex items-center space-x-2">
                        <Trophy className="h-4 w-4" />
                        <span className="text-sm font-medium">{userProgress.total_xp} XP</span>
                      </div>
                      <Badge variant="outline" className="text-purple-300 border-purple-400">
                        Level {userProgress.level}
                      </Badge>
                    </Button>
                  )}

                  <div className="flex flex-col space-y-2 px-3">
                    {user ? (
                      <>
                        <span className="text-gray-300 text-sm">{user.full_name || user.email}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleLogout}
                          className="text-gray-300 justify-start p-0"
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsAuthModalOpen(true)}
                        className="text-gray-300 justify-start p-0"
                        disabled={isLoading}
                      >
                        <Trophy className="h-4 w-4 mr-2" />
                        {isLoading ? "..." : "Login"}
                      </Button>
                    )}
                    <Button
                      size="sm"
                      onClick={handleGetStarted}
                      className="bg-gradient-to-r from-purple-600 to-blue-600"
                    >
                      Get Started
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onLogin={handleLogin} />
    </>
  )
}

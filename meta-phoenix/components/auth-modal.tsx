"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Loader2, Shield, AlertCircle } from "lucide-react"
import { loginUser, registerUser, type User as AuthUser } from "@/lib/auth"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  onLogin: (user: AuthUser) => void
}

export function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [loginData, setLoginData] = useState({ email: "", password: "" })
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    full_name: "",
    company: "",
    role: "",
  })

  if (!isOpen) return null

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await loginUser(loginData.email, loginData.password)

      if (result.success && result.user) {
        onLogin(result.user)
        onClose()
        // Reset form
        setLoginData({ email: "", password: "" })
      } else {
        setError(result.error || "Login failed")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    }

    setIsLoading(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    if (registerData.password.length < 6) {
      setError("Password must be at least 6 characters")
      setIsLoading(false)
      return
    }

    try {
      const result = await registerUser({
        email: registerData.email,
        full_name: registerData.full_name,
        company: registerData.company,
        role: registerData.role,
      })

      if (result.success && result.user) {
        onLogin(result.user)
        onClose()
        // Reset form
        setRegisterData({
          email: "",
          password: "",
          confirmPassword: "",
          full_name: "",
          company: "",
          role: "",
        })
      } else {
        setError(result.error || "Registration failed")
      }
    } catch (err) {
      setError("An unexpected error occurred")
    }

    setIsLoading(false)
  }

  const handleDemoLogin = async () => {
    setIsLoading(true)
    setError("")

    try {
      const result = await loginUser("demo@metaphoenix.co.sz", "demo")
      if (result.success && result.user) {
        onLogin(result.user)
        onClose()
      } else {
        setError("Demo login failed. Please try again.")
      }
    } catch (err) {
      setError("Demo login failed. Please try again.")
    }

    setIsLoading(false)
  }

  const handleClose = () => {
    setError("")
    setLoginData({ email: "", password: "" })
    setRegisterData({
      email: "",
      password: "",
      confirmPassword: "",
      full_name: "",
      company: "",
      role: "",
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-800">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="absolute right-2 top-2 text-gray-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </Button>
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Shield className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-center text-white">Meta-Phoenix Security Portal</CardTitle>
          <CardDescription className="text-center text-gray-400">
            Access your security dashboard and learning progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-800">
              <TabsTrigger value="login" className="text-gray-300 data-[state=active]:text-white">
                Login
              </TabsTrigger>
              <TabsTrigger value="register" className="text-gray-300 data-[state=active]:text-white">
                Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4 mt-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="your.email@company.com"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    className="bg-black border-gray-700 text-white"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-gray-300">
                    Password
                  </Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    className="bg-black border-gray-700 text-white"
                    required
                  />
                </div>

                {error && (
                  <div className="flex items-center space-x-2 text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                  </div>
                )}

                <Button type="submit" disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-900 px-2 text-gray-400">Or</span>
                </div>
              </div>

              <Button
                onClick={handleDemoLogin}
                variant="outline"
                className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading Demo...
                  </>
                ) : (
                  "Try Demo Account"
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">Demo account: demo@metaphoenix.co.sz</p>
            </TabsContent>

            <TabsContent value="register" className="space-y-4 mt-6">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name" className="text-gray-300">
                      Full Name *
                    </Label>
                    <Input
                      id="register-name"
                      placeholder="John Doe"
                      value={registerData.full_name}
                      onChange={(e) => setRegisterData({ ...registerData, full_name: e.target.value })}
                      className="bg-black border-gray-700 text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-gray-300">
                      Email *
                    </Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="your.email@company.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      className="bg-black border-gray-700 text-white"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-company" className="text-gray-300">
                        Company
                      </Label>
                      <Input
                        id="register-company"
                        placeholder="Your Company"
                        value={registerData.company}
                        onChange={(e) => setRegisterData({ ...registerData, company: e.target.value })}
                        className="bg-black border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-role" className="text-gray-300">
                        Role
                      </Label>
                      <Input
                        id="register-role"
                        placeholder="Security Analyst"
                        value={registerData.role}
                        onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
                        className="bg-black border-gray-700 text-white"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-gray-300">
                      Password *
                    </Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="Create a strong password (min 6 chars)"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      className="bg-black border-gray-700 text-white"
                      required
                      minLength={6}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm" className="text-gray-300">
                      Confirm Password *
                    </Label>
                    <Input
                      id="register-confirm"
                      type="password"
                      placeholder="Confirm your password"
                      value={registerData.confirmPassword}
                      onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                      className="bg-black border-gray-700 text-white"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-center space-x-2 text-red-400 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                  </div>
                )}

                <Button type="submit" disabled={isLoading} className="w-full bg-purple-600 hover:bg-purple-700">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">* Required fields</p>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

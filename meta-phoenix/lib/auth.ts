import { createClient } from "@/lib/supabase"

export interface User {
  id: string
  email: string
  full_name?: string
  company?: string
  role?: string
}

export interface UserProgress {
  total_xp: number
  level: number
  badges: string[]
  completed_challenges: string[]
}

interface UserProfile {
  id: string
  email: string
  full_name: string | null
  company: string | null
  role: string | null
}

interface UserSession {
  user_id: string
  expires_at: string
  user_profiles: UserProfile
}

export async function getCurrentUser(): Promise<User | null> {
  if (typeof window === "undefined") return null

  const sessionToken = localStorage.getItem("session_token")
  if (!sessionToken) return null

  try {
    const supabase = createClient()

    const { data: session, error } = await supabase
      .from("user_sessions")
      .select(`
        user_id,
        expires_at,
        user_profiles (
          id,
          email,
          full_name,
          company,
          role
        )
      `)
      .eq("session_token", sessionToken)
      .gt("expires_at", new Date().toISOString())
      .single()

    if (error || !session?.user_profiles) {
      localStorage.removeItem("session_token")
      return null
    }

    const userProfile = session.user_profiles as UserProfile

    return {
      id: userProfile.id,
      email: userProfile.email,
      full_name: userProfile.full_name || undefined,
      company: userProfile.company || undefined,
      role: userProfile.role || undefined,
    }
  } catch (error) {
    console.error("Error getting current user:", error)
    localStorage.removeItem("session_token")
    return null
  }
}

export async function getUserProgress(userId: string): Promise<UserProgress | null> {
  try {
    const supabase = createClient()

    const { data: progress, error } = await supabase
      .from("user_progress")
      .select("total_xp, level, badges, completed_challenges")
      .eq("user_id", userId)
      .single()

    if (error || !progress) {
      // Create default progress if none exists
      const { data: newProgress } = await supabase
        .from("user_progress")
        .insert({
          user_id: userId,
          total_xp: 0,
          level: 1,
          badges: [],
          completed_challenges: [],
        })
        .select("total_xp, level, badges, completed_challenges")
        .single()

      return newProgress || { total_xp: 0, level: 1, badges: [], completed_challenges: [] }
    }

    return {
      total_xp: progress.total_xp || 0,
      level: progress.level || 1,
      badges: progress.badges || [],
      completed_challenges: progress.completed_challenges || [],
    }
  } catch (error) {
    console.error("Error getting user progress:", error)
    return { total_xp: 0, level: 1, badges: [], completed_challenges: [] }
  }
}

export async function loginUser(
  email: string,
  password: string,
): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const supabase = createClient()

    const { data: users, error } = await supabase.from("user_profiles").select("*").eq("email", email)

    if (error || !users || users.length === 0) {
      return { success: false, error: "Invalid credentials" }
    }

    const user = users[0] as UserProfile

    // For demo purposes, we'll accept any password for existing users
    // In production, you would verify the password hash here

    // Create session
    const sessionToken = globalThis.crypto?.randomUUID() || Math.random().toString(36)
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7) // 7 days

    const { error: sessionError } = await supabase.from("user_sessions").insert({
      user_id: user.id,
      session_token: sessionToken,
      expires_at: expiresAt.toISOString(),
    })

    if (sessionError) {
      console.error("Session creation error:", sessionError)
      return { success: false, error: "Failed to create session" }
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("session_token", sessionToken)
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name || undefined,
        company: user.company || undefined,
        role: user.role || undefined,
      },
    }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "Login failed" }
  }
}

export async function logoutUser(): Promise<void> {
  if (typeof window === "undefined") return

  const sessionToken = localStorage.getItem("session_token")
  if (sessionToken) {
    try {
      const supabase = createClient()
      await supabase.from("user_sessions").delete().eq("session_token", sessionToken)
    } catch (error) {
      console.error("Logout error:", error)
    }
    localStorage.removeItem("session_token")
  }
}

export async function registerUser(userData: {
  email: string
  full_name: string
  company?: string
  role?: string
}): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const supabase = createClient()

    // Check if user already exists
    const { data: existingUsers } = await supabase.from("user_profiles").select("id").eq("email", userData.email)

    if (existingUsers && existingUsers.length > 0) {
      return { success: false, error: "User already exists" }
    }

    // Create user profile
    const { data: newUsers, error } = await supabase.from("user_profiles").insert(userData).select()

    if (error || !newUsers || newUsers.length === 0) {
      console.error("User creation error:", error)
      return { success: false, error: "Failed to create user" }
    }

    const newUser = newUsers[0] as UserProfile

    // Create initial user progress
    await supabase.from("user_progress").insert({
      user_id: newUser.id,
      total_xp: 0,
      level: 1,
      badges: [],
      completed_challenges: [],
    })

    // Create session for new user
    const sessionToken = globalThis.crypto?.randomUUID() || Math.random().toString(36)
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + 7)

    await supabase.from("user_sessions").insert({
      user_id: newUser.id,
      session_token: sessionToken,
      expires_at: expiresAt.toISOString(),
    })

    if (typeof window !== "undefined") {
      localStorage.setItem("session_token", sessionToken)
    }

    return {
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        full_name: newUser.full_name || undefined,
        company: newUser.company || undefined,
        role: newUser.role || undefined,
      },
    }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, error: "Registration failed" }
  }
}

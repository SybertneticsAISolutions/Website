import { createBrowserClient } from '@supabase/ssr'

// Browser client for client-side auth
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
  )
}



// Auth helper functions
export const authHelpers = {
  // Sign in with email and password
  async signIn(email: string, password: string) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  // Sign up with email and password
  async signUp(email: string, password: string) {
    const supabase = createClient()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    return { data, error }
  },

  // Sign out
  async signOut() {
    const supabase = createClient()
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  async getCurrentUser() {
    const supabase = createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Get session
  async getSession() {
    const supabase = createClient()
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  // Check if user is admin (you can customize this logic)
  async isAdmin(userId: string) {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('admin_users')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    return { isAdmin: !!data, error }
  }
}

// Types for TypeScript
export interface AuthUser {
  id: string
  email: string
  email_confirmed_at?: string
  created_at: string
  updated_at: string
}

export interface AuthSession {
  access_token: string
  refresh_token: string
  expires_in: number
  expires_at?: number
  token_type: string
  user: AuthUser
} 
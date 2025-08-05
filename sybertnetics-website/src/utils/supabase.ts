import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript support
export interface ContactMessage {
  id?: string
  name: string
  email: string
  company?: string
  message: string
  created_at?: string
}

export interface BetaSignup {
  id?: string
  email: string
  name?: string
  company?: string
  use_case?: string
  created_at?: string
}

export interface NewsletterSignup {
  id?: string
  email: string
  created_at?: string
}

// Helper functions for common operations
export const contactOperations = {
  async submitContact(data: Omit<ContactMessage, 'id' | 'created_at'>) {
    const { data: result, error } = await supabase
      .from('contact_messages')
      .insert([data])
      .select()
    
    if (error) throw error
    return result[0]
  },

  async getContacts() {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
}

export const betaOperations = {
  async submitBetaSignup(data: Omit<BetaSignup, 'id' | 'created_at'>) {
    const { data: result, error } = await supabase
      .from('beta_signups')
      .insert([data])
      .select()
    
    if (error) throw error
    return result[0]
  },

  async getBetaSignups() {
    const { data, error } = await supabase
      .from('beta_signups')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
}

export const newsletterOperations = {
  async submitNewsletterSignup(email: string) {
    const { data: result, error } = await supabase
      .from('newsletter_signups')
      .insert([{ email }])
      .select()
    
    if (error) throw error
    return result[0]
  },

  async getNewsletterSignups() {
    const { data, error } = await supabase
      .from('newsletter_signups')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  }
} 
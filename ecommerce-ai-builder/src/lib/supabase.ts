import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn('⚠️ Supabase environment variables not found. Using placeholder values.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Enhanced Database types
export interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Project {
  id: string
  user_id: string
  name: string
  description: string
  category: string
  color_scheme: string
  status: 'generating' | 'completed' | 'failed' | 'published'
  generated_data?: GeneratedSiteData
  site_url?: string
  thumbnail_url?: string
  is_public: boolean
  view_count: number
  created_at: string
  updated_at: string
}

export interface GeneratedSiteData {
  brandName: string
  description: string
  category: string
  colorScheme: string
  hero: {
    title: string
    subtitle: string
    image: string
  }
  products: Array<{
    id: string
    name: string
    price: number
    description: string
    image: string
    category: string
    variants?: {
      size?: string[]
      color?: string[]
    }
  }>
  navigation: string[]
  footer: {
    about: string
    contact: {
      email: string
      phone: string
      address: string
    }
  }
}

export interface Template {
  id: string
  name: string
  category: string
  preview_image: string
  demo_url: string
  description: string
  is_featured: boolean
  created_at: string
}

// Database helper functions
export const db = {
  // Projects
  async createProject(projectData: Omit<Project, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('projects')
      .insert([projectData])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async getProject(id: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async getUserProjects(userId: string) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async updateProject(id: string, updates: Partial<Project>) {
    const { data, error } = await supabase
      .from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteProject(id: string) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // Public projects for community
  async getPublicProjects(limit = 12) {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        id,
        name,
        description,
        category,
        thumbnail_url,
        view_count,
        created_at
      `)
      .eq('is_public', true)
      .eq('status', 'completed')
      .order('view_count', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  },

  // Increment view count
  async incrementViewCount(projectId: string) {
    const { error } = await supabase.rpc('increment_view_count', {
      project_id: projectId
    })

    if (error) console.error('Failed to increment view count:', error)
  }
}

// Auth helper functions
export const auth = {
  async signUp(email: string, password: string, fullName?: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    })

    if (error) throw error
    return data
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error
    return data
  },

  async signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })

    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    return
  },

  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  async updateProfile(updates: { full_name?: string; avatar_url?: string }) {
    const { data, error } = await supabase.auth.updateUser({
      data: updates
    })

    if (error) throw error
    return data
  }
}

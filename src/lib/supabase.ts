import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      mini_sites: {
        Row: {
          id: string
          page_title: string
          message: string | null
          start_date: string | null
          photos: string[] | null
          youtube_url: string | null
          animation: string | null
          contact_name: string
          contact_email: string
          contact_phone: string | null
          site_url: string
          payment_status: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          page_title: string
          message?: string | null
          start_date?: string | null
          photos?: string[] | null
          youtube_url?: string | null
          animation?: string | null
          contact_name: string
          contact_email: string
          contact_phone?: string | null
          site_url: string
          payment_status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          page_title?: string
          message?: string | null
          start_date?: string | null
          photos?: string[] | null
          youtube_url?: string | null
          animation?: string | null
          contact_name?: string
          contact_email?: string
          contact_phone?: string | null
          site_url?: string
          payment_status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
  }
}
import { supabase } from '@/lib/supabase'
import { SiteData } from './siteGenerator'

export interface MiniSiteData {
  page_title: string
  message: string
  start_date: string
  photos: string[]
  youtube_url: string
  contact_name: string
  contact_email: string
  contact_phone?: string
  site_url: string
  payment_status?: string
}

export const saveMiniSite = async (siteData: SiteData): Promise<string> => {
  try {
    // Generate a unique URL for the mini site
    const siteUrl = generateUniqueSiteUrl(siteData.title)
    
    // Prepare data for Supabase
    const miniSiteData: MiniSiteData = {
      page_title: siteData.title,
      message: siteData.message,
      start_date: siteData.relationshipDate,
      photos: siteData.photos,
      youtube_url: siteData.youtubeUrl,
      contact_name: `${siteData.partnerName1} & ${siteData.partnerName2}`,
      contact_email: 'contato@lovesite.com', // You might want to collect this from the user
      site_url: siteUrl,
      payment_status: 'free'
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from('mini_sites')
      .insert([miniSiteData])
      .select()
      .single()

    if (error) {
      console.error('Error saving mini site:', error)
      throw new Error('Failed to save mini site')
    }

    console.log('Mini site saved successfully:', data)
    return siteUrl
  } catch (error) {
    console.error('Error in saveMiniSite:', error)
    throw error
  }
}

export const getMiniSiteByUrl = async (siteUrl: string): Promise<MiniSiteData | null> => {
  try {
    const { data, error } = await supabase
      .from('mini_sites')
      .select('*')
      .eq('site_url', siteUrl)
      .single()

    if (error) {
      console.error('Error fetching mini site:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in getMiniSiteByUrl:', error)
    return null
  }
}

const generateUniqueSiteUrl = (title: string): string => {
  // Create a URL-friendly version of the title
  const baseUrl = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .trim()
    .substring(0, 30) // Limit length

  // Add timestamp to ensure uniqueness
  const timestamp = Date.now().toString(36)
  return `${baseUrl}-${timestamp}`
}

export const convertMiniSiteToSiteData = (miniSite: MiniSiteData): SiteData => {
  // Extract partner names from contact_name (assuming format "Name1 & Name2")
  const names = miniSite.contact_name.split(' & ')
  
  return {
    title: miniSite.page_title,
    partnerName1: names[0] || 'Partner 1',
    partnerName2: names[1] || 'Partner 2',
    relationshipDate: miniSite.start_date || '',
    message: miniSite.message || '',
    primaryColor: '#e91e63', // Default color, you might want to store this in the database
    photos: miniSite.photos || [],
    youtubeUrl: miniSite.youtube_url || ''
  }
}
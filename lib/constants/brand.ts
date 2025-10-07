import { BrandConfig } from '../types/brand'
import { SCC_BRAND_RED, SCC_SECONDARY, SCC_SUCCESS } from './colors'

// Dillon Consulting Brand Colors
export const DILLON_GREEN = '#08353F' // Primary brand green (dark teal/forest green)
export const DILLON_GRAY = '#707070' // Professional gray
export const DILLON_SUCCESS = '#00A651' // Success green

export const DILLON_BRAND: BrandConfig = {
  name: 'Dillon Consulting Limited',
  logo: '/images/dillon_logo.svg',
  colors: {
    primary: DILLON_GREEN, // #08353F - Primary brand color for CTAs and key UI elements
    secondary: DILLON_GRAY, // #707070 - Professional Gray for secondary actions
    success: DILLON_SUCCESS // #00A651 - Green for positive metrics and success states
  },
  ai: {
    name: 'Dillon',
    persona: 'AI-powered Engineering & Consulting Intelligence Assistant for Dillon Consulting Limited - Expert in engineering project management, environmental sciences, infrastructure planning, contract lifecycle management, regulatory compliance, and multi-disciplinary project coordination. Leveraging 75+ years of institutional knowledge and 1,100+ employees\' expertise across Canada to make life work better.'
  }
}

// Legacy export for backwards compatibility
export const SCC_BRAND: BrandConfig = DILLON_BRAND
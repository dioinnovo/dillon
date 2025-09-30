import { BrandConfig } from '../types/brand'
import { SCC_BRAND_RED, SCC_SECONDARY, SCC_SUCCESS } from './colors'

export const SCC_BRAND: BrandConfig = {
  name: 'Strategic Claim Consultants',
  logo: '/images/scc_logo.png',
  colors: {
    primary: SCC_BRAND_RED, // #9A2824 - Use sparingly for logos and key CTAs
    secondary: SCC_SECONDARY, // #707070 - Professional Gray
    success: SCC_SUCCESS // #00A651 - Green for positive metrics
  },
  ai: {
    name: 'Scotty',
    persona: 'Strategic Claims Operations & Technical Tracker - Property claims expert for Strategic Claim Consultants, specializing in both residential and commercial properties with expertise in large-loss commercial claims ($1M+), CAT claims, and business interruption. Leverages SCC\'s $2 billion in recovered settlements.'
  }
}
// Brand Colors (Use Sparingly)
export const SCC_BRAND_RED = '#9A2824' // SCC Deep Red - logos, key CTAs only
export const SCC_BRAND_RED_HOVER = '#7A1F1C' // Darker Red for hover states

// UI Foundation Colors (Primary Usage)
export const SCC_UI_PRIMARY = '#2B2B2B' // Dark Gray - main buttons, headers
export const SCC_SECONDARY = '#707070' // Professional Gray - secondary actions
export const SCC_TEXT_PRIMARY = '#2B2B2B' // Dark Gray Text
export const SCC_TEXT_SECONDARY = '#707070' // Gray Text
export const SCC_BACKGROUND = '#F5F5F5' // Light Gray Background
export const SCC_SURFACE = '#FFFFFF' // White for cards
export const SCC_BORDER = '#E0E0E0' // Light Gray borders

// Gray Scale for UI Foundation
export const SCC_GRAY_900 = '#1A1A1A' // Darkest
export const SCC_GRAY_800 = '#2B2B2B'
export const SCC_GRAY_700 = '#404040'
export const SCC_GRAY_600 = '#525252'
export const SCC_GRAY_500 = '#707070'
export const SCC_GRAY_400 = '#A0A0A0'
export const SCC_GRAY_300 = '#D0D0D0'
export const SCC_GRAY_200 = '#E0E0E0'
export const SCC_GRAY_100 = '#F5F5F5'
export const SCC_GRAY_50 = '#F9FAFB' // Lightest

// Semantic Colors
export const SCC_SUCCESS = '#00A651' // Green for positive metrics
export const SCC_WARNING = '#F59E0B' // Amber for warnings
export const SCC_ERROR = '#DC2626' // True Red for errors only (not brand red)
export const SCC_INFO = '#3B82F6' // Blue for information

// Exported color object for easier access
export const SCC_COLORS = {
  // Brand Colors (Use Sparingly)
  brand: {
    primary: SCC_BRAND_RED,
    primaryHover: SCC_BRAND_RED_HOVER
  },
  // UI Foundation
  ui: {
    primary: SCC_UI_PRIMARY,
    secondary: SCC_SECONDARY,
    textPrimary: SCC_TEXT_PRIMARY,
    textSecondary: SCC_TEXT_SECONDARY,
    background: SCC_BACKGROUND,
    surface: SCC_SURFACE,
    border: SCC_BORDER
  },
  // Gray Scale
  gray: {
    900: SCC_GRAY_900,
    800: SCC_GRAY_800,
    700: SCC_GRAY_700,
    600: SCC_GRAY_600,
    500: SCC_GRAY_500,
    400: SCC_GRAY_400,
    300: SCC_GRAY_300,
    200: SCC_GRAY_200,
    100: SCC_GRAY_100,
    50: SCC_GRAY_50
  },
  // Semantic
  semantic: {
    success: SCC_SUCCESS,
    warning: SCC_WARNING,
    error: SCC_ERROR,
    info: SCC_INFO
  }
}
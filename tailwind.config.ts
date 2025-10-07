import type { Config } from 'tailwindcss'
const defaultTheme = require('tailwindcss/defaultTheme')

const config: Config = {
  darkMode: "class",
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'tablet': '820px', // iPad Mini
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Dillon Brand Colors - Professional & Minimalist
        dillon: {
          // Primary Brand Colors
          green: "#08353F", // Primary Dillon Green (dark teal/forest green)
          "green-dark": "#06252B", // Darker green for hover states
          "green-light": "#0A4550", // Lighter green for backgrounds

          // UI Foundation Colors (Primary Usage)
          "ui-primary": "#08353F", // Dillon Green for main UI
          gray: "#707070", // Professional Gray - secondary actions
          "gray-dark": "#2B2B2B", // Dark Gray Text
          "gray-light": "#F9FAFB", // Light Gray Background

          // Gray Scale
          "gray-900": "#1A1A1A",
          "gray-800": "#2B2B2B",
          "gray-700": "#404040",
          "gray-600": "#525252",
          "gray-500": "#707070",
          "gray-400": "#A0A0A0",
          "gray-300": "#D0D0D0",
          "gray-200": "#E0E0E0",
          "gray-100": "#F9FAFB",
          "gray-50": "#FCFCFC",

          // Semantic Colors
          success: "#00A651", // Green for positive metrics
          warning: "#F59E0B", // Amber for warnings
          error: "#DC2626", // Red for errors
          info: "#3B82F6" // Blue for information
        },
        // Legacy SCC colors (kept for backwards compatibility during migration)
        scc: {
          red: "#08353F", // Redirected to Dillon green
          "red-hover": "#06252B",
          "ui-primary": "#08353F",
          gray: "#707070",
          "gray-dark": "#2B2B2B",
          "gray-light": "#F9FAFB",
          "gray-900": "#1A1A1A",
          "gray-800": "#2B2B2B",
          "gray-700": "#404040",
          "gray-600": "#525252",
          "gray-500": "#707070",
          "gray-400": "#A0A0A0",
          "gray-300": "#D0D0D0",
          "gray-200": "#E0E0E0",
          "gray-100": "#F9FAFB",
          "gray-50": "#FCFCFC",
          success: "#00A651",
          warning: "#F59E0B",
          error: "#DC2626",
          info: "#3B82F6"
        },
      },
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      padding: {
        'safe': 'env(safe-area-inset-bottom)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
export default config
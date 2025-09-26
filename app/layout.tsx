import type { Metadata, Viewport } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import DisableGrammarly from '@/components/DisableGrammarly'
import { ThemeProvider } from '@/contexts/theme-provider'

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: 'SCC Intelligence Platform',
  description: 'AI-Powered Commercial Property Claims',
  keywords: 'insurance, claims, AI, public adjusting, settlement, damage assessment',
  authors: [{ name: 'Strategic Claim Consultants' }],
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'SCC Intelligence Platform',
    description: 'Find $80,000+ in Overlooked Coverage in 3 Minutes',
    type: 'website',
    locale: 'en_US',
    siteName: 'SCC Intelligence Platform',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={montserrat.variable}>
      <body className={`${montserrat.className} font-sans`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange={false}
        >
          <DisableGrammarly />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
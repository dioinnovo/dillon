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
  title: 'Dillon AI Intelligence Platform',
  description: 'AI-Powered Engineering & Consulting Project Intelligence',
  keywords: 'engineering, environmental consulting, AI, project management, infrastructure, planning, Phase II ESA',
  authors: [{ name: 'Dillon Consulting Limited' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Dillon AI Intelligence Platform',
    description: 'AI-powered engineering and consulting project intelligence - streamlining operations and accelerating project lifecycles',
    type: 'website',
    locale: 'en_US',
    siteName: 'Dillon AI Intelligence Platform',
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
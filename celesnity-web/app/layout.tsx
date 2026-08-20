import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Libre_Caslon_Display, Roboto_Mono } from 'next/font/google'
import './globals.css'

const inter = localFont({
  src: [
    { path: './fonts/InterVariable.woff2', style: 'normal' },
  ],
  variable: '--font-inter',
  display: 'swap',
})

const display = Libre_Caslon_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-instrument',
  display: 'swap',
})

const mono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.celesnity.com'),
  title: 'Celesnity — Industrial intelligence for the physical world',
  description: 'Celesnity builds industrial intelligence through Minder Platform, Minder Hardware and Minder Research.',
  alternates: { canonical: '/' },
  icons: { icon: '/brand/orbit-ink.png', apple: '/brand/orbit-ink.png' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Celesnity',
    title: 'Industrial intelligence for the physical world',
    description: 'Platform to coordinate. Hardware to stay present. A world model that learns.',
    images: [{ url: '/og.png', width: 1672, height: 941, alt: 'Celesnity celestial field' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Industrial intelligence for the physical world',
    description: 'Platform to coordinate. Hardware to stay present. A world model that learns.',
    images: ['/og.png'],
  },
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#030813' }

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.celesnity.com/#organization',
      name: 'Celesnity',
      url: 'https://www.celesnity.com/',
      email: 'start@celesnity.com',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.celesnity.com/#website',
      url: 'https://www.celesnity.com/',
      name: 'Celesnity',
      publisher: { '@id': 'https://www.celesnity.com/#organization' },
    },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  )
}

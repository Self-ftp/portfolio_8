import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

// Шрифты ставятся через npm и раздаются с вашего домена —
// ни одного запроса на сторонние CDN, ничего не «мигает».
import '@fontsource-variable/inter-tight'
import '@fontsource-variable/jetbrains-mono'
import '@/styles/globals.css'

import { AppShell } from '@/components/layout/AppShell'
import { PersonJsonLd } from '@/components/seo/PersonJsonLd'
import { profile } from '@/content/profile'
import { siteUrl } from '@/lib/site'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: { canonical: '/' },
  title: {
    default: profile.seo.title,
    template: `%s — ${profile.name}`,
  },
  description: profile.seo.description,
  openGraph: {
    type: 'website',
    title: profile.seo.title,
    description: profile.seo.description,
    siteName: profile.name,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: profile.seo.title,
    description: profile.seo.description,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#f6f6f4',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <PersonJsonLd />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}

import type { MetadataRoute } from 'next'
import { profile } from '@/content/profile'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: profile.seo.title,
    short_name: profile.name,
    description: profile.seo.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#f6f6f4',
    theme_color: '#f6f6f4',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  }
}

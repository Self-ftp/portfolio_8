import { profile } from '@/content/profile'
import { OG_SIZE, renderOgImage } from '@/lib/og'

export const size = OG_SIZE
export const contentType = 'image/png'
export const alt = `${profile.name} — ${profile.role}`

export default function Image() {
  return renderOgImage({ title: profile.name, subtitle: profile.role })
}

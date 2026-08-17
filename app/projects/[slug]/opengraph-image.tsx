import { getProject, publishedProjects } from '@/content/projects'
import { profile } from '@/content/profile'
import { OG_SIZE, renderOgImage } from '@/lib/og'

export const size = OG_SIZE
export const contentType = 'image/png'

export function generateStaticParams() {
  return publishedProjects.map((project) => ({ slug: project.slug }))
}

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)
  return [{ alt: project ? `${project.name} — ${profile.name}` : profile.name }]
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProject(slug)

  return renderOgImage({
    eyebrow: project?.category,
    title: project?.name ?? profile.name,
    subtitle: profile.name,
  })
}

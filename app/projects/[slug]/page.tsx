import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArchivePage } from '@/components/project/ArchivePage'
import { CaseStudy } from '@/components/project/CaseStudy'
import { identities } from '@/content/identities'
import { profile } from '@/content/profile'
import { getProject, getProjectNeighbours, publishedProjects } from '@/content/projects'
import { visualWork } from '@/content/visualWorks'
import { getGalleryOverrides } from '@/lib/admin/gallery-store'
import type { ArchiveGroup } from '@/lib/types'

type Params = { params: Promise<{ slug: string }> }

/** Архивы, привязанные к проектам с kind: 'gallery'. */
const ARCHIVES: Record<string, ArchiveGroup> = {
  identities,
  'visual-work': visualWork,
}

/** Страницы собираются статически из данных: добавили проект —
 *  маршрут появился сам. */
export function generateStaticParams() {
  return publishedProjects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}

  return {
    title: project.name,
    description: project.shortDescription,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: 'article',
      title: `${project.name} — ${profile.name}`,
      description: project.shortDescription,
      url: `/projects/${project.slug}`,
      // Картинку подставляет app/projects/[slug]/opengraph-image.tsx
      // по файловой конвенции Next.js — вручную указывать images
      // здесь не нужно (и раньше здесь была ссылка на несуществующий
      // /og-image.png, которую эта конвенция и должна была заменить).
    },
  }
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const { prev, next } = getProjectNeighbours(slug)

  if (project.kind === 'gallery') {
    const group = ARCHIVES[project.slug]
    if (!group) notFound()
    return <ArchivePage project={project} group={group} prev={prev} next={next} />
  }

  return <CaseStudy project={await withGalleryOverrides(project)} prev={prev} next={next} />
}

/** Дописывает к статичной галерее проекта фото, добавленные через
 *  /admin. Читается один раз при статической сборке страницы —
 *  соответствует выбранной модели «изменения после пересборки»,
 *  без превращения статических страниц в динамические. */
async function withGalleryOverrides(project: NonNullable<ReturnType<typeof getProject>>) {
  const extra = await getGalleryOverrides(project.slug)
  if (extra.length === 0) return project
  return { ...project, gallery: [...project.gallery, ...extra] }
}

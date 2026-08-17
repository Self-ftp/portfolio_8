import type { MetadataRoute } from 'next'
import { publishedProjects } from '@/content/projects'
import { siteUrl } from '@/lib/site'

/** Собирается из данных: опубликовали проект — он появился
 *  в карте сайта сам. published: false исключает его отовсюду. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    { url: `${siteUrl}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...publishedProjects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
  ]
}

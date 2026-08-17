import { Redis } from '@upstash/redis'
import type { Media } from '@/lib/types'

/**
 * Хранилище фото, добавленных через /admin, — отдельно от
 * content/*.ts. Основная композиция сайта (обложки, showcase на
 * HOME) остаётся ручной редакторской работой в content-файлах;
 * через админку управляются только галереи внутри кейсов
 * (project.gallery) — это её собственное, предназначенное для
 * расширения поле.
 *
 * Redis-ключ на проект: `gallery:<slug>` → JSON-массив GalleryPhoto.
 *
 * Если переменные окружения не настроены (например, локальная
 * разработка без подключённого Redis) — все функции возвращают
 * пустой результат вместо падения. Сайт и `npm run build`
 * продолжают работать без единой настроенной интеграции.
 */

export type GalleryPhoto = {
  /** URL в Vercel Blob. */
  url: string
  alt: string
  /** Ключ blob-объекта — нужен, чтобы физически удалить файл. */
  blobPathname: string
  uploadedAt: string
}

function getClient(): Redis | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null
  return new Redis({ url, token })
}

const key = (slug: string) => `gallery:${slug}`

/** Список фото, добавленных через админку, для конкретного проекта. */
export async function getGalleryPhotos(slug: string): Promise<GalleryPhoto[]> {
  const client = getClient()
  if (!client) return []
  try {
    const list = await client.get<GalleryPhoto[]>(key(slug))
    return list ?? []
  } catch {
    // Redis временно недоступен — сайт не должен падать из-за этого.
    return []
  }
}

/** То же самое, но сразу в формате Media — для рендера на странице кейса. */
export async function getGalleryOverrides(slug: string): Promise<Media[]> {
  const photos = await getGalleryPhotos(slug)
  return photos.map((p) => ({ src: p.url, alt: p.alt }))
}

export async function addGalleryPhoto(slug: string, photo: GalleryPhoto): Promise<void> {
  const client = getClient()
  if (!client) throw new Error('Redis не настроен — см. .env.example')
  const current = await getGalleryPhotos(slug)
  await client.set(key(slug), [...current, photo])
}

export async function removeGalleryPhoto(slug: string, blobPathname: string): Promise<void> {
  const client = getClient()
  if (!client) throw new Error('Redis не настроен — см. .env.example')
  const current = await getGalleryPhotos(slug)
  await client.set(
    key(slug),
    current.filter((p) => p.blobPathname !== blobPathname),
  )
}

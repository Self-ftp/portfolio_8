'use server'

import { del, put } from '@vercel/blob'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { addGalleryPhoto, getGalleryPhotos, removeGalleryPhoto } from '@/lib/admin/gallery-store'
import { ADMIN_COOKIE } from '@/lib/admin/constants'

export async function login(formData: FormData) {
  const password = String(formData.get('password') ?? '')
  const expected = process.env.ADMIN_PASSWORD

  if (!expected || password !== expected) {
    redirect('/admin/login?error=1')
  }

  const jar = await cookies()
  jar.set(ADMIN_COOKIE, expected, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 дней
  })
  redirect('/admin')
}

export async function logout() {
  const jar = await cookies()
  jar.delete(ADMIN_COOKIE)
  redirect('/admin/login')
}

/** Запускает пересборку на Vercel через Deploy Hook.
 *  Без него загруженное фото останется лежать в Blob/Redis,
 *  но не появится на сайте — сайт статический, ему нужна пересборка. */
async function triggerRebuild() {
  const hook = process.env.VERCEL_DEPLOY_HOOK_URL
  if (!hook) return { rebuildTriggered: false }
  try {
    await fetch(hook, { method: 'POST' })
    return { rebuildTriggered: true }
  } catch {
    return { rebuildTriggered: false }
  }
}

export async function uploadPhoto(slug: string, formData: FormData) {
  const file = formData.get('file')
  if (!(file instanceof File) || file.size === 0) {
    return { ok: false as const, error: 'Файл не выбран.' }
  }
  if (!file.type.startsWith('image/')) {
    return { ok: false as const, error: 'Это не изображение.' }
  }

  const blob = await put(`gallery/${slug}/${Date.now()}-${file.name}`, file, {
    access: 'public',
  })

  await addGalleryPhoto(slug, {
    url: blob.url,
    alt: `${slug} — gallery photo`,
    blobPathname: blob.pathname,
    uploadedAt: new Date().toISOString(),
  })

  revalidatePath('/admin')
  const { rebuildTriggered } = await triggerRebuild()
  const photos = await getGalleryPhotos(slug)
  return { ok: true as const, rebuildTriggered, photos }
}

export async function deletePhoto(slug: string, blobPathname: string, url: string) {
  await removeGalleryPhoto(slug, blobPathname)
  try {
    await del(url)
  } catch {
    // Файл в Blob уже мог быть удалён вручную — не блокируем на этом.
  }

  revalidatePath('/admin')
  const { rebuildTriggered } = await triggerRebuild()
  return { ok: true as const, rebuildTriggered }
}

export async function listPhotos(slug: string) {
  return getGalleryPhotos(slug)
}

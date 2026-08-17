'use client'

import { useRef, useState, useTransition } from 'react'
import { deletePhoto, uploadPhoto } from '@/app/admin/actions'
import type { GalleryPhoto } from '@/lib/admin/gallery-store'
import type { Project } from '@/lib/types'
import styles from './admin.module.css'

type Props = {
  project: Project
  initialPhotos: GalleryPhoto[]
}

export function ProjectGallery({ project, initialPhotos }: Props) {
  const [photos, setPhotos] = useState(initialPhotos)
  const [message, setMessage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const fileInput = useRef<HTMLInputElement>(null)

  const handleUpload = (formData: FormData) => {
    startTransition(async () => {
      setMessage(null)
      const result = await uploadPhoto(project.slug, formData)
      if (!result.ok) {
        setMessage(result.error)
        return
      }
      // Оптимистично не подставляем — result уже содержит свежий
      // список с сервера (актуальный источник истины — Redis).
      setPhotos(result.photos)
      fileInput.current?.form?.reset()
      setMessage(
        result.rebuildTriggered
          ? 'Загружено. Сайт пересобирается — обновится через 5–10 сек.'
          : 'Загружено. Deploy Hook не настроен — пересоберите сайт вручную (Vercel → Deployments → Redeploy).',
      )
    })
  }

  const handleDelete = (photo: GalleryPhoto) => {
    startTransition(async () => {
      setMessage(null)
      await deletePhoto(project.slug, photo.blobPathname, photo.url)
      setPhotos((prev) => prev.filter((p) => p.blobPathname !== photo.blobPathname))
      setMessage('Удалено.')
    })
  }

  return (
    <section className={styles.project}>
      <h2 className="t-meta">{project.name}</h2>

      <div className={styles.grid}>
        {photos.map((photo) => (
          // eslint-disable-next-line @next/next/no-img-element
          <div key={photo.blobPathname} className={styles.thumb}>
            <img src={photo.url} alt={photo.alt} />
            <button
              type="button"
              className={styles.deleteButton}
              disabled={isPending}
              onClick={() => handleDelete(photo)}
            >
              Delete
            </button>
          </div>
        ))}
        {photos.length === 0 && <p className={styles.empty}>Нет добавленных фото.</p>}
      </div>

      <form
        className={styles.uploadForm}
        action={handleUpload}
        onSubmit={() => setMessage(null)}
      >
        <input ref={fileInput} type="file" name="file" accept="image/*" required />
        <button type="submit" disabled={isPending}>
          {isPending ? 'Загрузка…' : 'Upload'}
        </button>
      </form>

      {message && <p className={styles.message}>{message}</p>}
    </section>
  )
}

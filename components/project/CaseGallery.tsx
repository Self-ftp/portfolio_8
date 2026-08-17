'use client'

import { useState } from 'react'
import { Lightbox } from '@/components/gallery/Lightbox'
import { MediaFrame } from '@/components/ui/MediaFrame'
import type { Media } from '@/lib/types'
import styles from './CaseGallery.module.css'

/** Галерея внутри кейса. Открывается тем же просмотром, что и
 *  архивы, — отдельного механизма для этого заводить незачем. */
export function CaseGallery({ items, title }: { items: Media[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <>
      <div className={styles.grid}>
        {items.map((media, i) => (
          <button
            key={media.src ?? i}
            type="button"
            className={styles.item}
            onClick={() => setOpen(i)}
            aria-label={`${title} — open image ${i + 1} full size`}
          >
            <MediaFrame media={media} sizes="(max-width: 767px) 50vw, 30vw" />
          </button>
        ))}
      </div>

      {open !== null && (
        <Lightbox
          items={items.map((media) => ({ media, title }))}
          index={open}
          onClose={() => setOpen(null)}
          onNavigate={setOpen}
        />
      )}
    </>
  )
}

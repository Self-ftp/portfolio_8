'use client'

import { useMemo, useState } from 'react'
import { MediaFrame } from '@/components/ui/MediaFrame'
import { Reveal } from '@/components/ui/Reveal'
import type { ArchiveItem } from '@/lib/types'
import { CompareSlider } from './CompareSlider'
import { Lightbox, type LightboxItem } from './Lightbox'
import styles from './ArchiveGrid.module.css'

/**
 * Курируемый архив работ.
 *
 * Каждая работа — отдельная единица с названием и нейтральной
 * категорией, а не безымянная плитка. Пары «до/после»
 * показываются сравнением, дополнительные кропы — узкой лентой
 * под основным кадром.
 */
export function ArchiveGrid({ items }: { items: ArchiveItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  // Плоский список для просмотра: основной кадр каждой работы
  // плюс её дополнительные кадры, в том же порядке.
  const { lightboxItems, firstIndexOf } = useMemo(() => {
    const flat: LightboxItem[] = []
    const map = new Map<string, number>()

    for (const item of items) {
      map.set(item.id, flat.length)
      flat.push({ media: item.media, title: item.title, category: item.category })
      for (const media of item.related ?? []) {
        flat.push({ media, title: item.title, category: item.category })
      }
    }
    return { lightboxItems: flat, firstIndexOf: map }
  }, [items])

  return (
    <>
      <div className={styles.grid}>
        {items.map((item, i) => (
          <Reveal key={item.id} className={styles.item} delay={(i % 3) * 60}>
            {item.compare ? (
              <CompareSlider
                before={item.compare.before}
                after={item.compare.after}
                ratio={item.media.ratio}
              />
            ) : (
              <button
                type="button"
                className={styles.trigger}
                onClick={() => setOpen(firstIndexOf.get(item.id) ?? 0)}
                aria-label={`${item.title} — open full size`}
              >
                <MediaFrame media={item.media} sizes="(max-width: 767px) 100vw, 45vw" />
              </button>
            )}

            <div className={styles.caption}>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={`t-meta ${styles.category}`}>
                {item.category}
                {item.year ? ` — ${item.year}` : ''}
              </p>
            </div>

            {item.note && <p className={`t-meta ${styles.note}`}>{item.note}</p>}

            {item.related && item.related.length > 0 && (
              <div className={styles.related}>
                {item.related.map((media, r) => (
                  <button
                    key={media.src ?? r}
                    type="button"
                    className={styles.relatedItem}
                    onClick={() => setOpen((firstIndexOf.get(item.id) ?? 0) + r + 1)}
                    aria-label={`${item.title} — additional image ${r + 1}`}
                  >
                    <MediaFrame media={media} sizes="20vw" />
                  </button>
                ))}
              </div>
            )}
          </Reveal>
        ))}
      </div>

      {open !== null && (
        <Lightbox
          items={lightboxItems}
          index={open}
          onClose={() => setOpen(null)}
          onNavigate={setOpen}
        />
      )}
    </>
  )
}

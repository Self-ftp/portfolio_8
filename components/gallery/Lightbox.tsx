'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef } from 'react'
import { useLockScroll } from '@/hooks/useLockScroll'
import type { Media } from '@/lib/types'
import styles from './Lightbox.module.css'

export type LightboxItem = {
  media: Media
  title?: string
  category?: string
}

type Props = {
  items: LightboxItem[]
  index: number
  onClose: () => void
  onNavigate: (index: number) => void
}

/** Порог свайпа в пикселях — ниже него жест считается случайным. */
const SWIPE_THRESHOLD = 48

/**
 * Полноэкранный просмотр.
 *
 * Написан вручную, без библиотеки: нужен минимальный интерфейс
 * и полный контроль над клавиатурой, а готовые лайтбоксы весят
 * больше, чем весь остальной JS страницы.
 */
export function Lightbox({ items, index, onClose, onNavigate }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const startX = useRef(0)
  const startY = useRef(0)

  useLockScroll(true)

  const item = items[index]
  const total = items.length

  const go = useCallback(
    (delta: number) => onNavigate((index + delta + total) % total),
    [index, total, onNavigate],
  )

  useEffect(() => {
    const node = ref.current
    node?.querySelector<HTMLButtonElement>('button')?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose()
      if (e.key === 'ArrowRight') return go(1)
      if (e.key === 'ArrowLeft') return go(-1)

      // Пока просмотр открыт, фокус не должен уходить на страницу под ним.
      if (e.key !== 'Tab' || !node) return
      const focusable = Array.from(node.querySelectorAll<HTMLElement>('button'))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [go, onClose])

  if (!item?.media.src) return null

  return (
    <div
      ref={ref}
      className={styles.root}
      role="dialog"
      aria-modal="true"
      aria-label={item.title ?? 'Image viewer'}
      onPointerDown={(e) => {
        startX.current = e.clientX
        startY.current = e.clientY
      }}
      onPointerUp={(e) => {
        const dx = e.clientX - startX.current
        const dy = e.clientY - startY.current
        // Горизонтальность жеста проверяется явно, иначе
        // вертикальный свайп случайно листал бы галерею.
        if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
          go(dx < 0 ? 1 : -1)
        }
      }}
    >
      <div className={styles.bar}>
        <span className={`t-meta ${styles.counter}`}>
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <button type="button" className={styles.close} onClick={onClose}>
          <span className="t-meta">Close</span>
          <span aria-hidden="true">×</span>
        </button>
      </div>

      <div className={styles.stage}>
        {total > 1 && (
          <button
            type="button"
            className={`${styles.nav} ${styles.prev}`}
            onClick={() => go(-1)}
            aria-label="Previous image"
          >
            <svg className={styles.navIcon} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 4 7 12l8 8" strokeLinecap="square" />
            </svg>
          </button>
        )}

        <div className={styles.frame}>
          <Image
            key={item.media.src}
            className={styles.image}
            src={item.media.src}
            alt={item.media.alt}
            width={1280}
            height={1280}
            sizes="100vw"
            placeholder={item.media.blurDataURL ? 'blur' : 'empty'}
            blurDataURL={item.media.blurDataURL}
            priority
          />
        </div>

        {total > 1 && (
          <button
            type="button"
            className={`${styles.nav} ${styles.next}`}
            onClick={() => go(1)}
            aria-label="Next image"
          >
            <svg className={styles.navIcon} viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 4l8 8-8 8" strokeLinecap="square" />
            </svg>
          </button>
        )}
      </div>

      {(item.title || item.category) && (
        <div className={`t-meta ${styles.caption}`}>
          {item.title && <span className={styles.captionTitle}>{item.title}</span>}
          {item.category && <span>{item.category}</span>}
        </div>
      )}
    </div>
  )
}

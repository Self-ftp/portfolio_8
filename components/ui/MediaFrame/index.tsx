'use client'

import Image from 'next/image'
import type { CSSProperties } from 'react'
import { useInView } from '@/hooks/useInView'
import type { Media } from '@/lib/types'
import styles from './MediaFrame.module.css'

type Props = {
  media: Media
  /** Подсказка браузеру, какой ширины файл понадобится. */
  sizes?: string
  /** true только для изображения над сгибом — оно грузится сразу. */
  priority?: boolean
  className?: string
  /** Для PNG с прозрачностью (вырезанный силуэт без фона):
   *  без crop, без серой подложки под кадром — картинка "плавает"
   *  поверх фона секции вместо привычного прямоугольного кадра. */
  transparent?: boolean
}

/**
 * Единственное место, где решается «изображение или плейсхолдер».
 *
 * Пропорции задаются всегда, поэтому layout не прыгает ни при
 * загрузке, ни при отсутствии файла: сайт можно собирать
 * полностью до появления финальных картинок.
 *
 * Изображение никогда не растягивается: object-fit: cover плюс
 * настраиваемая точка фокуса. Если кадр плохо переживает обрезку,
 * правильный ответ — поменять ratio у конкретного медиа, а не
 * искажать пропорции.
 */
export function MediaFrame({
  media,
  sizes = '100vw',
  priority = false,
  className,
  transparent = false,
}: Props) {
  const { ref, inView } = useInView<HTMLDivElement>(0.1)

  const ratio = (media.ratio ?? '16/9').replace('/', ' / ')
  const ratioMobile = media.ratioMobile?.replace('/', ' / ')

  const vars = {
    '--ratio': ratio,
    ...(ratioMobile ? { '--ratio-mobile': ratioMobile } : {}),
    ...(media.focus ? { '--focus': media.focus } : {}),
  } as CSSProperties

  return (
    <figure className={className}>
      <div
        ref={ref}
        className={[
          styles.frame,
          transparent && styles.transparent,
          styles.reveal,
          inView && styles.visible,
        ]
          .filter(Boolean)
          .join(' ')}
        style={vars}
      >
        <div className={styles.inner}>
          {media.src ? (
            <Image
              className={styles.image}
              src={media.src}
              alt={media.alt}
              fill
              sizes={sizes}
              priority={priority}
              // Всё, что не над сгибом, грузится лениво.
              loading={priority ? undefined : 'lazy'}
              placeholder={media.blurDataURL ? 'blur' : 'empty'}
              blurDataURL={media.blurDataURL}
            />
          ) : (
            <div className={styles.placeholder}>
              <span className={`t-meta ${styles.placeholderLabel}`}>{media.alt}</span>
              <span className={`t-meta ${styles.placeholderRatio}`}>
                Visual to be added — {media.ratio ?? '16/9'}
              </span>
            </div>
          )}
        </div>
      </div>

      {media.caption && (
        <figcaption className={`t-meta ${styles.caption}`}>{media.caption}</figcaption>
      )}
    </figure>
  )
}

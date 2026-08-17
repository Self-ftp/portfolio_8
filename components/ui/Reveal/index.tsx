'use client'

import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'
import styles from './Reveal.module.css'

type RevealProps = {
  children: ReactNode
  /** Задержка в миллисекундах — ручной стаггер соседних блоков. */
  delay?: number
  className?: string
}

/** Появление блока: прозрачность + подъём. */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={[styles.reveal, inView && styles.visible, className].filter(Boolean).join(' ')}
      style={{ '--delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}

type RevealLinesProps = {
  lines: readonly string[]
  /** Уровень заголовка выбирается по месту в структуре документа. */
  as?: 'h1' | 'h2' | 'h3' | 'p'
  id?: string
  className?: string
  delay?: number
}

/**
 * Построчный заголовок со стаггером.
 *
 * Строки выезжают из-под маски, а не просто проявляются: на крупной
 * editorial-типографике это единственное движение, которое читается
 * в таком размере и не выглядит эффектом ради эффекта.
 */
export function RevealLines({ lines, as: Tag = 'h2', id, className, delay = 0 }: RevealLinesProps) {
  const { ref, inView } = useInView<HTMLHeadingElement>()

  return (
    <Tag
      ref={ref}
      id={id}
      className={[styles.lines, inView && styles.visible, className].filter(Boolean).join(' ')}
    >
      {lines.map((line, i) => (
        <span key={line + i} className={styles.lineMask}>
          <span className={styles.line} style={{ transitionDelay: `${delay + i * 70}ms` } as CSSProperties}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}

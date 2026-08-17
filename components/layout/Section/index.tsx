import type { ReactNode } from 'react'
import styles from './Section.module.css'

type Props = {
  id: string
  /** Заголовок секции нужен для aria-labelledby и структуры документа. */
  labelledBy?: string
  children: ReactNode
  flush?: boolean
  divider?: boolean
  className?: string
}

export function Section({ id, labelledBy, children, flush, divider, className }: Props) {
  const cls = [styles.section, flush && styles.flush, divider && styles.divider, className]
    .filter(Boolean)
    .join(' ')
  return (
    <section id={id} aria-labelledby={labelledBy} className={cls}>
      {children}
    </section>
  )
}

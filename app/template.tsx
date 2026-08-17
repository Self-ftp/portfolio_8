import type { ReactNode } from 'react'
import styles from './template.module.css'

/**
 * template.tsx перемонтируется при каждой навигации (в отличие
 * от layout), поэтому анимация входа запускается сама, без
 * состояния и без сторонних библиотек.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <>
      <div className={styles.panel} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
    </>
  )
}

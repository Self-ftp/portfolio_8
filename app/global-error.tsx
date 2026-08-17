'use client'

import styles from './global-error.module.css'

/**
 * Перехватывает ошибки, которые ломают даже корневой layout —
 * единственное место в App Router, где нельзя рассчитывать на
 * обычные стили и компоненты (root layout мог не отрендериться),
 * поэтому здесь всё написано инлайново и без внешних зависимостей.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body>
        <div className={styles.page}>
          <p style={{ fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8a8a88' }}>
            Something went wrong
          </p>
          <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em' }}>
            This page hit an unexpected error.
          </h1>
          <p className={styles.lead}>
            Try reloading the page. If the problem persists, come back a little later.
          </p>
          <button className={styles.button} onClick={() => reset()}>
            Try again
          </button>
        </div>
      </body>
    </html>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { useScene } from './scene-context'
import { useLockScroll } from '@/hooks/useLockScroll'
import styles from './Loader.module.css'

/** Максимум, сколько пользователь вообще может ждать. */
const HARD_TIMEOUT = 1800
const FADE_OUT = 450
const SESSION_KEY = 'ak-loaded'

/**
 * Лоадер показывается только при первом заходе в сессии и только
 * пока компилируются шейдеры стекла. Жёсткий таймаут гарантирует,
 * что он уйдёт в любом случае: ждать красивую анимацию
 * пользователь не должен.
 */
export function Loader({ needed }: { needed: boolean }) {
  const { ready } = useScene()
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)
  const start = useRef(0)

  useLockScroll(visible)

  useEffect(() => {
    setMounted(true)
    if (!needed) return

    let seen = false
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === '1'
    } catch {
      // Приватный режим может запрещать хранилище — тогда просто
      // показываем лоадер, это не критично.
    }
    if (seen) return

    setVisible(true)
    start.current = performance.now()
  }, [needed])

  useEffect(() => {
    if (!visible) return

    let frame = 0
    const tick = () => {
      const elapsed = performance.now() - start.current
      // Прогресс отражает реальное ожидание, а не выдуманную анимацию:
      // как только сцена готова, счётчик прыгает к 100.
      const value = ready ? 100 : Math.min(96, (elapsed / HARD_TIMEOUT) * 100)
      setProgress(value)

      if (ready || elapsed >= HARD_TIMEOUT) {
        setProgress(100)
        try {
          sessionStorage.setItem(SESSION_KEY, '1')
        } catch {
          /* игнорируем */
        }
        window.setTimeout(() => setVisible(false), FADE_OUT)
        return
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [visible, ready])

  if (!mounted || !visible) return null

  return (
    <div
      className={`${styles.loader} ${progress >= 100 ? styles.hidden : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className={styles.inner}>
        <span className={styles.mark}>A</span>
        <span className={`t-meta ${styles.count}`}>{String(Math.round(progress)).padStart(2, '0')}%</span>
        <span className={styles.bar} aria-hidden="true">
          <span className={styles.fill} style={{ transform: `scaleX(${progress / 100})` }} />
        </span>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Однократное появление в кадре.
 *
 * Наблюдатель отключается сразу после срабатывания: reveal —
 * это вход элемента на сцену, а не постоянный эффект, и держать
 * ради него живой IntersectionObserver на каждом блоке незачем.
 */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Если IntersectionObserver недоступен, показываем сразу:
    // отсутствие анимации лучше, чем невидимый контент.
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setInView(true)
        observer.disconnect()
      },
      { threshold, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

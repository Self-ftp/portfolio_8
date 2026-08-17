'use client'

import Lenis from 'lenis'
import { useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Инерционный скролл. Держит один общий rAF-цикл — позже
 * в него же подключается тик R3F, чтобы 3D и скролл не
 * конкурировали за кадры.
 *
 * При prefers-reduced-motion Lenis не инициализируется вовсе:
 * пользователь получает нативный скролл, а не «сглаженный на 1мс».
 */
export function SmoothScroll() {
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      // На тач-устройствах нативный скролл ощущается лучше системного
      // сглаживания и не ломает pull-to-refresh.
      smoothWheel: true,
    })

    // Якорные ссылки (/#about) и клик по логотипу-«домой», когда вы
    // уже на главной, должны идти через Lenis, а не через нативный
    // мгновенный сброс скролла — раньше клик по имени в шапке на
    // самой главной делал резкий прыжок наверх вместо анимации,
    // хотя весь остальной скролл на сайте плавный.
    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest?.('a')
      if (!anchor) return
      const href = anchor.getAttribute('href') ?? ''

      // Случай 1: якорь на секцию (/#about, #contact и т.п.)
      if (href.includes('#')) {
        const hash = href.slice(href.indexOf('#'))
        if (hash.length < 2) return
        const target = document.querySelector(hash)
        if (!target) return
        e.preventDefault()
        const offset = -parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--header-h'),
          10,
        )
        lenis.scrollTo(target as HTMLElement, { offset })
        history.replaceState(null, '', hash)
        return
      }

      // Случай 2: ссылка на корень ("/") — но мы уже на главной.
      // Next.js в этом случае не меняет маршрут, а просто мгновенно
      // сбрасывает скролл в 0 — здесь же плавно доскроллим наверх.
      if (href === '/' && window.location.pathname === '/') {
        e.preventDefault()
        lenis.scrollTo(0)
      }
    }

    document.addEventListener('click', onAnchorClick)

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      document.removeEventListener('click', onAnchorClick)
      lenis.destroy()
    }
  }, [reduced])

  return null
}

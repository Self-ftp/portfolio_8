'use client'

import { useEffect } from 'react'

/** Блокирует скролл страницы (fullscreen-меню, page transition)
 *  и компенсирует ширину скроллбара, чтобы layout не дёргался. */
export function useLockScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return

    const { body, documentElement } = document
    const prevOverflow = body.style.overflow
    const prevPadding = body.style.paddingRight
    const gap = window.innerWidth - documentElement.clientWidth

    body.style.overflow = 'hidden'
    if (gap > 0) body.style.paddingRight = `${gap}px`
    documentElement.classList.add('lenis-stopped')

    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPadding
      documentElement.classList.remove('lenis-stopped')
    }
  }, [locked])
}

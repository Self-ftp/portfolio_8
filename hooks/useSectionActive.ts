'use client'

import { useEffect, type RefObject } from 'react'

/**
 * Сообщает, находится ли конкретный 3D-вид в кадре.
 *
 * Видимость считается по каждому виду отдельно, поэтому канвас
 * засыпает только когда невидимы все. Запас 200px даёт сцене
 * ожить до появления в кадре — пользователь не видит «прогрев».
 */
export function useSectionActive(
  key: string,
  ref: RefObject<HTMLElement | null>,
  setViewActive: (key: string, visible: boolean) => void,
) {
  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => setViewActive(key, entry.isIntersecting),
      { rootMargin: '200px 0px', threshold: 0 },
    )

    observer.observe(node)
    return () => {
      observer.disconnect()
      setViewActive(key, false)
    }
  }, [key, ref, setViewActive])
}

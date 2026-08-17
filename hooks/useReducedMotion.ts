'use client'

import { useEffect, useState } from 'react'

/** true, если в системе включено «уменьшить движение».
 *  Значение обновляется на лету — пользователь может
 *  переключить настройку не перезагружая страницу. */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  return reduced
}

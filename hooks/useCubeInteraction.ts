'use client'

import { useEffect, type RefObject } from 'react'
import type { CubeInput } from '@/components/three/scene-context'

/** Насколько далеко тач-свайп «докручивает» куб по инерции. */
const DRAG_SENSITIVITY = 0.0038
const MAX_DRAG_VELOCITY = 0.06

/**
 * Ввод для куба.
 *
 * Мышь: положение курсора на экране → цель поворота. Курсор слева
 * от центра — куб доворачивается влево, справа — вправо. Это
 * реакция на направление, а не бесконечное вращение: у поворота
 * есть предел, и при возврате курсора в центр куб возвращается.
 *
 * Тач: перетаскивание задаёт скорость, после отпускания она
 * затухает — привычная инерция броска.
 */
export function useCubeInteraction(
  input: RefObject<CubeInput>,
  trackRef: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    const state = input.current

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return
      state.nx = (e.clientX / window.innerWidth) * 2 - 1
      state.ny = (e.clientY / window.innerHeight) * 2 - 1
      state.lastMove = performance.now()
    }

    // Когда курсор уходит за пределы окна, «застрявший» поворот
    // выглядел бы сломанным — возвращаем куб в покой.
    const onPointerLeave = () => {
      state.nx = 0
      state.ny = 0
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onPointerLeave)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      document.documentElement.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [input])

  useEffect(() => {
    const node = trackRef.current
    if (!node) return
    const state = input.current

    let lastX = 0
    let lastY = 0
    let pointerId: number | null = null

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return
      pointerId = e.pointerId
      lastX = e.clientX
      lastY = e.clientY
      state.dragging = true
      state.dragVX = 0
      state.dragVY = 0
    }

    const onMove = (e: PointerEvent) => {
      if (pointerId !== e.pointerId || !state.dragging) return
      const dx = e.clientX - lastX
      const dy = e.clientY - lastY
      lastX = e.clientX
      lastY = e.clientY

      state.dragVX = clamp(dx * DRAG_SENSITIVITY, MAX_DRAG_VELOCITY)
      state.dragVY = clamp(dy * DRAG_SENSITIVITY * 0.5, MAX_DRAG_VELOCITY * 0.5)
      state.lastMove = performance.now()
    }

    const onUp = (e: PointerEvent) => {
      if (pointerId !== e.pointerId) return
      pointerId = null
      state.dragging = false
    }

    node.addEventListener('pointerdown', onDown, { passive: true })
    node.addEventListener('pointermove', onMove, { passive: true })
    node.addEventListener('pointerup', onUp, { passive: true })
    node.addEventListener('pointercancel', onUp, { passive: true })

    return () => {
      node.removeEventListener('pointerdown', onDown)
      node.removeEventListener('pointermove', onMove)
      node.removeEventListener('pointerup', onUp)
      node.removeEventListener('pointercancel', onUp)
    }
  }, [input, trackRef])
}

function clamp(v: number, limit: number) {
  return Math.max(-limit, Math.min(limit, v))
}

'use client'

import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { Fallback3D } from './Fallback3D'
import { useScene } from './scene-context'
import type { CubeVariant } from './GlassCube'
import { useCubeInteraction } from '@/hooks/useCubeInteraction'
import { useSectionActive } from '@/hooks/useSectionActive'
import styles from './CubeViewport.module.css'

const CubeScene = dynamic(() => import('./CubeScene').then((m) => m.CubeScene), { ssr: false })

type Props = {
  variant: CubeVariant
  /** Подсказка под кубом. На contact-варианте она не нужна. */
  hint?: string
  className?: string
}

/**
 * Прямоугольник на странице, в который проецируется куб.
 * Сам ничего не рисует: отрисовкой занимается общий канвас
 * в оболочке приложения.
 */
export function CubeViewport({ variant, hint, className }: Props) {
  const track = useRef<HTMLDivElement>(null!)
  const { input, setViewActive, settings, reducedMotion } = useScene()

  useCubeInteraction(input, track)
  useSectionActive(variant, track, setViewActive)

  const interactive = settings.resolved && settings.enabled && !reducedMotion

  return (
    <div ref={track} className={[styles.track, className].filter(Boolean).join(' ')}>
      {settings.resolved &&
        (settings.enabled ? (
          <CubeScene
            track={track}
            settings={settings}
            reducedMotion={reducedMotion}
            variant={variant}
          />
        ) : (
          <Fallback3D />
        ))}

      {/* Подсказка живёт в разметке всегда: она часть композиции
          первого экрана, а не признак того, что 3D загрузилось. */}
      {hint && (
        <p className={`t-meta ${styles.hint}`}>
          <span>{interactive ? hint : 'Glass cube'}</span>
          <span className={styles.hintArrow} aria-hidden="true" />
        </p>
      )}
    </div>
  )
}

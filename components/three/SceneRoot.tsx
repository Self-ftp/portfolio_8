'use client'

import { View } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect } from 'react'
import { useScene } from './scene-context'
import type { TierSettings } from '@/hooks/useDeviceTier'
import styles from './SceneRoot.module.css'

/**
 * Один Canvas на всё приложение.
 *
 * Он лежит в оболочке приложения, а секции лишь помечают
 * прямоугольники, куда drei View проецирует сцену. За счёт этого
 * WebGL-контекст не пересоздаётся при переходах между страницами
 * и второй куб в разделе Contact не будет стоить второго контекста.
 *
 * Канвас не перехватывает события: pointer-events: none. Ввод
 * собирают DOM-слушатели, а не raycaster сцены — так дешевле
 * и не ломается скролл.
 */
export function SceneRoot({ settings }: { settings: TierSettings }) {
  const { active, setTabVisible, disable3D, reducedMotion } = useScene()

  useEffect(() => {
    // Во вкладке в фоне рендерить нечего.
    const onVisibility = () => setTabVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [setTabVisible])

  return (
    <Canvas
      className={styles.canvas}
      // frameloop переключается на 'never', когда 3D вне экрана или
      // вкладка неактивна — это главный источник экономии батареи.
      frameloop={reducedMotion ? 'demand' : active ? 'always' : 'never'}
      dpr={settings.dpr}
      gl={{
        antialias: settings.tier === 'high',
        alpha: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: false,
      }}
      eventSource={typeof document !== 'undefined' ? document.body : undefined}
      eventPrefix="client"
      camera={{ position: [0, 0, 6.2], fov: 32 }}
      onCreated={({ gl, invalidate }) => {
        // Потеря контекста (спящий GPU, смена видеокарты, переполнение
        // числа контекстов) не должна оставлять пустой прямоугольник.
        gl.domElement.addEventListener(
          'webglcontextlost',
          (e) => {
            e.preventDefault()
            disable3D()
          },
          { once: true },
        )
        // При frameloop: 'demand' первый кадр нужно запросить явно.
        invalidate()
      }}
    >
      <View.Port />
    </Canvas>
  )
}

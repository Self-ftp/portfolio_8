'use client'

import { Environment, Lightformer } from '@react-three/drei'
import type { Tier } from '@/hooks/useDeviceTier'

/**
 * Студийный свет.
 *
 * Собран из Lightformer вместо HDRI-файла: окружение весит ноль
 * килобайт, не грузится по сети и полностью управляемо. Полосы
 * расставлены как софтбоксы в предметной съёмке — именно они
 * дают на рёбрах куба вытянутые хромовые блики.
 *
 * frames={1} запекает карту окружения один раз: куб вращается,
 * окружение — нет, пересчитывать его каждый кадр незачем.
 */
export function StudioEnv({ tier }: { tier: Tier }) {
  return (
    <Environment resolution={tier === 'high' ? 256 : 128} frames={1}>
      {/* Верхний софтбокс — основной источник, даёт верхнюю кромку. */}
      <Lightformer
        form="rect"
        intensity={5}
        color="#ffffff"
        position={[0, 5, 1]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[8, 6, 1]}
      />

      {/* Боковые полосы — вертикальные блики на гранях. */}
      <Lightformer
        form="rect"
        intensity={3.2}
        color="#ffffff"
        position={[-5, 1, 1]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[10, 3, 1]}
      />
      <Lightformer
        form="rect"
        intensity={3.8}
        color="#ffffff"
        position={[5, 0, 1]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[10, 3, 1]}
      />

      {/* Контровой — отделяет куб от белого фона. */}
      <Lightformer
        form="rect"
        intensity={2.2}
        color="#ffffff"
        position={[0, 0, -6]}
        rotation={[0, Math.PI, 0]}
        scale={[8, 8, 1]}
      />

      {/* Тёмная плашка снизу: без неё стекло на светлом фоне
          теряет объём и выглядит как плоский силуэт. */}
      <Lightformer
        form="rect"
        intensity={0.35}
        color="#8a8a88"
        position={[0, -4, 1]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[8, 6, 1]}
      />
    </Environment>
  )
}

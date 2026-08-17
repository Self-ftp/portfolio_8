'use client'

import { View } from '@react-three/drei'
import type { RefObject } from 'react'
import { GlassCube, type CubeVariant } from './GlassCube'
import type { TierSettings } from '@/hooks/useDeviceTier'

/** Только 3D-часть. Вынесена отдельным модулем, чтобы three.js
 *  грузился ленивым чанком и не попадал в бандл первой загрузки. */
export function CubeScene({
  track,
  settings,
  reducedMotion,
  variant,
}: {
  track: RefObject<HTMLElement>
  settings: TierSettings
  reducedMotion: boolean
  variant: CubeVariant
}) {
  return (
    <View track={track} style={{ width: '100%', height: '100%' }}>
      <GlassCube settings={settings} reducedMotion={reducedMotion} variant={variant} />
    </View>
  )
}

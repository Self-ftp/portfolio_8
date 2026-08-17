'use client'

import { CubeViewport } from './CubeViewport'
import { profile } from '@/content/profile'

/** Главный куб первого экрана. */
export function CubeView() {
  return <CubeViewport variant="hero" hint={profile.hero.hint} />
}

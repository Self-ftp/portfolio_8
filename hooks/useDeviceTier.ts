'use client'

import { useEffect, useState } from 'react'

export type Tier = 'high' | 'mid' | 'low'

export type TierSettings = {
  tier: Tier
  /** Рендерить 3D вообще. При 'low' канвас не монтируется. */
  enabled: boolean
  dpr: [number, number]
  samples: number
  resolution: number
  backside: boolean
  contactShadows: boolean
}

const PRESETS: Record<Tier, Omit<TierSettings, 'tier' | 'enabled'>> = {
  high: { dpr: [1, 1.5], samples: 6, resolution: 512, backside: true, contactShadows: true },
  mid: { dpr: [1, 1], samples: 3, resolution: 256, backside: false, contactShadows: true },
  low: { dpr: [1, 1], samples: 1, resolution: 128, backside: false, contactShadows: false },
}

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
    if (!gl) return false
    // Контекст нужно освободить сразу: браузеры лимитируют их число,
    // и «пробный» контекст может занять слот у основной сцены.
    const lose = (gl as WebGLRenderingContext).getExtension('WEBGL_lose_context')
    lose?.loseContext()
    return true
  } catch {
    return false
  }
}

type NavigatorWithMemory = Navigator & { deviceMemory?: number }

/**
 * Определяет уровень качества один раз при монтировании.
 *
 * До завершения проверки возвращает enabled: false — так первый
 * кадр не уходит в тяжёлую конфигурацию на слабом устройстве,
 * и SSR не расходится с клиентом.
 */
export function useDeviceTier(reducedMotion: boolean): TierSettings & { resolved: boolean } {
  const [state, setState] = useState<{ tier: Tier; enabled: boolean; resolved: boolean }>({
    tier: 'mid',
    enabled: false,
    resolved: false,
  })

  useEffect(() => {
    if (!detectWebGL()) {
      setState({ tier: 'low', enabled: false, resolved: true })
      return
    }

    const nav = navigator as NavigatorWithMemory
    const cores = nav.hardwareConcurrency ?? 4
    const memory = nav.deviceMemory ?? 4
    const coarse = window.matchMedia('(pointer: coarse)').matches
    const narrow = window.innerWidth < 768

    if (memory <= 2 || cores <= 2) {
      setState({ tier: 'low', enabled: false, resolved: true })
      return
    }

    const high = !coarse && !narrow && cores >= 8
    setState({ tier: high ? 'high' : 'mid', enabled: true, resolved: true })
  }, [])

  // Уменьшенное движение не отключает 3D целиком — куб просто
  // застывает в статичном развороте. Убирать его совсем было бы
  // потерей смысла страницы, а не заботой о пользователе.
  const tier = reducedMotion && state.tier === 'high' ? 'mid' : state.tier

  return { tier, enabled: state.enabled, resolved: state.resolved, ...PRESETS[tier] }
}

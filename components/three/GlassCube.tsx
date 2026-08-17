'use client'

import { ContactShadows, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { easing } from 'maath'
import { useEffect, useRef } from 'react'
import type { Group } from 'three'
import { LetterA } from './LetterA'
import { StudioEnv } from './StudioEnv'
import { useScene } from './scene-context'
import type { TierSettings } from '@/hooks/useDeviceTier'

/* ---------- ПАРАМЕТРЫ ВРАЩЕНИЯ ----------
   Здесь настраивается характер движения. Значения намеренно
   сдержанные: куб доворачивается, а не крутится. */

/** Максимальный доворот по горизонтали, радианы (~22°). */
const MAX_YAW = 0.38
/** Максимальный наклон по вертикали, радианы (~13°). */
const MAX_PITCH = 0.22
/** Время сглаживания. Больше — тяжелее и инертнее. */
const SMOOTH_TIME = 0.55
/** Через сколько секунд покоя куб начинает возвращаться. */
const IDLE_AFTER = 2.5
/** Амплитуда и период дрейфа в покое. */
const DRIFT_AMPLITUDE = 0.05
const DRIFT_PERIOD = 8

/** Базовый разворот — куб стоит в три четверти, а не фронтально. */
const BASE_YAW = -0.32
const BASE_PITCH = -0.12

export type CubeVariant = 'hero' | 'contact'

/* Contact-куб — визуальное завершение, а не второй герой.
   Он меньше, реагирует сдержаннее и не тянет на себя внимание. */
const VARIANTS: Record<CubeVariant, { scale: number; motion: number; shadow: boolean }> = {
  hero: { scale: 1, motion: 1, shadow: true },
  contact: { scale: 0.62, motion: 0.5, shadow: false },
}

type Props = {
  settings: TierSettings
  reducedMotion: boolean
  variant?: CubeVariant
}

export function GlassCube({ settings, reducedMotion, variant = 'hero' }: Props) {
  const preset = VARIANTS[variant]
  const group = useRef<Group>(null)
  const { input, markReady } = useScene()
  const invalidate = useThree((s) => s.invalidate)

  // Накопленный поворот от свайпов. Хранится отдельно от
  // позиционного поворота мыши, чтобы источники не конфликтовали.
  const dragYaw = useRef(0)
  const dragPitch = useRef(0)

  useEffect(() => {
    // Лоадер ждёт только главный куб: contact-куб находится
    // далеко внизу страницы и задерживать первый экран не должен.
    if (variant !== 'hero') return
    const id = requestAnimationFrame(() => markReady())
    return () => cancelAnimationFrame(id)
  }, [markReady, variant])

  useEffect(() => {
    if (!reducedMotion) return
    // В режиме frameloop: 'demand' кадры не идут сами. Запрашиваем
    // несколько подряд, чтобы дождаться готовности карты окружения
    // и контактной тени, и перерисовываем при смене размера окна.
    let count = 0
    const tick = () => {
      invalidate()
      if (++count < 8) requestAnimationFrame(tick)
    }
    tick()
    const onResize = () => invalidate()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [reducedMotion, invalidate])

  useFrame((state, delta) => {
    const node = group.current
    if (!node) return

    // Защита от скачка при возврате на вкладку: если кадр
    // оказался длинным из-за фонового режима, ограничиваем шаг.
    const dt = Math.min(delta, 0.1)
    const now = performance.now()
    const pointer = input.current

    if (reducedMotion) {
      node.rotation.y = BASE_YAW
      node.rotation.x = BASE_PITCH
      return
    }

    // Инерция свайпа: скорость затухает после отпускания пальца.
    if (!pointer.dragging) {
      pointer.dragVX *= Math.pow(0.94, dt * 60)
      pointer.dragVY *= Math.pow(0.94, dt * 60)
    }
    dragYaw.current += pointer.dragVX
    dragPitch.current += pointer.dragVY

    // Свайп тоже ограничен — куб не может «уехать» бесконечно.
    dragYaw.current = clamp(dragYaw.current, MAX_YAW * 2)
    dragPitch.current = clamp(dragPitch.current, MAX_PITCH)

    const idleFor = (now - pointer.lastMove) / 1000
    const idle = idleFor > IDLE_AFTER

    // В покое цель уходит к базовому развороту с очень медленным
    // дрейфом: куб успокаивается, но не выглядит замороженным.
    const drift = idle
      ? Math.sin((state.clock.elapsedTime * Math.PI * 2) / DRIFT_PERIOD) * DRIFT_AMPLITUDE
      : 0

    if (idle) {
      dragYaw.current *= Math.pow(0.97, dt * 60)
      dragPitch.current *= Math.pow(0.97, dt * 60)
    }

    const targetYaw = BASE_YAW + pointer.nx * MAX_YAW * preset.motion + dragYaw.current + drift
    const targetPitch = BASE_PITCH + pointer.ny * MAX_PITCH * preset.motion + dragPitch.current

    // damp сглаживает независимо от частоты кадров: на 120 Гц
    // и на 30 Гц движение ощущается одинаково.
    easing.damp(node.rotation, 'y', targetYaw, SMOOTH_TIME, dt)
    easing.damp(node.rotation, 'x', targetPitch, SMOOTH_TIME, dt)

    // Микропараллакс по позиции — движение перестаёт читаться
    // как вращение вокруг оси и получает вес.
    easing.damp(node.position, 'x', pointer.nx * 0.06 * preset.motion, SMOOTH_TIME, dt)
    easing.damp(node.position, 'y', -pointer.ny * 0.04 * preset.motion, SMOOTH_TIME, dt)
  })

  return (
    <>
      <StudioEnv tier={settings.tier} />

      <group ref={group} scale={preset.scale}>
        <RoundedBox args={[2.2, 2.2, 2.2]} radius={0.09} smoothness={4} creaseAngle={0.4}>
          <MeshTransmissionMaterial
            samples={settings.samples}
            resolution={settings.resolution}
            transmission={1}
            thickness={1.15}
            ior={1.52}
            roughness={0.03}
            chromaticAberration={0.045}
            anisotropy={0.2}
            distortion={0.05}
            distortionScale={0.3}
            temporalDistortion={0}
            backside={settings.backside}
            backsideThickness={0.6}
            clearcoat={1}
            clearcoatRoughness={0.05}
            attenuationDistance={4}
            attenuationColor="#ffffff"
            color="#ffffff"
          />
        </RoundedBox>

        <LetterA tier={settings.tier === 'high' ? 'high' : 'mid'} />
      </group>

      {settings.contactShadows && preset.shadow && (
        <ContactShadows
          position={[0, -1.55, 0]}
          opacity={0.42}
          scale={9}
          blur={2.6}
          far={3}
          resolution={settings.tier === 'high' ? 512 : 256}
          color="#000000"
          frames={reducedMotion ? 1 : Infinity}
        />
      )}
    </>
  )
}

function clamp(v: number, limit: number) {
  return Math.max(-limit, Math.min(limit, v))
}

'use client'

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from 'react'
import { useDeviceTier, type TierSettings } from '@/hooks/useDeviceTier'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Состояние указателя живёт в ref, а не в state: pointermove
 * приходит десятки раз в секунду, и рендер React на каждое
 * движение мыши убил бы кадровый бюджет. Сцена читает эти
 * значения в useFrame напрямую.
 */
export type CubeInput = {
  /** Позиция указателя, нормализованная в [-1, 1]. */
  nx: number
  ny: number
  /** Скорость от свайпа на тач-устройствах, затухает сама. */
  dragVX: number
  dragVY: number
  dragging: boolean
  /** Время последнего движения — по нему включается покой. */
  lastMove: number
}

type SceneContextValue = {
  input: RefObject<CubeInput>
  /** Уровень качества и настройки рендера для текущего устройства. */
  settings: TierSettings & { resolved: boolean }
  reducedMotion: boolean
  /** true, когда хотя бы один 3D-вид в кадре и вкладка активна. */
  active: boolean
  /** Видимость конкретного вида. Канвас засыпает, когда невидимы все. */
  setViewActive: (key: string, visible: boolean) => void
  setTabVisible: (v: boolean) => void
  ready: boolean
  markReady: () => void
  /** Отключает 3D навсегда в этой сессии: потеря контекста,
   *  ошибка инициализации рендерера. Пользователь получает
   *  статичный fallback вместо чёрного прямоугольника. */
  disable3D: () => void
}

const SceneContext = createContext<SceneContextValue | null>(null)

export function SceneProvider({ children }: { children: ReactNode }) {
  const input = useRef<CubeInput>({
    nx: 0,
    ny: 0,
    dragVX: 0,
    dragVY: 0,
    dragging: false,
    lastMove: 0,
  })

  const reducedMotion = useReducedMotion()
  const settings = useDeviceTier(reducedMotion)

  const [views, setViews] = useState<Record<string, boolean>>({})
  const [tabVisible, setTabVisible] = useState(true)
  const [ready, setReady] = useState(false)

  const setViewActive = useCallback((key: string, visible: boolean) => {
    setViews((prev) => (prev[key] === visible ? prev : { ...prev, [key]: visible }))
  }, [])

  const active = tabVisible && Object.values(views).some(Boolean)
  const [failed, setFailed] = useState(false)
  const markReady = useCallback(() => setReady(true), [])
  const disable3D = useCallback(() => setFailed(true), [])

  const safeSettings = useMemo(
    () => (failed ? { ...settings, enabled: false, resolved: true } : settings),
    [settings, failed],
  )

  const value = useMemo(
    () => ({
      input,
      settings: safeSettings,
      reducedMotion,
      active,
      setViewActive,
      setTabVisible,
      ready,
      markReady,
      disable3D,
    }),
    [safeSettings, reducedMotion, active, setViewActive, ready, markReady, disable3D],
  )

  return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>
}

export function useScene() {
  const ctx = useContext(SceneContext)
  if (!ctx) throw new Error('useScene must be used inside <SceneProvider>')
  return ctx
}

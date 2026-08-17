'use client'

import dynamic from 'next/dynamic'
import { Loader } from './Loader'
import { useScene } from './scene-context'

// Весь three.js уезжает в отдельный чанк и не грузится ни на
// сервере, ни на устройствах, где 3D отключено.
const SceneRoot = dynamic(() => import('./SceneRoot').then((m) => m.SceneRoot), { ssr: false })

/** Канвас и лоадер. Вынесены отдельным компонентом, потому что
 *  им нужен контекст сцены, который создаёт родитель. */
export function SceneLayer() {
  const { settings } = useScene()

  return (
    <>
      <Loader needed={settings.resolved && settings.enabled} />
      {settings.enabled && <SceneRoot settings={settings} />}
    </>
  )
}

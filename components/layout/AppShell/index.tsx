'use client'

import { useCallback, useState, type ReactNode } from 'react'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Menu } from '@/components/layout/Menu'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { SceneLayer } from '@/components/three/SceneLayer'
import { SceneProvider } from '@/components/three/scene-context'

const MENU_ID = 'main-menu'

/**
 * Оболочка приложения. Живёт выше маршрутов, поэтому шапка, меню,
 * скролл и WebGL-контекст переживают переходы между страницами.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <SceneProvider>
      <a className="u-skip-link" href="#main">
        Skip to content
      </a>

      <SmoothScroll />
      <SceneLayer />

      <Header menuId={MENU_ID} menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} />
      <Menu id={MENU_ID} open={menuOpen} onClose={closeMenu} />

      <main id="main">{children}</main>
      <Footer />
    </SceneProvider>
  )
}

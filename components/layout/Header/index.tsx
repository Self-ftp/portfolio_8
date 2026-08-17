'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Container } from '@/components/layout/Container'
import { navigation } from '@/content/navigation'
import { profile } from '@/content/profile'
import styles from './Header.module.css'

type Props = {
  onOpenMenu: () => void
  menuId: string
  menuOpen: boolean
}

export function Header({ onOpenMenu, menuId, menuOpen }: Props) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <Container className={styles.inner}>
        <Link href="/" className={`t-meta ${styles.name}`}>
          {profile.name}
        </Link>

        <div className={styles.right}>
          <nav className={styles.nav} aria-label="Main">
            <ul>
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link className={`t-meta ${styles.link}`} href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className={styles.menuButton}
            onClick={onOpenMenu}
            aria-expanded={menuOpen}
            aria-controls={menuId}
          >
            <span className="t-meta">Menu</span>
            <span className={styles.dot} aria-hidden="true">
              <span />
            </span>
          </button>
        </div>
      </Container>
    </header>
  )
}

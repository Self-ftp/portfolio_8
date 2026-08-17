'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { Container } from '@/components/layout/Container'
import { MenuGlass } from './MenuGlass'
import { socialChannels } from '@/content/contact'
import { menuNavigation } from '@/content/navigation'
import { profile } from '@/content/profile'
import { useLockScroll } from '@/hooks/useLockScroll'
import styles from './Menu.module.css'

type Props = {
  id: string
  open: boolean
  onClose: () => void
}

const FOCUSABLE = 'a[href], button:not([disabled])'

export function Menu({ id, open, onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useLockScroll(open)

  useEffect(() => {
    if (!open) return

    const node = ref.current
    node?.querySelector<HTMLElement>(FOCUSABLE)?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !node) return

      // Пока меню открыто, фокус не должен уходить на контент под ним.
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return (
    <div
      id={id}
      ref={ref}
      className={`${styles.overlay} ${open ? styles.open : ''}`}
      data-open={open}
      // Скрытое меню полностью убирается из дерева доступности,
      // иначе скринридер читает его сквозь страницу.
      inert={open ? undefined : true}
      aria-hidden={!open}
    >
      <Container className={styles.top}>
        <span className="t-meta">{profile.name}</span>
        <button type="button" className={styles.close} onClick={onClose}>
          <span className="t-meta">Close</span>
          <span aria-hidden="true">×</span>
        </button>
      </Container>

      <Container className={styles.body}>
        <nav aria-label="Menu">
          <ul className={styles.list}>
            {menuNavigation.map((item, i) => (
              <li
                key={item.href}
                className={styles.item}
                style={{ '--i': i } as React.CSSProperties}
              >
                <Link className={`t-h2 ${styles.link}`} href={item.href} onClick={onClose}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MenuGlass />
      </Container>

      {socialChannels.length > 0 && (
        <Container className={styles.footer}>
          {socialChannels.map((c) => (
            <a
              key={c.label}
              className="t-meta"
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {c.label}
            </a>
          ))}
        </Container>
      )}
    </div>
  )
}

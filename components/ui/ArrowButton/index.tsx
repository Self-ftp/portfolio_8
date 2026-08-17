import Link from 'next/link'
import type { ReactNode } from 'react'
import styles from './ArrowButton.module.css'

type Direction = 'right' | 'up-right' | 'down'

type CommonProps = {
  children: ReactNode
  direction?: Direction
  variant?: 'ghost' | 'filled'
  className?: string
}

type Props = CommonProps &
  (
    | { href: string; external?: boolean; onClick?: never; type?: never }
    | { href?: undefined; external?: never; onClick?: () => void; type?: 'button' | 'submit' }
  )

const PATHS: Record<Direction, string> = {
  right: 'M2 8h12M9.5 3.5 14 8l-4.5 4.5',
  'up-right': 'M4 12 12 4M5.5 4H12v6.5',
  down: 'M8 2v12M3.5 9.5 8 14l4.5-4.5',
}

function Inner({ children, direction = 'right' }: { children: ReactNode; direction?: Direction }) {
  return (
    <>
      <span className={`t-meta ${styles.label}`}>{children}</span>
      <span className={styles.circle} aria-hidden="true">
        <svg className={styles.arrow} viewBox="0 0 16 16">
          <path d={PATHS[direction]} strokeLinecap="square" />
        </svg>
      </span>
    </>
  )
}

export function ArrowButton(props: Props) {
  const { children, direction = 'right', variant = 'ghost', className } = props
  const cls = [styles.root, variant === 'filled' && styles.filled, className]
    .filter(Boolean)
    .join(' ')

  if (props.href) {
    // Внешние ссылки открываются в новой вкладке и сообщают об этом
    // скринридеру — иначе переход происходит «молча».
    if (props.external) {
      return (
        <a
          className={cls}
          data-direction={direction}
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Inner direction={direction}>{children}</Inner>
          <span className="u-visually-hidden">(opens in a new tab)</span>
        </a>
      )
    }
    return (
      <Link className={cls} data-direction={direction} href={props.href}>
        <Inner direction={direction}>{children}</Inner>
      </Link>
    )
  }

  return (
    <button
      className={cls}
      data-direction={direction}
      type={props.type ?? 'button'}
      onClick={props.onClick}
    >
      <Inner direction={direction}>{children}</Inner>
    </button>
  )
}

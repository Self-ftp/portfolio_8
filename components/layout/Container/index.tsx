import { createElement, type ReactNode } from 'react'
import styles from './Container.module.css'

/** Разрешённые теги-обёртки. Список закрытый намеренно: он
 *  удерживает семантику разметки и не даёт типам разъехаться
 *  из-за глобального JSX, который расширяет react-three-fiber. */
type Tag = 'div' | 'section' | 'header' | 'footer' | 'nav' | 'article' | 'aside'

type Props = {
  children: ReactNode
  as?: Tag
  /** Включает 12-колоночную сетку внутри контейнера. */
  grid?: boolean
  className?: string
}

export function Container({ children, as = 'div', grid = false, className }: Props) {
  const cls = [styles.container, grid && styles.grid, className].filter(Boolean).join(' ')
  return createElement(as, { className: cls }, children)
}

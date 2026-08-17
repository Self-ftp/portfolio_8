import styles from './MenuGlass.module.css'

/**
 * Стеклянный объект в меню.
 *
 * Намеренно SVG, а не третий 3D-вид: меню открывается поверх
 * страницы, и заводить ради него ещё одну сцену с преломлением
 * значило бы платить кадрами за декорацию. Форма — кольцо, а не
 * куб: главный объект остаётся один, в hero.
 */
export function MenuGlass() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <svg className={styles.svg} viewBox="0 0 320 320" fill="none">
        <defs>
          <linearGradient id="menu-glass-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="55%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="menu-glass-b" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
          </linearGradient>
        </defs>

        <ellipse
          cx="160"
          cy="160"
          rx="104"
          ry="104"
          stroke="url(#menu-glass-a)"
          strokeWidth="26"
        />
        <ellipse
          cx="160"
          cy="160"
          rx="118"
          ry="58"
          transform="rotate(-28 160 160)"
          stroke="url(#menu-glass-b)"
          strokeWidth="22"
        />
      </svg>
    </div>
  )
}

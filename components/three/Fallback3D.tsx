'use client'

import { letterA } from './assets/letterA'
import styles from './Fallback3D.module.css'

/**
 * Замена сцены, когда WebGL недоступен, устройство слабое или
 * контекст потерян. Собирается из того же SVG-контура буквы,
 * что и 3D-версия, поэтому фирменный знак остаётся тем же.
 *
 * Это не «заглушка на всякий случай»: первый экран обязан
 * работать всегда, и здесь он остаётся композиционно целым.
 */
export function Fallback3D() {
  // Достаём только атрибуты d — размеры и viewBox задаём свои.
  const paths = Array.from(letterA.svg.matchAll(/\sd="([^"]+)"/g)).map((m) => m[1])

  return (
    <div className={styles.fallback}>
      <svg className={styles.svg} viewBox="0 0 400 400" role="img" aria-label="Glass cube with the letter A">
        <defs>
          <linearGradient id="cube-face" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ededeb" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="letter-face" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#d4d4d2" />
            <stop offset="100%" stopColor="#f6f6f4" />
          </linearGradient>
        </defs>

        {/* Мягкая опорная тень — куб должен стоять, а не висеть. */}
        <ellipse cx="200" cy="352" rx="118" ry="14" fill="#0a0a0a" opacity="0.1" />

        <rect
          x="66"
          y="66"
          width="268"
          height="268"
          rx="22"
          fill="url(#cube-face)"
          stroke="#d4d4d2"
          strokeWidth="1"
        />

        {/* Внутренняя грань — намёк на толщину стекла. */}
        <rect
          x="92"
          y="92"
          width="216"
          height="216"
          rx="14"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          opacity="0.9"
        />

        <g transform="translate(200 200) scale(0.62) translate(-100 -110)">
          {paths.map((d, i) => (
            <path key={i} d={d} fill="url(#letter-face)" stroke="#8a8a88" strokeWidth="1.2" />
          ))}
        </g>

        {/* Блик по верхней кромке. */}
        <path
          d="M88 88 Q200 74 312 88"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          opacity="0.85"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

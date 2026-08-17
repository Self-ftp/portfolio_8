import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/**
 * iOS не поддерживает SVG-иконки на домашнем экране, поэтому этот
 * файл рендерит тот же знак A из icon.svg отдельным PNG. Форма
 * контура продублирована здесь намеренно — конвертировать SVG
 * в JSX-путь дороже, чем скопировать 12 точек координат.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          background: '#0a0a0a',
        }}
      >
        <svg viewBox="0 0 200 220" width="180" height="198" style={{ margin: 'auto' }}>
          <g fill="#ffffff" transform="translate(20 22) scale(0.8)">
            <path d="M100 0 L200 220 L152 220 L100 92 L48 220 L0 220 Z" />
            <path d="M40 150 L160 150 L160 186 L40 186 Z" />
          </g>
        </svg>
      </div>
    ),
    { ...size },
  )
}

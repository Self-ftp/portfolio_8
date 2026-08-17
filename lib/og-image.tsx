import { ImageResponse } from 'next/og'

export const OG_SIZE = { width: 1200, height: 630 }

/**
 * Общий рендерер OG-карточек для главной и страниц проектов.
 *
 * Разметка через ImageResponse — не HTML/CSS, а собственный
 * flex-движок Satori, поэтому берём только базовые свойства и
 * ту же цветовую пару, что и остальной сайт (#0a0a0a / #ffffff),
 * без обращения к CSS-модулям и токенам во время сборки.
 */
export function renderOgImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle: string
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px',
          background: '#0a0a0a',
          color: '#ffffff',
          fontFamily: 'Helvetica, Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <svg width="28" height="31" viewBox="0 0 200 220" fill="#ffffff">
            <path d="M100 0 L200 220 L152 220 L100 92 L48 220 L0 220 Z" />
            <path d="M40 150 L160 150 L160 186 L40 186 Z" />
          </svg>
          <span style={{ fontSize: 22, letterSpacing: 4, opacity: 0.6 }}>
            {eyebrow.toUpperCase()}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1,
              textTransform: 'uppercase',
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 28, opacity: 0.6 }}>{subtitle}</div>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  )
}

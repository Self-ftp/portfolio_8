import { ImageResponse } from 'next/og'

/**
 * Общий рендерер OG-карточек.
 *
 * Без явного файла шрифта: next/og (Satori) использует встроенный
 * системный fallback, который уже даёт чистый нейтральный gротеск —
 * подключать WOFF2 Inter Tight нельзя, Satori поддерживает только
 * TTF/OTF/WOFF, а конвертация ради секondarного asset'а (карточка
 * видна только в превью ссылок) была бы overkill.
 */
export const OG_SIZE = { width: 1200, height: 630 }

const bg = '#f6f6f4'
const ink = '#0a0a0a'
const muted = '#8a8a88'
const line = '#d4d4d2'

type Props = {
  eyebrow?: string
  title: string
  subtitle: string
}

export function renderOgImage({ eyebrow, title, subtitle }: Props) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 28,
          background: bg,
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            width: 84,
            height: 84,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `2px solid ${ink}`,
            fontSize: 46,
            color: ink,
          }}
        >
          A
        </div>

        {eyebrow && (
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: muted,
            }}
          >
            {eyebrow}
          </div>
        )}

        <div
          style={{
            fontSize: title.length > 20 ? 56 : 68,
            textTransform: 'uppercase',
            color: ink,
            textAlign: 'center',
            maxWidth: 980,
            lineHeight: 1.05,
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: 24,
            color: muted,
            letterSpacing: 1,
          }}
        >
          {subtitle}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 48,
            width: 1104,
            borderTop: `1px solid ${line}`,
          }}
        />
      </div>
    ),
    { ...OG_SIZE },
  )
}

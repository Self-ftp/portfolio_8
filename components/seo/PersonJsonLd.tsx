import { contact, socialChannels } from '@/content/contact'
import { profile } from '@/content/profile'
import { siteUrl, siteUrlIsPlaceholder } from '@/lib/site'

/**
 * Structured data (schema.org/Person) для главной страницы.
 *
 * Только подтверждённые поля: имя, роль, домен. `sameAs`
 * (ссылки на соцсети) добавляются исключительно из реальных
 * адресов в content/contact.ts — пока там плейсхолдеры,
 * массив пуст, и поле в разметке не появляется вовсе.
 */
export function PersonJsonLd() {
  // Домен ещё не задан — структурированные данные подождут:
  // указывать "url": "https://set-your-domain.invalid" было бы
  // такой же выдумкой, как и любой другой fake-факт.
  if (siteUrlIsPlaceholder) return null

  const sameAs = socialChannels.map((c) => c.href)

  const data = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    url: siteUrl,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(contact.channels.find((c) => c.label === 'Email' && c.href)
      ? { email: contact.channels.find((c) => c.label === 'Email')?.href?.replace('mailto:', '') }
      : {}),
  }

  return (
    <script
      type="application/ld+json"
      // JSON.stringify экранирует пользовательский текст сам по
      // себе; здесь данные полностью наши (profile.ts, contact.ts),
      // внешнего ввода нет.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

import type { ContactChannel } from '@/lib/types'

/* =========================================================
   CONTACT
   Заголовок и лейблы каналов — английский (интерфейс).
   Основной текст под заголовком — русский (голос автора).

   ⚠️ href: null — канал показывается текстом, а не ссылкой.
   Ни один адрес здесь не выдуман. Подставьте реальные, и
   ссылки автоматически появятся в контактах, меню и футере.
   ========================================================= */

export const contact = {
  title: ["Let's create", 'something', 'great together.'],
  lead: 'Если у вас есть идея проекта, предложение о сотрудничестве или просто хотите связаться — напишите мне.',
  cta: "Let's talk",

  channels: [
    { label: 'Email', value: 'alexey1mkk@vk.com', href: 'mailto:alexey1mkk@vk.com' },
    { label: 'Telegram', value: '@Self_ftp', href: 'https://t.me/Self_ftp' },
    { label: 'Instagram', value: '[INSTAGRAM]', href: null },
    { label: 'Website', value: '[WEBSITE]', href: null },
  ] as ContactChannel[],
}

/** Каналы с реальными адресами. Меню и футер показывают только их —
 *  поэтому плейсхолдеры не превращаются в битые ссылки. */
export const socialChannels = contact.channels.filter(
  (c): c is ContactChannel & { href: string } => Boolean(c.href),
)

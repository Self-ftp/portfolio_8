import { img } from '@/lib/media'
import type { ArchiveGroup } from '@/lib/types'

/* =========================================================
   SELECTED IDENTITIES

   ⚠️ ПРАВИЛО КАТЕГОРИЙ
   Ни одна работа здесь не помечена как клиентская. Архив не
   подтверждает коммерческий статус, поэтому категория остаётся
   нейтральной: «Visual identity», «Logotype», «Brand mark».

   Когда вы подтвердите, какие работы были реальными заказами,
   поменяйте `category` у них на 'Brand identity — commissioned'
   (или свою формулировку) и заполните `year`.

   `year: null` → год не показывается вообще. Выдуманных дат нет.
   ========================================================= */

export const identities: ArchiveGroup = {
  id: 'identities',
  title: 'Selected identities',
  description: 'Логотипы, фирменные знаки и айдентика — подборка работ.',

  items: [
    {
      id: 'elysian-gardens',
      title: 'Elysian Gardens',
      category: 'Visual identity',
      year: null,
      media: img('/images/projects/identities/elysian-gardens.jpg', 'Elysian Gardens — эмблема с растительным орнаментом, золотая линия на тёмно-зелёном', { ratio: '1/1' }),
    },
    {
      id: 'sf-mark',
      title: 'Monogram mark',
      category: 'Brand mark & application',
      year: null,
      // Знак и его применение — одна работа, а не две.
      media: img('/images/projects/identities/sf-mark-apparel.jpg', 'Монограмма, нанесённая на чёрную футболку', { ratio: '1/1' }),
      related: [
        img('/images/projects/identities/sf-mark.jpg', 'Монограмма — знак на белом фоне', { ratio: '1/1' }),
      ],
      note: 'Logo → real-world application',
    },
    {
      id: 'aethwawe',
      title: 'Aethwawe',
      category: 'Visual identity',
      year: null,
      media: img('/images/projects/identities/aethwawe.jpg', 'Aethwawe — знак в виде горного силуэта со звуковой волной', { ratio: '1/1' }),
    },
    {
      id: 'sound-compass',
      title: 'Sound Compass',
      category: 'Visual identity',
      year: null,
      media: img('/images/projects/identities/sound-compass.jpg', 'Sound Compass — компас, собранный из звуковых полос', { ratio: '1/1' }),
    },
    {
      id: 'monogram-03',
      title: 'Monogram',
      category: 'Logotype',
      year: null,
      media: img('/images/projects/identities/monogram-03.jpg', 'Круглая золотая монограмма с арабской цифрой на тёмно-зелёном', { ratio: '1/1' }),
    },
    {
      id: 'strong-energy',
      title: 'Strong Energy',
      category: 'Visual identity',
      year: null,
      media: img('/images/projects/identities/strong-energy.jpg', 'Strong Energy — металлический знак на фоне ночного города', { ratio: '1/1' }),
    },
    {
      id: 'sport-power',
      title: 'Sport Power',
      category: 'Logotype',
      year: null,
      media: img('/images/projects/identities/sport-power.jpg', 'Sport Power — динамичный логотип с наклонной типографикой', { ratio: '1/1' }),
    },
    {
      id: 'eco-construction',
      title: 'EcoConstruction',
      category: 'Visual identity',
      year: null,
      media: img('/images/projects/identities/eco-construction.jpg', 'EcoConstruction — линейный знак здания на фоне стройки', { ratio: '1/1' }),
    },
    {
      id: 'cryptomnestia',
      title: 'Cryptomnestia',
      category: 'Visual identity',
      year: null,
      media: img('/images/projects/identities/cryptomnestia-a.jpg', 'Cryptomnestia — профиль лица с символом криптовалюты', { ratio: '1/1' }),
      related: [
        img('/images/projects/identities/cryptomnestia-b.jpg', 'Cryptomnestia — второй вариант знака', { ratio: '1/1' }),
      ],
    },
    {
      id: 'motivation-cast',
      title: 'Motivation Cast',
      category: 'Logotype',
      year: null,
      media: img('/images/projects/identities/motivation-cast.jpg', 'Motivation Cast — знак в виде мозга и микрофона', { ratio: '1/1' }),
    },
    {
      id: 'fresh-bites',
      title: 'Fresh Bites',
      category: 'Logotype',
      year: null,
      media: img('/images/projects/identities/fresh-bites.jpg', 'Fresh Bites — объёмная надпись на цветном фоне', { ratio: '16/9' }),
    },
    {
      id: 'championpit',
      title: 'Championpit',
      category: 'Brand mark',
      year: null,
      media: img('/images/projects/identities/championpit.jpg', 'Championpit — круглая эмблема со спортивным питанием', { ratio: '1/1' }),
    },
    {
      id: 'se-monogram',
      title: 'SE',
      category: 'Logotype',
      year: null,
      media: img('/images/projects/identities/se-monogram.jpg', 'Монограмма SE на фоне городской панорамы', { ratio: '1/1' }),
    },
  ],
}

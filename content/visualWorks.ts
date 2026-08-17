import { img } from '@/lib/media'
import type { ArchiveGroup } from '@/lib/types'

/* =========================================================
   SELECTED VISUAL WORK

   Это curated archive, а не один искусственный «проект».
   Подгруппы честно называются тем, чем являются.

   ⚠️ NIKE ZOOM X — концепт. Работа подписана автором и не
   является заказом Nike. Категория 'Concept · Web design'
   зафиксирована намеренно и меняться не должна.

   ⚠️ Из архива сознательно исключены:
   • #21 — побайтовый дубликат #20;
   • #30 — содержит изображение третьего лица (публичная персона).
   Оригиналы остались в вашем архиве, на сайт не попадают.
   ========================================================= */

export const visualWork: ArchiveGroup = {
  id: 'visual-work',
  title: 'Selected visual work',
  description: 'Веб-концепты, коммерческий дизайн, соцсети и другие творческие работы.',

  items: [
    {
      id: 'nike-zoomx',
      title: 'Nike Zoom X',
      // Формулировка защищает от впечатления, что это был заказ.
      category: 'Concept · Web design',
      year: null,
      media: img('/images/projects/visual-work/nike-zoomx-concept.jpg', 'Концепт сайта: крупная типографика, каталог кроссовок, светлая сетка', { ratio: '1280/827', ratioMobile: '4/3' }),
      note: 'Self-initiated concept. Not a commissioned project.',
    },

    /* ---------- MARKETPLACE ---------- */
    {
      id: 'car-fragrance',
      title: 'Car fragrance',
      category: 'Marketplace design',
      year: null,
      media: img('/images/projects/visual-work/car-fragrance.jpg', 'Карточка товара: автомобильный ароматизатор с описанием режимов', { ratio: '3/4' }),
    },
    {
      id: 'charging-cable',
      title: 'Charging cable',
      category: 'Marketplace design',
      year: null,
      media: img('/images/projects/visual-work/charging-cable.jpg', 'Карточка товара: кабель быстрой зарядки с характеристиками', { ratio: '3/4' }),
    },
    {
      id: 'flashlight',
      title: 'Portable flashlight',
      category: 'Marketplace design',
      year: null,
      media: img('/images/projects/visual-work/flashlight.jpg', 'Карточка товара: портативный фонарь со сценариями использования', { ratio: '3/4' }),
    },
    {
      id: 'laser-scissors',
      title: 'Laser scissors',
      category: 'Marketplace design',
      year: null,
      media: img('/images/projects/visual-work/laser-scissors.jpg', 'Карточка товара: профессиональные ножницы с перечнем применений', { ratio: '3/4' }),
    },

    /* ---------- RETOUCH ---------- */
    {
      id: 'retouch-sydney',
      title: 'Colour grading',
      category: 'Retouch',
      year: null,
      media: img('/images/projects/visual-work/retouch-after.jpg', 'Фотография на ступенях у оперного театра после цветокоррекции', { ratio: '3/4' }),
      // Пара «до/после» превращается в интерактивное сравнение.
      compare: {
        before: img('/images/projects/visual-work/retouch-before.jpg', 'Исходный кадр до обработки', { ratio: '3/4' }),
        after: img('/images/projects/visual-work/retouch-after.jpg', 'Кадр после цветокоррекции', { ratio: '3/4' }),
      },
    },

    /* ---------- TRAVEL ---------- */
    {
      id: 'russia-travel',
      title: 'Travel covers',
      category: 'Social content',
      year: null,
      media: img('/images/projects/visual-work/russia-travel-a.jpg', 'Обложка travel-канала: горный пейзаж с крупной надписью', { ratio: '1/1' }),
      related: [
        img('/images/projects/visual-work/russia-travel-b.jpg', 'Вариант обложки в горизонтальном формате', { ratio: '16/9' }),
        img('/images/projects/visual-work/russia-secrets.jpg', 'Обложка с коллажем из архитектуры, еды и природы', { ratio: '3/4' }),
      ],
    },

    /* ---------- MERTES ---------- */
    {
      id: 'mertes',
      title: 'Mertes',
      category: 'Promotional design',
      year: null,
      media: img('/images/projects/visual-work/mertes-wide.jpg', 'Промо-макет услуг видеомонтажа с логотипом и иконками приложений', { ratio: '16/9' }),
      related: [
        img('/images/projects/visual-work/mertes-square.jpg', 'Тот же макет в квадратном кадрировании', { ratio: '1/1' }),
      ],
      note: 'One design, two crops.',
    },

    /* ---------- SELF / CONTENT ---------- */
    {
      id: 'self-logotype',
      title: 'Self',
      category: 'Logotype',
      year: null,
      media: img('/images/projects/visual-work/self-logotype.jpg', 'Логотип Self — вытянутая контурная надпись', { ratio: '1/1' }),
    },
    {
      id: 'self-services',
      title: 'Services',
      category: 'Social content',
      year: null,
      media: img('/images/projects/visual-work/self-services.jpg', 'Обложка «Услуги» с иконками профессиональных программ', { ratio: '16/9' }),
      related: [
        img('/images/projects/visual-work/self-information.jpg', 'Обложка «Информация» с жидкой типографикой', { ratio: '16/9' }),
      ],
    },
    {
      id: 'self-guides',
      title: 'Guides & covers',
      category: 'Social content',
      year: null,
      media: img('/images/projects/visual-work/self-dont-waste-time.jpg', 'Обложка «Не трать время впустую» с рабочим кадром', { ratio: '16/9' }),
      related: [
        img('/images/projects/visual-work/self-first-clients.jpg', 'Светлая обложка гайда о поиске первых клиентов', { ratio: '1/1' }),
        img('/images/projects/visual-work/self-the-one.jpg', 'Обложка «Тот самый» с тройным коллажем', { ratio: '16/9' }),
        img('/images/projects/visual-work/editing-for-lazy.jpg', 'Обложка «Монтаж для ленивых»', { ratio: '16/9' }),
        img('/images/projects/visual-work/hobbies-2025.jpg', 'Обложка о хобби с коллажем из четырёх кадров', { ratio: '16/9' }),
      ],
    },
  ],
}

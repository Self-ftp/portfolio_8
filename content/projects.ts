import { img, placeholder } from '@/lib/media'
import type { CaseChapter, Project } from '@/lib/types'

/* =========================================================
   PROJECTS

   Иерархия витрины закреплена полем `order`:
   01–02  собственные digital-проекты — главные;
   03     визуальный кейс;
   04–05  курируемые архивы работ.
   Старые визуальные работы не должны затмевать digital-проекты,
   поэтому им отданы менее «громкие» композиции.

   ЧТОБЫ ДОБАВИТЬ ПРОЕКТ: скопируйте объект, поменяйте slug
   и order, положите изображения в public/images/projects/<slug>/.
   Компоненты трогать не нужно.

   ⚠️ websiteUrl: null — адрес не известен. Вместо ссылки
   показывается видимый плейсхолдер. Выдуманных URL здесь нет.
   ========================================================= */

/** Заготовка глав кейса. Глава с пустым body не рендерится. */
function chapters(): CaseChapter[] {
  return [
    { key: 'idea', title: 'The idea', body: ['[TO BE ADDED]'], media: null },
    { key: 'concept', title: 'The concept', body: ['[TO BE ADDED]'], media: null },
    { key: 'design', title: 'The design', body: ['[TO BE ADDED]'], media: null },
    { key: 'development', title: 'The development', body: ['[TO BE ADDED]'], media: null },
    { key: 'result', title: 'The result', body: ['[TO BE ADDED]'], media: null },
  ]
}

export const projects: Project[] = [
  {
    slug: 'dream-life',
    kind: 'case',
    // ⚠️ Название подтверждено автором без знака вопроса —
    // на более раннем этапе использовался рабочий вариант
    // "DREAM LIFE ?"; в финальном контенте он снят намеренно.
    name: 'DREAM LIFE',
    category: 'Personal Digital Experience',
    // Год не подтверждён — не выдумываю.
    year: '[TO BE ADDED]',
    order: 1,
    client: null,
    // Явно self-initiated: это не заказ, а собственный проект.
    status: 'live',
    shortDescription:
      'Личный цифровой архив, где моменты, воспоминания и мечты становятся интерактивным опытом.',
    fullDescription:
      'DREAM LIFE — мой личный цифровой архив воспоминаний, пережитого опыта и мечтаний. Это не классическое портфолио и не обычная фотогалерея, а пространство, где личные моменты становятся частью самого интерфейса.',
    role: ['Creator', 'Designer', 'Developer'],
    // Автор попросил оставить именно эту формулировку до
    // подтверждения точного стека.
    technologies: ['[TO BE CONFIRMED]'],
    // Скриншотов сайта пока нет — вместо пустого плейсхолдера
    // авторская concept-иллюстрация ("архив разрозненных
    // воспоминаний"), а не фейковый скриншот несуществующего
    // интерфейса. Замените на реальные кадры, когда пришлёте их.
    coverImage: img('/images/projects/dream-life/concept.jpg', 'DREAM LIFE — concept visual', {
      ratio: '16/9',
      ratioMobile: '4/5',
    }),
    heroImage: img('/images/projects/dream-life/concept.jpg', 'DREAM LIFE — concept visual', {
      ratio: '16/9',
      ratioMobile: '4/5',
    }),
    layout: 'digital',
    showcase: [],
    action: 'View case study',
    hasWebsite: true,
    websiteUrl: 'https://dreamlifeself.netlify.app/',
    // Личная структура вместо агентской Problem/Solution/Results —
    // так и было явно запрошено для этого проекта. Заголовки глав
    // (The idea / The experience) остаются на английском по
    // языковому правилу сайта; текст под ними — на русском,
    // вашими же исходными словами из брифа, а не моим переводом
    // с английской версии, которая была здесь раньше.
    caseStudy: [
      {
        key: 'idea',
        title: 'The idea',
        body: [
          'Я хотел создать цифровое пространство, в котором мои воспоминания и мечты могли бы существовать вместе.',
          'Вместо обычного архива фотографий или стандартного personal website я решил создать самостоятельный digital experience, где личные моменты становятся частью визуального языка интерфейса.',
        ],
        media: null,
      },
      {
        key: 'experience',
        title: 'The experience',
        body: [
          'DREAM LIFE построен как интерактивный личный архив.',
          'Интерфейс, переходы, типографика, изображения и движение работают вместе, чтобы просмотр проекта ощущался скорее как исследование личной коллекции воспоминаний, чем как навигация по обычному сайту.',
        ],
        media: null,
      },
    ],
    gallery: [],
    published: true,
  },

  {
    slug: 'ascend-club',
    kind: 'case',
    name: 'ASCEND CLUB',
    category: 'Digital Platform',
    // Год не подтверждён — не выдумываю.
    year: '[TO BE ADDED]',
    order: 2,
    client: null,
    status: 'live',
    shortDescription: '[SHORT DESCRIPTION — одно предложение для витрины.]',
    fullDescription: '[FULL DESCRIPTION — два-три предложения для страницы кейса.]',
    role: ['Web design', 'Development', 'Interaction'],
    technologies: ['[TECH]', '[TECH]', '[TECH]'],
    coverImage: placeholder('ASCEND CLUB — website visual', '16/9', '4/5'),
    heroImage: placeholder('ASCEND CLUB — project hero', '16/9', '4/5'),
    layout: 'digital',
    showcase: [],
    action: 'View case study',
    hasWebsite: true,
    websiteUrl: null,
    caseStudy: chapters(),
    gallery: [],
    // Временно снят с публикации по вашей просьбе — сама запись
    // остаётся здесь целиком, верните published: true, когда решите
    // вернуть проект на сайт.
    published: false,
  },

  {
    slug: 'nutrisnap',
    kind: 'case',
    name: 'NUTRISNAP',
    // Формулировка категории — дословно как задана автором.
    category: 'Digital Product / Mobile Application',
    // Год подтверждён датой релиза версии 1.0.1 в RuStore (1 мая 2026).
    year: '2026',
    order: 3,
    client: null,
    status: 'in-progress',
    shortDescription:
      'AI-приложение для подсчёта калорий по фото еды.',
    fullDescription:
      'NutriSnap — мой собственный digital-продукт, а не клиентский заказ. Пользователь фотографирует еду камерой телефона, а AI распознаёт блюдо и оценивает калорийность и БЖУ — без ручного поиска продуктов в базе. Приложение опубликовано в RuStore.',
    role: ['Creator', 'Designer', 'Developer'],
    // Стек не подтверждён — не выдумываю.
    technologies: ['[TO BE CONFIRMED]'],
    // Скриншотов приложения пока нет — вместо пустого плейсхолдера
    // авторская concept-иллюстрация (видоискатель камеры + тарелка),
    // а не фейковый скриншот несуществующего интерфейса. Замените
    // на реальные кадры, когда пришлёте их.
    coverImage: img('/images/projects/nutrisnap/concept.jpg', 'NUTRISNAP — concept visual', {
      ratio: '16/9',
      ratioMobile: '4/5',
    }),
    heroImage: img('/images/projects/nutrisnap/concept.jpg', 'NUTRISNAP — concept visual', {
      ratio: '16/9',
      ratioMobile: '4/5',
    }),
    layout: 'digital',
    showcase: [],
    action: 'View case study',
    // Ссылка подтверждена — реальная страница приложения в RuStore.
    hasWebsite: true,
    websiteUrl: 'https://www.rustore.ru/catalog/app/com.nutrisnap.app',
    caseStudy: [
      {
        key: 'idea',
        title: 'The idea',
        body: [
          'Идея NutriSnap — упростить подсчёт калорий. Вместо того чтобы вручную искать продукты в базе, пользователь фотографирует еду камерой смартфона.',
        ],
        media: null,
      },
      {
        key: 'product',
        title: 'The product',
        body: [
          'Приложение распознаёт блюдо по фотографии и с помощью AI оценивает его калорийность и БЖУ — без ручного поиска продуктов в базе. Отдельно отслеживается потребление воды и прогресс по дням.',
          'Это мой собственный digital-продукт — не клиентский заказ, а то, что я придумал, спроектировал и выпустил сам. Приложение опубликовано в RuStore.',
        ],
        media: null,
      },
    ],
    gallery: [],
    published: true,
  },

  {
    slug: 'martinez',
    kind: 'case',
    name: 'MARTINEZ',
    category: 'Brand Content Design',
    // Коммерческий статус не подтверждён — год не выдумываем.
    year: '[TO BE ADDED]',
    order: 4,
    client: null,
    status: 'archived',
    shortDescription:
      'Дизайн и визуальное оформление Telegram-канала о спортивном питании: монограмма, ключевые визуалы и редакционная серия.',
    fullDescription:
      'MARTINEZ — дизайн и визуальное оформление контента для Telegram-канала о спортивном питании: монограмма, ключевые визуалы и повторяющаяся серия редакционных материалов.',
    role: ['Designer'],
    technologies: ['[TO BE ADDED]'],
    coverImage: img('/images/projects/martinez/01-key-visual.jpg', 'MARTINEZ — ключевой визуал бренда спортивного питания', { ratio: '16/9', ratioMobile: '4/3' }),
    heroImage: img('/images/projects/martinez/01-key-visual.jpg', 'MARTINEZ — ключевой визуал бренда', { ratio: '16/9', ratioMobile: '4/3' }),
    layout: 'feature',
    showcase: [
      img('/images/projects/martinez/04-be-not-seem.jpg', 'MARTINEZ — постер с крупной надписью и графическим портретом', { ratio: '16/9' }),
      img('/images/projects/martinez/05-gym.jpg', 'MARTINEZ — визуал о тренировках с гантелями', { ratio: '16/9' }),
      img('/images/projects/martinez/08-creatine-cons.jpg', 'MARTINEZ — часть серии материалов о креатине', { ratio: '16/9' }),
    ],
    action: 'View case study',
    // Контент-дизайн для канала — отдельного сайта у проекта нет.
    hasWebsite: false,
    websiteUrl: null,
    caseStudy: [
      {
        key: 'idea',
        title: 'The idea',
        body: [
          'MARTINEZ — оформление Telegram-канала о спортивном питании: монограмма, ключевые визуалы и повторяющаяся серия материалов, объединённые единым визуальным языком.',
        ],
        media: null,
      },
      {
        key: 'system',
        title: 'The visual system',
        body: [
          'Визуальный язык строится на плотных, контрастных постерах с крупной типографикой — формат, который держит единый стиль на всей серии материалов о креатине и хорошо читается в ленте канала.',
        ],
        media: null,
      },
    ],
    gallery: [
      img('/images/projects/martinez/02-monogram.jpg', 'MARTINEZ — монограмма бренда', { ratio: '1/1' }),
      img('/images/projects/martinez/03-navigation.jpg', 'MARTINEZ — навигационный экран канала', { ratio: '16/9' }),
      img('/images/projects/martinez/06-creatine-intro.jpg', 'MARTINEZ — вводный материал серии о креатине', { ratio: '16/9' }),
      img('/images/projects/martinez/07-creatine-pros.jpg', 'MARTINEZ — материал о преимуществах', { ratio: '16/9' }),
      img('/images/projects/martinez/09-creatine-key-info.jpg', 'MARTINEZ — заключительный материал серии', { ratio: '16/9' }),
    ],
    published: true,
  },

  {
    slug: 'identities',
    kind: 'gallery',
    name: 'SELECTED IDENTITIES',
    category: 'Visual Identity',
    year: '[TO BE ADDED]',
    order: 5,
    client: null,
    status: 'archived',
    shortDescription: 'Логотипы, фирменные знаки и айдентика — подборка работ.',
    fullDescription: '[TO BE ADDED]',
    role: ['[TO BE ADDED]'],
    technologies: [],
    coverImage: img('/images/projects/identities/elysian-gardens.jpg', 'Elysian Gardens — эмблема с растительным орнаментом', { ratio: '1/1' }),
    heroImage: img('/images/projects/identities/elysian-gardens.jpg', 'Elysian Gardens — эмблема', { ratio: '1/1' }),
    layout: 'mosaic',
    showcase: [
      img('/images/projects/identities/sf-mark.jpg', 'Монограмма — геометрический знак SF', { ratio: '1/1' }),
      img('/images/projects/identities/aethwawe.jpg', 'Aethwawe — знак в виде горного силуэта со звуковой волной', { ratio: '1/1' }),
      img('/images/projects/identities/sound-compass.jpg', 'Sound Compass — компас из звуковых полос', { ratio: '1/1' }),
      img('/images/projects/identities/monogram-03.jpg', 'Круглая золотая монограмма', { ratio: '1/1' }),
    ],
    action: 'View all identities',
    hasWebsite: false,
    websiteUrl: null,
    caseStudy: [],
    gallery: [],
    published: true,
  },

  {
    slug: 'visual-work',
    kind: 'gallery',
    name: 'SELECTED VISUAL WORK',
    category: 'Web · Commercial · Creative',
    year: '[TO BE ADDED]',
    order: 6,
    client: null,
    status: 'archived',
    shortDescription: 'Веб-концепты, дизайн для маркетплейсов, соцсети и ретушь.',
    fullDescription: '[TO BE ADDED]',
    role: ['[TO BE ADDED]'],
    technologies: [],
    coverImage: img('/images/projects/visual-work/nike-zoomx-concept.jpg', 'Концепт сайта: крупная типографика и каталог', { ratio: '1280/827', ratioMobile: '4/3' }),
    heroImage: img('/images/projects/visual-work/nike-zoomx-concept.jpg', 'Концепт сайта', { ratio: '1280/827' }),
    layout: 'mosaic-alt',
    showcase: [
      img('/images/projects/visual-work/mertes-wide.jpg', 'Промо-макет услуг видеомонтажа', { ratio: '16/9' }),
      img('/images/projects/visual-work/charging-cable.jpg', 'Карточка товара: кабель быстрой зарядки', { ratio: '3/4' }),
      img('/images/projects/visual-work/retouch-after.jpg', 'Кадр после цветокоррекции', { ratio: '3/4' }),
      img('/images/projects/visual-work/flashlight.jpg', 'Карточка товара: портативный фонарь', { ratio: '3/4' }),
    ],
    action: 'View all work',
    hasWebsite: false,
    websiteUrl: null,
    caseStudy: [],
    gallery: [],
    published: true,
  },
]

export const projectsMeta = {
  subtitle: 'Selected digital projects, visual campaigns and creative work.',
}

export const publishedProjects = projects
  .filter((p) => p.published)
  .sort((a, b) => a.order - b.order)

/** Только проекты с полноценной страницей кейса. */
export const caseProjects = publishedProjects.filter((p) => p.kind === 'case')

export function getProject(slug: string): Project | undefined {
  return publishedProjects.find((p) => p.slug === slug)
}

/** Соседние проекты. Список закольцован, поэтому «следующий»
 *  есть всегда — даже когда проект в списке один. */
export function getProjectNeighbours(slug: string) {
  const list = publishedProjects
  const i = list.findIndex((p) => p.slug === slug)
  if (i === -1) return { prev: undefined, next: undefined }
  return {
    prev: list[(i - 1 + list.length) % list.length],
    next: list[(i + 1) % list.length],
  }
}

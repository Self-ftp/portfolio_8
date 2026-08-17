export type Media = {
  /** null → рисуется плейсхолдер нужных пропорций, layout не ломается. */
  src: string | null
  alt: string
  /** Соотношение сторон, например '16/9'. Резервирует место до загрузки. */
  ratio?: string
  /** Пропорции на мобильном. Горизонтальный кадр в одной колонке
   *  часто мельчает — здесь можно задать вертикальный вариант. */
  ratioMobile?: string
  /** Какая часть кадра важна при обрезке: 'center', 'top', '50% 30%'. */
  focus?: string
  /** Крошечный base64-превью для плавного проявления.
   *  Как сгенерировать — см. README. */
  blurDataURL?: string
  caption?: string
}

export type ProjectStatus = 'live' | 'in-progress' | 'archived'

/** Глава кейса. Порядок в массиве = порядок на странице. */
export type CaseChapter = {
  key: string
  title: string
  body: string[]
  media: Media | null
}

/** Композиция карточки в витрине.
 *  'auto' — чередование overlay / split по позиции в списке. */
export type ProjectLayout =
  /** Один крупный визуал во всю ширину. Для главных digital-проектов. */
  | 'digital'
  /** Ведущий кадр + ряд поддерживающих. Для визуального кейса. */
  | 'feature'
  /** Editorial-сетка: крупный слева, мелкие справа. */
  | 'mosaic'
  /** Editorial-сетка со смещённым ритмом. */
  | 'mosaic-alt'

/** Что открывается по клику на проект.
 *  'case'    — полноценная страница кейса;
 *  'gallery' — курируемый архив работ. */
export type ProjectKind = 'case' | 'gallery'

export type Project = {
  slug: string
  kind: ProjectKind
  name: string
  category: string
  year: string
  order: number
  client: string | null
  status: ProjectStatus
  shortDescription: string
  fullDescription: string
  role: string[]
  technologies: string[]
  coverImage: Media
  heroImage: Media
  /** Композиция блока в витрине. Каждый проект получает свою:
   *  одинаковые карточки подряд читаются как шаблон. */
  layout: ProjectLayout
  /** Дополнительные кадры рядом с обложкой на главной.
   *  Пустой массив — показывается только обложка. */
  showcase: Media[]
  /** Подпись действия: 'View case study', 'View all identities'… */
  action: string
  /** Есть ли у проекта живой сайт в принципе.
   *  false → блок ссылки не рендерится вообще (у контент-дизайна
   *  сайта нет, и плейсхолдер там был бы бессмыслицей). */
  hasWebsite: boolean
  /** Адрес. null при hasWebsite: true → показывается видимый
   *  плейсхолдер. Выдуманных URL здесь быть не должно. */
  websiteUrl: string | null
  caseStudy: CaseChapter[]
  /** Пустой массив — блок галереи не рендерится. */
  gallery: Media[]
  published: boolean
}

/** Работа в курируемом архиве (identities, visual work). */
export type ArchiveItem = {
  id: string
  title: string
  /** Нейтральная категория. Никаких утверждений о клиенте. */
  category: string
  year: string | null
  media: Media
  /** Пара «до/после» для интерактивного сравнения. */
  compare?: { before: Media; after: Media }
  /** Дополнительные кадры той же работы (другие кропы, применение). */
  related?: Media[]
  note?: string
}

export type ArchiveGroup = {
  id: string
  title: string
  description: string
  items: ArchiveItem[]
}

export type ExperienceEntry = {
  year: string
  title: string
  organization: string
  description: string
}

export type Service = {
  index: string
  title: string
  description: string
  visual: Media
}

export type NavItem = {
  label: string
  href: string
}

export type ContactChannel = {
  label: string
  /** Текст на экране. Может быть плейсхолдером. */
  value: string
  /** null → показывается как текст, а не как битая ссылка. */
  href: string | null
}

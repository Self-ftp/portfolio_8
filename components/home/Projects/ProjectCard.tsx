import Link from 'next/link'
import { MediaFrame } from '@/components/ui/MediaFrame'
import { Reveal } from '@/components/ui/Reveal'
import { ArrowButton } from '@/components/ui/ArrowButton'
import type { Project } from '@/lib/types'
import styles from './ProjectCard.module.css'

type Props = {
  project: Project
  position: number
}

const LAYOUT_CLASS = {
  digital: styles.digital,
  feature: styles.feature,
  mosaic: styles.mosaic,
  'mosaic-alt': styles.mosaicAlt,
} as const

/**
 * Блок проекта в витрине.
 *
 * Композиция выбирается полем `layout` в данных, а не позицией:
 * digital-проекты получают самый крупный масштаб, архивы —
 * самый тихий. Это и создаёт иерархию
 * DIGITAL → VISUAL CASE → SELECTED WORK.
 */
export function ProjectCard({ project, position }: Props) {
  const href = `/projects/${project.slug}`
  const index = String(position).padStart(2, '0')

  // В mosaic-композициях обложка — первый элемент сетки, а не
  // отдельный кадр во всю ширину: квадратный знак, растянутый
  // на 12 колонок, раздавил бы всю секцию.
  const coverInGrid = project.layout === 'mosaic' || project.layout === 'mosaic-alt'
  const tiles = coverInGrid ? [project.coverImage, ...project.showcase] : project.showcase
  const gridClass = project.layout === 'feature' ? styles.featureRow : styles.mosaicGrid

  return (
    <article className={`${styles.card} ${LAYOUT_CLASS[project.layout]}`}>
      <Reveal className={styles.index}>
        <span className="t-meta">{index}</span>
      </Reveal>

      <Reveal className={styles.head} delay={60}>
        <h3>
          <Link href={href} className={`t-h2 ${styles.name}`}>
            {project.name}
          </Link>
        </h3>
        <p className={`t-meta ${styles.category}`}>{project.category}</p>
      </Reveal>

      <Reveal className={styles.meta} delay={100}>
        <p className={`t-body ${styles.description}`}>{project.shortDescription}</p>
        {project.role.length > 0 && (
          <ul className={styles.roleList}>
            {project.role.map((item) => (
              <li key={item} className="t-meta">
                {item}
              </li>
            ))}
          </ul>
        )}
      </Reveal>

      {!coverInGrid && (
        <Link
          href={href}
          className={styles.media}
          aria-label={`${project.name} — ${project.action}`}
        >
          <MediaFrame
            media={project.coverImage}
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 92vw, 1560px"
            // Единственное изображение над сгибом в этой секции.
            priority={position === 1}
          />
        </Link>
      )}

      {tiles.length > 0 && (
        <div className={gridClass}>
          {tiles.map((media, i) => (
            <Link
              key={media.src ?? i}
              href={href}
              className={styles.tile}
              // Ссылка дублирует основную, поэтому убрана из
              // порядка обхода: клавиатуре не нужны шесть
              // одинаковых переходов подряд.
              tabIndex={-1}
              aria-hidden="true"
            >
              <MediaFrame media={media} sizes="(max-width: 767px) 50vw, 30vw" />
            </Link>
          ))}
        </div>
      )}

      <Reveal className={styles.links} delay={140}>
        <ArrowButton href={href}>{project.action}</ArrowButton>

        {/* Ссылка на живой сайт не прячется. Пока адреса нет —
            на её месте видимый плейсхолдер, а не выдуманный URL. */}
        {project.hasWebsite &&
          (project.websiteUrl ? (
            <ArrowButton href={project.websiteUrl} external direction="up-right" variant="filled">
              Visit website
            </ArrowButton>
          ) : (
            <p className={`t-meta ${styles.urlPlaceholder}`}>[PROJECT WEBSITE URL]</p>
          ))}
      </Reveal>
    </article>
  )
}

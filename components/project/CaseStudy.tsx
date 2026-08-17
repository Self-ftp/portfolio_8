import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { CaseGallery } from '@/components/project/CaseGallery'
import { MediaFrame } from '@/components/ui/MediaFrame'
import { Reveal, RevealLines } from '@/components/ui/Reveal'
import { ArrowButton } from '@/components/ui/ArrowButton'
import type { Project } from '@/lib/types'
import styles from './CaseStudy.module.css'

type Props = {
  project: Project
  prev?: Project
  next?: Project
}

/**
 * Универсальный шаблон кейса.
 *
 * Страницы под конкретные проекты не верстаются: всё собирается
 * из данных. Пустые главы, отсутствующая галерея и незаданный
 * адрес сайта просто не рендерятся — сломанной вёрстки не будет.
 */
export function CaseStudy({ project, prev, next }: Props) {
  const chapters = project.caseStudy.filter((c) => c.body.some((p) => p.trim().length > 0))

  const meta = [
    { label: 'Category', value: project.category },
    { label: 'Year', value: project.year },
    { label: 'Role', value: project.role.join(', ') },
    { label: 'Technologies', value: project.technologies.join(', ') },
    ...(project.client ? [{ label: 'Client', value: project.client }] : []),
  ]

  return (
    <article className={styles.page}>
      <Container grid className={styles.head}>
        <div className={styles.back}>
          <ArrowButton href="/#projects" direction="right">
            All projects
          </ArrowButton>
        </div>

        <div className={styles.titleBlock}>
          <RevealLines as="h1" lines={[project.name]} className={`t-display ${styles.title}`} />
          <Reveal delay={80}>
            <p className={`t-meta ${styles.eyebrow}`}>
              {project.category} — {project.year}
            </p>
          </Reveal>
        </div>

        <Reveal className={styles.meta} delay={120}>
          {meta.map((item) => (
            <div key={item.label} className={styles.metaItem}>
              <p className={`t-meta ${styles.metaLabel}`}>{item.label}</p>
              <p className={styles.metaValue}>{item.value}</p>
            </div>
          ))}
        </Reveal>
      </Container>

      <Container className={styles.hero}>
        <MediaFrame media={project.heroImage} sizes="100vw" priority />
      </Container>

      <Container grid className={styles.intro}>
        <Reveal className={styles.introText}>
          <p className="t-body-lg">{project.fullDescription}</p>
        </Reveal>

        {project.hasWebsite && (
          <Reveal className={styles.introLinks} delay={100}>
            {project.websiteUrl ? (
              <ArrowButton href={project.websiteUrl} external direction="up-right" variant="filled">
                Visit website
              </ArrowButton>
            ) : (
              <p className={`t-meta ${styles.urlPlaceholder}`}>[PROJECT WEBSITE URL]</p>
            )}
          </Reveal>
        )}
      </Container>

      {chapters.map((chapter) => (
        <Container key={chapter.key} grid className={styles.chapter}>
          <Reveal className={styles.chapterTitle}>
            <h2 className="t-h3">{chapter.title}</h2>
          </Reveal>

          <Reveal className={styles.chapterBody} delay={80}>
            {chapter.body.map((paragraph, i) => (
              <p key={i} className="t-body">
                {paragraph}
              </p>
            ))}
          </Reveal>

          {chapter.media && (
            <div className={styles.chapterMedia}>
              <MediaFrame media={chapter.media} sizes="100vw" />
            </div>
          )}
        </Container>
      ))}

      {project.gallery.length > 0 && (
        <Container className={styles.gallery}>
          <h2 className="t-meta">Selected work</h2>
          <CaseGallery items={project.gallery} title={project.name} />
        </Container>
      )}

      {/* Ссылка на живой сайт повторяется в конце: к этому месту
          читатель уже знает проект, и переход логичен именно здесь. */}
      {project.hasWebsite && (
        <Container className={styles.outro}>
          {project.websiteUrl ? (
            <ArrowButton href={project.websiteUrl} external direction="up-right" variant="filled">
              Visit website
            </ArrowButton>
          ) : (
            <p className={`t-meta ${styles.urlPlaceholder}`}>[PROJECT WEBSITE URL]</p>
          )}
        </Container>
      )}

      <Container className={styles.nav}>
        {prev && (
          <div className={styles.navItem}>
            <Link href={`/projects/${prev.slug}`}>
              <span className={`t-meta ${styles.navLabel}`}>← Previous project</span>
              <p className={`t-h3 ${styles.navName}`}>{prev.name}</p>
            </Link>
          </div>
        )}

        {next && (
          <div className={styles.navItem}>
            <Link href={`/projects/${next.slug}`}>
              <span className={`t-meta ${styles.navLabel}`}>Next project →</span>
              <p className={`t-h3 ${styles.navName}`}>{next.name}</p>
            </Link>
          </div>
        )}
      </Container>
    </article>
  )
}

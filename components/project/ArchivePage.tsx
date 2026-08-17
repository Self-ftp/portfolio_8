import Link from 'next/link'
import { ArchiveGrid } from '@/components/gallery/ArchiveGrid'
import { Container } from '@/components/layout/Container'
import { Reveal, RevealLines } from '@/components/ui/Reveal'
import { ArrowButton } from '@/components/ui/ArrowButton'
import type { ArchiveGroup, Project } from '@/lib/types'
import styles from './ArchivePage.module.css'

type Props = {
  project: Project
  group: ArchiveGroup
  prev?: Project
  next?: Project
}

/**
 * Страница курируемого архива.
 *
 * Это сознательно не case study: у подборки работ нет единой
 * истории, и растягивать её на главы «идея / процесс / результат»
 * значило бы выдумывать содержание. Здесь — заголовок, короткое
 * описание и сами работы.
 */
export function ArchivePage({ project, group, prev, next }: Props) {
  const total = group.items.reduce((sum, item) => sum + 1 + (item.related?.length ?? 0), 0)

  return (
    <div className={styles.page}>
      <Container grid className={styles.head}>
        <div className={styles.back}>
          <ArrowButton href="/#projects">All projects</ArrowButton>
        </div>

        <div className={styles.titleBlock}>
          <Reveal>
            <p className={`t-meta ${styles.eyebrow}`}>{project.category}</p>
          </Reveal>
          <RevealLines as="h1" lines={[project.name]} className={`t-h2 ${styles.title}`} />
        </div>

        <Reveal className={styles.intro} delay={100}>
          <p className="t-body">{group.description}</p>
          <p className={`t-meta ${styles.count}`}>{String(total).padStart(2, '0')} works</p>
        </Reveal>
      </Container>

      <Container className={styles.grid}>
        <ArchiveGrid items={group.items} />
      </Container>

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
    </div>
  )
}

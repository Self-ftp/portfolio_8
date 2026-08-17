import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { SectionLabel } from '@/components/layout/SectionLabel'
import { Reveal, RevealLines } from '@/components/ui/Reveal'
import { experience } from '@/content/experience'
import { sections } from '@/content/navigation'
import styles from './Experience.module.css'

const meta = sections[4]
const title = ['My journey', 'so far.']

export function Experience() {
  return (
    <Section id={meta.id} labelledBy="experience-title" divider>
      <Container grid className={styles.grid}>
        <div className={styles.head}>
          <Reveal>
            <SectionLabel index={meta.index} title={meta.label} />
          </Reveal>
          <RevealLines id="experience-title" lines={title} className="t-h2" delay={80} />
        </div>

        <ol className={styles.timeline}>
          {experience.map((entry, i) => (
            <li key={`${entry.year}-${i}`} className={styles.entry}>
              <Reveal delay={i * 80} className={styles.entryInner}>
                <p className={`t-meta ${styles.year}`}>{entry.year}</p>

                <div className={styles.role}>
                  <h3 className={styles.roleTitle}>{entry.title}</h3>
                  <p className={`t-meta ${styles.organization}`}>{entry.organization}</p>
                </div>

                <p className={`t-body ${styles.description}`}>{entry.description}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}

import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { SectionLabel } from '@/components/layout/SectionLabel'
import { MediaFrame } from '@/components/ui/MediaFrame'
import { Reveal, RevealLines } from '@/components/ui/Reveal'
import { profile } from '@/content/profile'
import { sections } from '@/content/navigation'
import { caseProjects } from '@/content/projects'
import { services } from '@/content/services'
import styles from './About.module.css'

const meta = sections[1]

export function About() {
  const { about } = profile

  // Число кейсов — не хардкод и не выдумка: считается от реально
  // опубликованных проектов с kind:'case' (сейчас Dream Life,
  // NutriSnap, Martinez). Скрыли/добавили проект — цифра сама
  // пересчиталась при следующей сборке, вручную трогать не нужно.
  const facts = [
    { value: String(caseProjects.length), label: 'Case studies' },
    ...about.facts,
  ]

  return (
    <Section id={meta.id} labelledBy="about-title" divider>
      <Container grid className={styles.grid}>
        <div className={styles.intro}>
          <Reveal>
            <SectionLabel index={meta.index} title={meta.label} />
          </Reveal>

          <RevealLines
            id="about-title"
            lines={about.title}
            className={`t-h2 ${styles.title}`}
            delay={80}
          />

          <Reveal delay={160}>
            <p className={`t-body-lg ${styles.lead}`}>{about.intro}</p>
          </Reveal>

          <Reveal delay={220}>
            <div className={styles.body}>
              {about.body.map((paragraph, i) => (
                <p key={i} className="t-body">
                  {paragraph}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={260}>
            <a href="/#projects" className={`t-meta ${styles.readMore}`}>
              <span>See my work</span>
              <span className={styles.dot} aria-hidden="true">
                ↓
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={120} className={styles.portrait}>
          <MediaFrame
            media={about.portrait}
            sizes="(max-width: 767px) 100vw, 30vw"
            className={styles.portraitFrame}
            transparent
          />
        </Reveal>

        {/* Жирная строка фактов — по референсу, который прислали.
            Число кейсов реальное и посчитано выше; остальное берётся
            из profile.ts и появляется, только когда там есть записи —
            выдуманных цифр по умолчанию здесь нет. */}
        <Reveal delay={320} className={styles.facts}>
          {facts.map((fact) => (
            <div key={fact.label}>
              <p className={styles.factValue}>{fact.value}</p>
              <p className={`t-meta ${styles.factLabel}`}>{fact.label}</p>
            </div>
          ))}
        </Reveal>

        {/* Список направлений — тот же текст, что и в "Areas I Work In"
            ниже на странице (те же content/services.ts, не отдельный
            захардкоженный дубль — раньше он был отдельным списком и
            один раз уже успел разойтись с реальными названиями).
            Расположен полной строкой под About, а не узкой боковой
            колонкой, которая раньше упиралась в фото. */}
        <Reveal delay={380} className={styles.areas}>
          {services.map((service) => (
            <div key={service.title} className={styles.areaItem}>
              <span className={styles.areaIndex}>{service.index}</span>
              <span className={`t-meta ${styles.areaTitle}`}>{service.title}</span>
            </div>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}

import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { SectionLabel } from '@/components/layout/SectionLabel'
import { CubeView } from '@/components/three/CubeView'
import { ArrowButton } from '@/components/ui/ArrowButton'
import { Reveal, RevealLines } from '@/components/ui/Reveal'
import { profile } from '@/content/profile'
import { sections } from '@/content/navigation'
import styles from './Hero.module.css'

const meta = sections[0]

export function Hero() {
  return (
    <Section id={meta.id} labelledBy="home-title" flush>
      <Container grid className={styles.hero}>
        <div className={styles.heroText}>
          <SectionLabel index={meta.index} title={profile.role} />

          <RevealLines
            as="h1"
            id="home-title"
            lines={profile.hero.title}
            className={`t-display ${styles.heroTitle}`}
          />

          <Reveal delay={220}>
            <p className={`t-body-lg ${styles.heroLead}`}>{profile.hero.lead}</p>
          </Reveal>

          <Reveal delay={300}>
            <ArrowButton href="/#projects">{profile.hero.cta}</ArrowButton>
          </Reveal>
        </div>

        <div className={styles.heroVisual}>
          <CubeView />
        </div>
      </Container>
    </Section>
  )
}

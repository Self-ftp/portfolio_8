import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { SectionLabel } from '@/components/layout/SectionLabel'
import { Reveal } from '@/components/ui/Reveal'
import { projectsMeta, publishedProjects } from '@/content/projects'
import { sections } from '@/content/navigation'
import { ProjectCard } from './ProjectCard'
import styles from './Projects.module.css'

const meta = sections[2]

export function Projects() {
  return (
    <Section id={meta.id} labelledBy="projects-title" divider>
      <Container grid className={styles.head}>
        <Reveal className={styles.label}>
          <SectionLabel index={meta.index} title={meta.label} />
        </Reveal>
        <Reveal className={styles.subtitle} delay={80}>
          <h2 id="projects-title" className="t-h3">
            {projectsMeta.subtitle}
          </h2>
        </Reveal>
      </Container>

      <Container className={styles.list}>
        {publishedProjects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} position={i + 1} />
        ))}
      </Container>
    </Section>
  )
}

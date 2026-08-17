import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { SectionLabel } from '@/components/layout/SectionLabel'
import { ContactCube } from '@/components/three/ContactCube'
import { Reveal, RevealLines } from '@/components/ui/Reveal'
import { contact } from '@/content/contact'
import { sections } from '@/content/navigation'
import styles from './Contact.module.css'

const meta = sections[5]

export function Contact() {
  return (
    <Section id={meta.id} labelledBy="contact-title" divider className={styles.section}>
      <Container grid className={styles.grid}>
        <div className={styles.head}>
          <Reveal>
            <SectionLabel index={meta.index} title={meta.label} />
          </Reveal>

          <RevealLines
            id="contact-title"
            lines={contact.title}
            className={`t-h2 ${styles.title}`}
            delay={80}
          />

          <Reveal delay={200}>
            <p className={`t-body-lg ${styles.lead}`}>{contact.lead}</p>
          </Reveal>
        </div>

        <Reveal delay={160} className={styles.channels}>
          {contact.channels.map((channel) => (
            <div key={channel.label} className={styles.channel}>
              <p className={`t-meta ${styles.channelLabel}`}>{channel.label}</p>

              {channel.href ? (
                <a className={`t-body ${styles.channelLink}`} href={channel.href}>
                  {channel.value}
                </a>
              ) : (
                <p className={`t-body ${styles.channelPlaceholder}`}>{channel.value}</p>
              )}
            </div>
          ))}
        </Reveal>

        <div className={styles.visual}>
          <ContactCube />
        </div>
      </Container>
    </Section>
  )
}

import { Container } from '@/components/layout/Container'
import { socialChannels } from '@/content/contact'
import { profile } from '@/content/profile'
import styles from './Footer.module.css'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <span className={`t-meta ${styles.name}`}>{profile.name}</span>
        <span className="t-meta">© {year}</span>
        <span className="t-meta">{profile.footer.availability}</span>

        {/* Показываются только каналы с реальными адресами —
            плейсхолдеры не превращаются в битые ссылки. */}
        {socialChannels.length > 0 && (
          <div className={`t-meta ${styles.links}`}>
            {socialChannels.map((c) => (
              <a key={c.label} href={c.href} target="_blank" rel="noopener noreferrer">
                {c.label}
              </a>
            ))}
          </div>
        )}

        <a className={`t-meta ${styles.top}`} href="#home">
          Back to top ↑
        </a>
      </Container>
    </footer>
  )
}

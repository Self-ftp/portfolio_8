import type { Metadata } from 'next'
import { Container } from '@/components/layout/Container'
import { ArrowButton } from '@/components/ui/ArrowButton'
import styles from './not-found.module.css'

export const metadata: Metadata = {
  title: 'Page not found',
}

export default function NotFound() {
  return (
    <Container className={styles.page}>
      <p className="t-meta">404</p>
      <h1 className="t-h2">This page doesn&rsquo;t exist.</h1>
      <p className={`t-body-lg ${styles.lead}`}>
        The link may be outdated or the page has moved.
      </p>
      <ArrowButton href="/">Back to home</ArrowButton>
    </Container>
  )
}

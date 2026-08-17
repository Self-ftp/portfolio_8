'use client'

import { useState } from 'react'
import { Container } from '@/components/layout/Container'
import { Section } from '@/components/layout/Section'
import { SectionLabel } from '@/components/layout/SectionLabel'
import { MediaFrame } from '@/components/ui/MediaFrame'
import { Reveal, RevealLines } from '@/components/ui/Reveal'
import { services, servicesMeta } from '@/content/services'
import { sections } from '@/content/navigation'
import styles from './WhatIDo.module.css'

const meta = sections[3]

/**
 * Направления работы как editorial-список, а не набор карточек.
 *
 * Визуал справа меняется по наведению, но вся информация есть
 * в самой строке: на тач-устройствах и с клавиатуры раздел
 * читается полностью, ничего не спрятано за hover.
 */
export function WhatIDo() {
  const [active, setActive] = useState(0)

  return (
    <Section id={meta.id} labelledBy="what-i-do-title" divider>
      <Container grid className={styles.grid}>
        <div className={styles.head}>
          <Reveal>
            <SectionLabel index={meta.index} title={meta.label} />
          </Reveal>
          <RevealLines id="what-i-do-title" lines={servicesMeta.title} className="t-h2" delay={80} />
        </div>

        <ul className={styles.list}>
          {services.map((service, i) => (
            <li
              key={service.index}
              className={`${styles.row} ${i === active ? styles.active : ''}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <span className={`t-meta ${styles.rowIndex}`}>{service.index}</span>

              <div className={styles.rowBody}>
                <h3 className={styles.rowTitle}>{service.title}</h3>
                <p className={`t-body ${styles.rowDescription}`}>{service.description}</p>
              </div>

              <svg className={styles.rowArrow} viewBox="0 0 16 16" aria-hidden="true">
                <path d="M2 8h12M9.5 3.5 14 8l-4.5 4.5" strokeLinecap="square" />
              </svg>
            </li>
          ))}
        </ul>

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.visualStack}>
            {services.map((service, i) => (
              <div
                key={service.index}
                className={`${styles.visualItem} ${i === active ? styles.shown : ''}`}
              >
                <MediaFrame media={service.visual} sizes="30vw" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  )
}

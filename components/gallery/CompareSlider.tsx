'use client'

import Image from 'next/image'
import { useState, type CSSProperties } from 'react'
import type { Media } from '@/lib/types'
import styles from './CompareSlider.module.css'

type Props = {
  before: Media
  after: Media
  ratio?: string
}

/**
 * Сравнение «до/после».
 *
 * Управление построено вокруг скрытого <input type="range">:
 * так стрелки, Home/End и скринридер работают без единой
 * строки кода на клавиатурные события.
 */
export function CompareSlider({ before, after, ratio = '3/4' }: Props) {
  const [pos, setPos] = useState(50)

  if (!before.src || !after.src) return null

  return (
    <div
      className={styles.root}
      style={{ '--pos': `${pos}%`, '--ratio': ratio.replace('/', ' / ') } as CSSProperties}
    >
      <div className={styles.layer}>
        <Image src={before.src} alt={before.alt} fill sizes="(max-width: 767px) 100vw, 50vw" />
      </div>

      <div className={`${styles.layer} ${styles.after}`}>
        <Image src={after.src} alt={after.alt} fill sizes="(max-width: 767px) 100vw, 50vw" />
      </div>

      <input
        className={styles.range}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare before and after"
      />

      <div className={styles.handle} aria-hidden="true">
        <span className={styles.knob} />
      </div>

      <span className={`t-meta ${styles.label} ${styles.labelBefore}`} aria-hidden="true">
        Before
      </span>
      <span className={`t-meta ${styles.label} ${styles.labelAfter}`} aria-hidden="true">
        After
      </span>
    </div>
  )
}

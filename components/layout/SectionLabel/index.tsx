import styles from './SectionLabel.module.css'

type Props = {
  /** Порядковый номер раздела: 01…06. Это реальная последовательность
      прохождения сайта, а не декорация. */
  index: string
  title: string
}

export function SectionLabel({ index, title }: Props) {
  return (
    <p className={`t-meta ${styles.label}`}>
      <span className={styles.index}>{index}</span>
      <span className={styles.title}>{title}</span>
    </p>
  )
}

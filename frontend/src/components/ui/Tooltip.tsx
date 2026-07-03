import type { ReactNode } from 'react'
import styles from './Tooltip.module.css'

type Position = 'top' | 'bottom' | 'left' | 'right'
type Align = 'center' | 'right'

interface TooltipProps {
  text: string
  children: ReactNode
  position?: Position
  align?: Align
}

export function Tooltip({ text, children, position = 'top', align = 'center' }: TooltipProps) {
  const alignClass = align === 'right' ? styles.alignRight : ''

  return (
    <div className={styles.wrap}>
      {children}
      <span className={`${styles.tooltip} ${styles[position]} ${alignClass}`} role="tooltip">
        <span className={styles.shape}>
          <span className={`${styles.border} ${styles.clip}`} />
          <span className={`${styles.fill} ${styles.clip}`} />
          <span className={styles.label}>{text}</span>
        </span>
      </span>
      <span className={`${styles.arrow} ${styles[`arrow_${position}`]} ${alignClass}`} aria-hidden="true" />
    </div>
  )
}
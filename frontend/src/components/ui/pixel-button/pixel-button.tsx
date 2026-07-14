import type { ButtonHTMLAttributes, ReactNode } from 'react'
import styles from './pixel-button.module.css'

type Variant = 'green' | 'pink' | 'ghost'

interface PixelButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: Variant
}

export function PixelButton({
  children,
  variant = 'green',
  className = '',
  ...props
}: PixelButtonProps) {
  return (
    <button className={`${styles.pxbtn} ${styles[variant]} ${className}`} {...props}>
      <span className={styles.shape}>
        <span className={`${styles.shadow} ${styles.clip}`} />
        <span className={`${styles.border} ${styles.clip}`} />
        <span className={`${styles.fill} ${styles.clip}`} />
        <span className={styles.label}>{children}</span>
      </span>
    </button>
  )
}

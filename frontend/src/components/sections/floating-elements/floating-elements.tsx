import styles from './floating-elements.module.css'

interface FloatingItem {
  symbol: string
  className: string
}

const CODE_SYMBOLS: FloatingItem[] = [
  { symbol: '{', className: styles.f1 },
  { symbol: '>', className: styles.f2 },
  { symbol: '{ }', className: styles.f3 },
  { symbol: '/', className: styles.f4 },
]

const SPARKLES: FloatingItem[] = [
  { symbol: '✦', className: styles.s1 },
  { symbol: '✦', className: styles.s2 },
  { symbol: '✦', className: styles.s3 },
]

export function FloatingElements() {
  return (
    <div className={styles.container} aria-hidden="true">
      {CODE_SYMBOLS.map((item, i) => (
        <span key={`code-${i}`} className={`${styles.symbol} ${item.className}`}>
          {item.symbol}
        </span>
      ))}
      {SPARKLES.map((item, i) => (
        <span key={`spark-${i}`} className={`${styles.spark} ${item.className}`}>
          {item.symbol}
        </span>
      ))}
    </div>
  )
}
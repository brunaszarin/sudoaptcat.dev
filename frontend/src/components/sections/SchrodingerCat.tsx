import Image from 'next/image'
import styles from './SchrodingerCat.module.css'

interface SchrodingerCatProps {
  width?: number
  height?: number
}

const SPARKLES = [
  { symbol: '✦', className: 'sp1' },
  { symbol: '✧', className: 'sp2' },
  { symbol: '✦', className: 'sp3' },
  { symbol: '⋆', className: 'sp4' },
  { symbol: '✧', className: 'sp5' },
  { symbol: '✦', className: 'sp6' },
]

export function SchrodingerCat({ width = 260, height = 221 }: SchrodingerCatProps) {
  return (
    <div className={styles.box} style={{ width, height }}>
      {SPARKLES.map((s, i) => (
        <span key={i} className={`${styles.sparkle} ${styles[s.className]}`} aria-hidden="true">
          {s.symbol}
        </span>
      ))}

      <Image
        src="/assets/cat-in-the-box.svg"
        alt="gato de Schrödinger escondido na caixa"
        width={width}
        height={height}
        className={`${styles.art} ${styles.closed}`}
        priority
      />
      <Image
        src="/assets/cat-in-the-box-2.svg"
        alt=""
        width={width}
        height={height}
        className={`${styles.art} ${styles.open}`}
        aria-hidden="true"
      />
    </div>
  )
}
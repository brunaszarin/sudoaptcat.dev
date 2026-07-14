import styles from './floating-symbols.module.css'

interface Symbol {
  char: string
  top: string
  left: string
  size: number
  duration: number
  delay: number
}

const SYMBOLS: Symbol[] = [
  { char: '{ }', top: '20%', left: '22%', size: 24, duration: 4, delay: 0 },
  { char: '</>', top: '35%', left: '70%', size: 20, duration: 5, delay: 0.8 },
  { char: '( )', top: '60%', left: '18%', size: 18, duration: 4.5, delay: 1.5 },
  { char: '✦', top: '25%', left: '60%', size: 16, duration: 3.8, delay: 2 },
  { char: ';', top: '70%', left: '72%', size: 22, duration: 5.2, delay: 0.4 },
  { char: '✧', top: '15%', left: '45%', size: 16, duration: 4.2, delay: 2.6 },
  { char: '{ }', top: '55%', left: '80%', size: 18, duration: 4.8, delay: 1.2 },
  { char: '[ ]', top: '78%', left: '40%', size: 20, duration: 4, delay: 3 },
  { char: '⋆', top: '45%', left: '12%', size: 16, duration: 5, delay: 2.2 },
  { char: '✦', top: '30%', left: '82%', size: 14, duration: 3.6, delay: 1.8 },
]

export function FloatingSymbols() {
  return (
    <div className={styles.container} aria-hidden="true">
      {SYMBOLS.map((s, i) => (
        <span
          key={i}
          className={styles.symbol}
          style={{
            top: s.top,
            left: s.left,
            fontSize: `${s.size}px`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        >
          {s.char}
        </span>
      ))}
    </div>
  )
}
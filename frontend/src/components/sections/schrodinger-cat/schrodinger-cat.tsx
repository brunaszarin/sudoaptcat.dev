'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './schrodinger-cat.module.css'

interface SchrodingerCatProps {
  width?: number
  height?: number
}

const SPARKLES = [
  { symbol: '✦', className: 'sp1' },
  { symbol: '✦', className: 'sp2' },
  { symbol: '✦', className: 'sp3' },
  { symbol: '⋆', className: 'sp4' },
  { symbol: '✦', className: 'sp5' },
  { symbol: '✦', className: 'sp6' },
]

export function SchrodingerCat({ width = 260, height = 221 }: SchrodingerCatProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div
      className={`${styles.box} ${isOpen ? styles.boxOpen : ''}`}
      style={{ width, height }}
      onClick={() => setIsOpen((v) => !v)}
      role="button"
      tabIndex={0}
      aria-pressed={isOpen}
      aria-label="gato de Schrödinger — toque para abrir ou fechar a caixa"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setIsOpen((v) => !v)
        }
      }}
    >
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

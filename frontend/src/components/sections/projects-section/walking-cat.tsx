'use client'

import { useEffect, useState } from 'react'
import styles from './walking-cat.module.css'

interface WalkingCatProps {
  isWalking: boolean
  facingLeft: boolean
}

// Os frames ficam TODOS no DOM — trocamos só a visibilidade,
// evitando requisições de rede a cada troca de frame
const FRAMES = [
  '/assets/walk-2.png',
  '/assets/walk-1.png',
  '/assets/walk-3.png',
  '/assets/walk-1.png',
]

// Os arquivos únicos (sem repetição) que precisamos carregar
const UNIQUE_SPRITES = ['/assets/walk-1.png', '/assets/walk-2.png', '/assets/walk-3.png']

export function WalkingCat({ isWalking, facingLeft }: WalkingCatProps) {
  const [frameIndex, setFrameIndex] = useState(0)

  useEffect(() => {
    if (!isWalking) {
      setFrameIndex(1) // volta pro frame parado (walk-1)
      return
    }

    const interval = setInterval(() => {
      setFrameIndex((i) => (i + 1) % FRAMES.length)
    }, 130)

    return () => clearInterval(interval)
  }, [isWalking])

  const currentSprite = isWalking ? FRAMES[frameIndex] : '/assets/walk-1.png'

  return (
    <div
      className={styles.cat}
      style={{ transform: facingLeft ? 'scaleX(-1)' : 'none' }}
    >
      {UNIQUE_SPRITES.map((src) => (
        <img
          key={src}
          src={src}
          alt=""
          aria-hidden="true"
          className={styles.sprite}
          style={{ opacity: src === currentSprite ? 1 : 0 }}
        />
      ))}
    </div>
  )
}
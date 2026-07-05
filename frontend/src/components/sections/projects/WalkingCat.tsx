import { useEffect, useState } from 'react'
import styles from './WalkingCat.module.css'

interface WalkingCatProps {
  x: number // coordenada X no sistema do SVG
  y: number // coordenada Y no sistema do SVG
  facingLeft: boolean
  isWalking: boolean
}

// Dimensões do viewBox do SVG (pra converter coordenadas em %)
const VIEWBOX_W = 1200
const VIEWBOX_H = 760
const TRANSLATE_X = 260 // o mesmo translate do grupo no SVG

const FRAMES = [
  '/assets/walk-2.png',
  '/assets/walk-1.png',
  '/assets/walk-3.png',
  '/assets/walk-1.png',
]
const IDLE_FRAME = '/assets/walk-1.png'

export function WalkingCat({ x, y, facingLeft, isWalking }: WalkingCatProps) {
  const [frameIndex, setFrameIndex] = useState(0)

  useEffect(() => {
    if (!isWalking) return
    const interval = setInterval(() => {
      setFrameIndex((i) => (i + 1) % FRAMES.length)
    }, 130)
    return () => clearInterval(interval)
  }, [isWalking])

  const href = isWalking ? FRAMES[frameIndex] : IDLE_FRAME

  // Converte a coordenada SVG (com o translate) em porcentagem do container
  const leftPct = ((x + TRANSLATE_X) / VIEWBOX_W) * 100
  const topPct = (y / VIEWBOX_H) * 100

  return (
    <img
      src={href}
      alt=""
      aria-hidden="true"
      className={styles.cat}
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        transform: `translate(-50%, -50%) ${facingLeft ? 'scaleX(-1)' : ''}`,
      }}
    />
  )
}
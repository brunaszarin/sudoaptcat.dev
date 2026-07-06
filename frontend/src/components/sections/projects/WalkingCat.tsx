import { useEffect, useState } from 'react'
import styles from './WalkingCat.module.css'

interface WalkingCatProps {
  isWalking: boolean
  facingLeft: boolean
}

const FRAMES = [
  '/assets/walk-2.png',
  '/assets/walk-1.png',
  '/assets/walk-3.png',
  '/assets/walk-1.png',
]
const IDLE_FRAME = '/assets/walk-1.png'

export function WalkingCat({ isWalking, facingLeft }: WalkingCatProps) {
  const [frameIndex, setFrameIndex] = useState(0)

  useEffect(() => {
    if (!isWalking) return
    const interval = setInterval(() => {
      setFrameIndex((i) => (i + 1) % FRAMES.length)
    }, 130)
    return () => clearInterval(interval)
  }, [isWalking])

  const href = isWalking ? FRAMES[frameIndex] : IDLE_FRAME

  return (
  <img
      src={href}
      alt="pixel cat walking through the career timeline"
      className={styles.cat}
      style={{ transform: facingLeft ? 'scaleX(-1)' : 'none' }}
    />
  )
}
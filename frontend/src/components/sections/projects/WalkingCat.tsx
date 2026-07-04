import { useEffect, useState } from 'react'

interface WalkingCatProps {
  x: number
  y: number
  facingLeft: boolean
  isWalking: boolean
  size?: number
}

// Os 3 frames: 1 = parado, 2 e 3 = passos
const FRAMES = [
  '/assets/walk-2.png',
  '/assets/walk-1.png',
  '/assets/walk-3.png',
  '/assets/walk-1.png',
]

const IDLE_FRAME = '/assets/walk-1.png'

export function WalkingCat({
  x,
  y,
  facingLeft,
  isWalking,
  size = 40,
}: WalkingCatProps) {
  const [frameIndex, setFrameIndex] = useState(0)

  // Cicla os frames enquanto estiver andando
  useEffect(() => {
    if (!isWalking) return
    const interval = setInterval(() => {
      setFrameIndex((i) => (i + 1) % FRAMES.length)
    }, 130)
    return () => clearInterval(interval)
  }, [isWalking])

  const href = isWalking ? FRAMES[frameIndex] : IDLE_FRAME

  // Centraliza o sprite no ponto (x, y) e espelha se necessário
  const half = size / 2

  return (
    <image
      href={href}
      x={-half}
      y={-half}
      width={size}
      height={size}
      style={{
        imageRendering: 'pixelated',
        transform: facingLeft
          ? `translate(${x}px, ${y}px) scaleX(-1)`
          : `translate(${x}px, ${y}px)`,
        transformBox: 'fill-box',
        transformOrigin: 'center',
      }}
    />
  )
}
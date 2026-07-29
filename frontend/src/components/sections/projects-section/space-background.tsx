'use client'

import { useState, useEffect } from 'react'
import styles from './space-background.module.css'

interface SpaceBackgroundProps {
  mouseOffset: { x: number; y: number }
}

interface Star {
  top: number
  left: number
  size: number
  duration: number
}

export function SpaceBackground({ mouseOffset }: SpaceBackgroundProps) {
  // Gera as estrelas só no cliente (evita erro de hidratação)
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const generated: Star[] = Array.from({ length: 40 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() > 0.7 ? 3 : 2,
      duration: 2 + Math.random() * 1.5,
    }))
    setStars(generated)
  }, [])

  // Parallax de mouse — camadas em profundidades diferentes
  const farShift = { x: mouseOffset.x * 4, y: mouseOffset.y * 2 }
  const midShift = { x: mouseOffset.x * 8, y: mouseOffset.y * 4 }

  return (
    <div className={styles.space} aria-hidden="true">
      {/* Nebulosas sutis (camada distante) */}
      <div
        className={styles.layer}
        style={{ transform: `translate(${farShift.x}px, ${farShift.y}px)` }}
      >
        <div className={`${styles.neb} ${styles.neb2}`} />
      </div>

      {/* Estrelas (camada distante) */}
      <div
        className={styles.layer}
        style={{ transform: `translate(${farShift.x}px, ${farShift.y}px)` }}
      >
        {stars.map((s, i) => (
          <span
            key={i}
            className={styles.star}
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Meteoros (camada média) */}
      <div
        className={styles.layer}
        style={{ transform: `translate(${midShift.x}px, ${midShift.y}px)` }}
      >
        <div className={`${styles.meteor} ${styles.meteor1}`}>
          <div className={styles.tail} />
          <div className={styles.dot} />
        </div>
        <div className={`${styles.meteor} ${styles.meteor2}`}>
          <div className={styles.tail} />
          <div className={styles.dot} />
        </div>
        <div className={`${styles.meteor} ${styles.meteor3}`}>
          <div className={styles.tail} />
          <div className={styles.dot} />
        </div>
      </div>
    </div>
  )
}

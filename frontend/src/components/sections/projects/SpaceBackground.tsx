'use client'

import { useState, useEffect } from 'react'
import styles from './SpaceBackground.module.css'

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
  const nearShift = { x: mouseOffset.x * 14, y: mouseOffset.y * 7 }

  return (
    <div className={styles.space} aria-hidden="true">
      {/* Nebulosas sutis (camada distante) */}
      <div
        className={styles.layer}
        style={{ transform: `translate(${farShift.x}px, ${farShift.y}px)` }}
      >
        <div className={`${styles.neb} ${styles.neb1}`} />
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

      {/* Planetas (camada próxima) */}
      <div
        className={styles.layer}
        style={{ transform: `translate(${nearShift.x}px, ${nearShift.y}px)` }}
      >
        {/* Planeta com crateras */}
        <svg className={styles.planet1} viewBox="0 0 16 16" shapeRendering="crispEdges">
          <rect x="5" y="1" width="6" height="1" fill="#4d7200" />
          <rect x="3" y="2" width="10" height="1" fill="#66aa00" />
          <rect x="2" y="3" width="12" height="1" fill="#66aa00" />
          <rect x="1" y="4" width="14" height="8" fill="#7bc400" />
          <rect x="2" y="12" width="12" height="1" fill="#66aa00" />
          <rect x="3" y="13" width="10" height="1" fill="#4d7200" />
          <rect x="5" y="14" width="6" height="1" fill="#4d7200" />
          <rect x="4" y="5" width="3" height="2" fill="#88cc00" />
          <rect x="9" y="7" width="3" height="2" fill="#4d7200" />
          <rect x="6" y="9" width="2" height="2" fill="#4d7200" />
          <rect x="10" y="4" width="2" height="1" fill="#88cc00" />
        </svg>

        {/* Saturno com anéis */}
        <svg className={styles.saturn} viewBox="0 0 50 32" shapeRendering="crispEdges">
          <rect x="6" y="15" width="9" height="2" fill="#4d7200" />
          <rect x="3" y="13" width="5" height="2" fill="#3b6d11" />
          <rect x="20" y="6" width="10" height="1" fill="#88cc00" />
          <rect x="18" y="7" width="14" height="1" fill="#aaff00" />
          <rect x="17" y="8" width="16" height="2" fill="#aaff00" />
          <rect x="16" y="10" width="18" height="6" fill="#aaff00" />
          <rect x="17" y="16" width="16" height="2" fill="#88cc00" />
          <rect x="18" y="18" width="14" height="1" fill="#7bc400" />
          <rect x="20" y="19" width="10" height="1" fill="#66aa00" />
          <rect x="18" y="11" width="14" height="1" fill="#88cc00" />
          <rect x="17" y="13" width="16" height="1" fill="#7bc400" />
          <rect x="35" y="15" width="9" height="2" fill="#aaff00" />
          <rect x="42" y="13" width="5" height="2" fill="#88cc00" />
          <rect x="13" y="16" width="6" height="1" fill="#66aa00" />
          <rect x="31" y="16" width="8" height="1" fill="#66aa00" />
        </svg>
      </div>
    </div>
  )
}
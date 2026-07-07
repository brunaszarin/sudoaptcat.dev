'use client'

import { useState, useEffect } from 'react'
import styles from './ParallaxBackground.module.css'

interface Particle {
  left: string
  top: string
  size: number
  opacity: number
}

interface ParallaxBackgroundProps {
  offset: { x: number; y: number }
}

// Fatores de profundidade: quanto maior, mais a camada se move
const LAYER_DEPTHS = [12, 26, 44]
const PARTICLES_PER_LAYER = [30, 18, 10]

function createParticles(count: number, maxSize: number): Particle[] {
  return Array.from({ length: count }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() > 0.6 ? maxSize : Math.max(1, maxSize - 1),
    opacity: Math.random() * 0.5 + 0.15,
  }))
}

export function ParallaxBackground({ offset }: ParallaxBackgroundProps) {
  // useMemo garante que as partículas são geradas UMA vez, não a cada render
 const [layers, setLayers] = useState<Particle[][]>([])

  // Gera as partículas só no cliente, após montar — evita erro de hidratação
  useEffect(() => {
    setLayers([
      createParticles(PARTICLES_PER_LAYER[0], 2),
      createParticles(PARTICLES_PER_LAYER[1], 3),
      createParticles(PARTICLES_PER_LAYER[2], 4),
    ])
  }, [])
  
  return (
    <div className={styles.container} aria-hidden="true">
      {layers.map((particles, layerIndex) => (
        <div
          key={layerIndex}
          className={styles.layer}
          style={{
            transform: `translate(${offset.x * LAYER_DEPTHS[layerIndex]}px, ${
              offset.y * LAYER_DEPTHS[layerIndex]
            }px)`,
          }}
        >
          {particles.map((p, i) => (
            <span
              key={i}
              className={styles.particle}
              style={{
                left: p.left,
                top: p.top,
                width: `${p.size}px`,
                height: `${p.size}px`,
                opacity: p.opacity,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
import type { ReactNode } from 'react'
import styles from './SceneryLayer.module.css'

interface SceneryLayerProps {
  children: ReactNode
  depth: number // quanto maior, mais a camada se move
  progress: number // progresso do scroll (0 a 1)
  mouseOffset: { x: number; y: number }
}

export function SceneryLayer({
  children,
  depth,
  progress,
  mouseOffset,
}: SceneryLayerProps) {
  // Deslocamento vertical pelo scroll + horizontal pelo mouse
  const scrollShift = progress * depth * -1 // sobe conforme rola
  const mouseX = mouseOffset.x * depth * 0.3
  const mouseY = mouseOffset.y * depth * 0.15

  return (
    <div
      className={styles.layer}
      style={{
        transform: `translate(${mouseX}px, ${scrollShift + mouseY}px)`,
      }}
    >
      {children}
    </div>
  )
}
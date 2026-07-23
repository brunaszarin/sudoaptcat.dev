import { useEffect, useRef, useState } from 'react'

// Fração do scroll total usada pra "ligar"/"desligar" a TV em cada ponta
const POWER_RAMP = 0.28

// Funções puras extraídas — reutilizadas tanto pelo hook (scroll bruto)
// quanto pelo BlogSection (progresso suavizado via ScrollTrigger scrub)
export function computePowerLevel(progress: number) {
  // Simétrico: 0 nas duas pontas, sobe pra 1 dentro da "zona ligada"
  return Math.min(1, Math.min(progress, 1 - progress) / POWER_RAMP)
}

export function computeSelectedIndex(progress: number, itemCount: number) {
  if (itemCount <= 0) return -1

  const zoneStart = POWER_RAMP
  const zoneEnd = 1 - POWER_RAMP
  const zoneSize = zoneEnd - zoneStart

  if (progress <= zoneStart || progress >= zoneEnd || zoneSize <= 0) {
    return -1
  }

  const local = (progress - zoneStart) / zoneSize
  return Math.min(itemCount - 1, Math.floor(local * itemCount))
}

export function useTerminalScroll(itemCount: number) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [progress, setProgress] = useState(0)
  const [powerLevel, setPowerLevel] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    let ticking = false

    function compute() {
      ticking = false
      const viewportH = window.innerHeight
      const scrollableDistance = section!.offsetHeight - viewportH
      const scrolled = -section!.getBoundingClientRect().top
      const raw = scrollableDistance > 0 ? scrolled / scrollableDistance : 0
      const p = Math.min(1, Math.max(0, raw))

      setProgress(p)
      setPowerLevel(computePowerLevel(p))
      setSelectedIndex(computeSelectedIndex(p, itemCount))
    }

    function handleScroll() {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(compute)
      }
    }

    compute()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [itemCount])

  return { sectionRef, progress, powerLevel, selectedIndex }
}

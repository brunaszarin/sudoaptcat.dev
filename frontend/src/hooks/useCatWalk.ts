import { useEffect, useRef, useState } from 'react'

export function useCatWalk() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [progress, setProgress] = useState(0)
  const [isWalking, setIsWalking] = useState(false)
  const [facingLeft, setFacingLeft] = useState(false)

  const walkingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastProgress = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    function computeScroll() {
      ticking.current = false

      const viewportH = window.innerHeight
      const scrollableDistance = section!.offsetHeight - viewportH
      const scrolled = -section!.getBoundingClientRect().top
      const raw = scrolled / scrollableDistance
      const p = Math.min(1, Math.max(0, raw))

      if (p > lastProgress.current + 0.001) {
        setFacingLeft(false)
      } else if (p < lastProgress.current - 0.001) {
        setFacingLeft(true)
      }

      // Só atualiza o state (e dispara re-render) se a mudança for perceptível
      if (Math.abs(p - lastProgress.current) > 0.0001) {
        setProgress(p)
        lastProgress.current = p
      }

      setIsWalking(true)
      if (walkingTimeout.current) clearTimeout(walkingTimeout.current)
      walkingTimeout.current = setTimeout(() => setIsWalking(false), 120)
    }

    function handleScroll() {
      // Agrupa múltiplos eventos de scroll num único frame de animação
      if (!ticking.current) {
        ticking.current = true
        requestAnimationFrame(computeScroll)
      }
    }

    computeScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (walkingTimeout.current) clearTimeout(walkingTimeout.current)
    }
  }, [])

  return { sectionRef, progress, isWalking, facingLeft }
}

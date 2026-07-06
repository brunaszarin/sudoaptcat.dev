import { useEffect, useRef, useState } from 'react'

export function useCatWalk() {
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(0)
  const [isWalking, setIsWalking] = useState(false)
  const [facingLeft, setFacingLeft] = useState(false)

  const walkingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastProgress = useRef(0)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    function handleScroll() {
      const viewportH = window.innerHeight
      const scrollableDistance = section!.offsetHeight - viewportH
      const scrolled = -section!.getBoundingClientRect().top
      const raw = scrolled / scrollableDistance
      const p = Math.min(1, Math.max(0, raw))

      // Detecta direção: rolando pra frente (desce) ou pra trás (sobe)
      if (p > lastProgress.current + 0.001) {
        setFacingLeft(false) // andando pra frente (direita)
      } else if (p < lastProgress.current - 0.001) {
        setFacingLeft(true) // andando pra trás (esquerda)
      }
      lastProgress.current = p

      setProgress(p)

      // Marca "andando" enquanto rola; para logo após parar
      setIsWalking(true)
      if (walkingTimeout.current) clearTimeout(walkingTimeout.current)
      walkingTimeout.current = setTimeout(() => setIsWalking(false), 120)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (walkingTimeout.current) clearTimeout(walkingTimeout.current)
    }
  }, [])

  return { sectionRef, progress, isWalking, facingLeft }
}
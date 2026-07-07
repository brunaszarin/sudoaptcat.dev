import { useEffect, useRef, useState } from 'react'

export function useScrollParallax(speed = 0.3) {
 const elementRef = useRef<HTMLDivElement | null>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    function handleScroll() {
      const rect = element!.getBoundingClientRect()
      // Quão longe o topo da seção está do centro da viewport
      const distanceFromCenter = rect.top - window.innerHeight / 2
      // Aplica a velocidade — quanto menor, mais sutil
      setOffset(distanceFromCenter * speed)
    }

    handleScroll() // calcula a posição inicial
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return { elementRef, offset }
}
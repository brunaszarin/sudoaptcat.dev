import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'

// Antes usava o evento nativo de "scroll" do navegador, mas o
// ScrollTrigger.normalizeScroll(true) (ativado pra corrigir o pin no
// mobile) muda como/quando esse evento dispara, deixando o parallax
// engasgado. O gsap.ticker roda a cada frame de tela, já sincronizado
// com o ScrollSmoother — não depende do evento nativo em nada.
export function useScrollParallax(speed = 0.3) {
  const elementRef = useRef<HTMLDivElement | null>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    function tick() {
      const rect = element!.getBoundingClientRect()
      // Quão longe o topo da seção está do centro da viewport
      const distanceFromCenter = rect.top - window.innerHeight / 2
      // Aplica a velocidade — quanto menor, mais sutil
      setOffset(distanceFromCenter * speed)
    }

    tick() // calcula a posição inicial
    gsap.ticker.add(tick)
    return () => {
      gsap.ticker.remove(tick)
    }
  }, [speed])

  return { elementRef, offset }
}

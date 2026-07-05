import { useEffect, useRef, useState } from 'react'

interface CatState {
  x: number
  y: number
  facingLeft: boolean
  isWalking: boolean
}

export function useCatWalk() {
  const sectionRef = useRef<HTMLElement>(null)
  const [cat, setCat] = useState<CatState>({
    x: 60,
    y: 110,
    facingLeft: false,
    isWalking: false,
  })

    const [progress, setProgress] = useState(0)

  const lastX = useRef(60)
  const walkingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const path = section.querySelector<SVGPathElement>('#cat-guide-path')
    if (!path) return

    const totalLength = path.getTotalLength()

    function handleScroll() {
      const rect = section!.getBoundingClientRect()
      const viewportH = window.innerHeight

      // A seção tem altura extra (500vh). O conteúdo fica sticky no topo.
      // Progresso: 0 quando a seção encosta o topo, 1 no fim da altura extra.
      const scrollableDistance = section!.offsetHeight - viewportH
      const scrolled = -rect.top
      const raw = scrolled / scrollableDistance
      const progress = Math.min(1, Math.max(0, raw)) 
      setProgress(progress)

      
      // Onde o gato está ao longo do path
      const point = path!.getPointAtLength(progress * totalLength)

      // Direção: comparando com o x anterior
      const dx = point.x - lastX.current
      const facingLeft = dx < -0.5 ? true : dx > 0.5 ? false : cat.facingLeft
      lastX.current = point.x

      // Marca como andando; reseta pra parado após parar de rolar
      if (walkingTimeout.current) clearTimeout(walkingTimeout.current)
      walkingTimeout.current = setTimeout(() => {
        setCat((c) => ({ ...c, isWalking: false }))
      }, 120)

      setCat({
        x: point.x,
        y: point.y,
        facingLeft,
        isWalking: progress > 0 && progress < 1,
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (walkingTimeout.current) clearTimeout(walkingTimeout.current)
    }
  }, [])

  return { sectionRef, cat, progress }
}
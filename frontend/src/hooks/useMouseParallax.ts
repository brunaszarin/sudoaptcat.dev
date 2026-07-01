import { useEffect, useRef, useState } from 'react'

interface ParallaxValues {
  x: number
  y: number
}

export function useMouseParallax(smoothing = 0.08) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState<ParallaxValues>({ x: 0, y: 0 })

  // Alvo (posição real do mouse) e valor atual (suavizado) ficam em refs
  // porque mudam a cada frame e NÃO devem disparar re-render
  const target = useRef<ParallaxValues>({ x: 0, y: 0 })
  const current = useRef<ParallaxValues>({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    function handleMouseMove(e: MouseEvent) {
      const rect = container!.getBoundingClientRect()
      // Normaliza: -1 (esquerda/topo) a 1 (direita/base), 0 no centro
      target.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      }
    }

    function handleMouseLeave() {
      // Ao sair, volta o alvo pro centro
      target.current = { x: 0, y: 0 }
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    let frameId: number

    function animate() {
      // Lerp: aproxima o valor atual do alvo por uma fração (smoothing)
      current.current.x += (target.current.x - current.current.x) * smoothing
      current.current.y += (target.current.y - current.current.y) * smoothing

      setOffset({ x: current.current.x, y: current.current.y })
      frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)

    // Cleanup: remove listeners e para o loop quando o componente desmonta
    return () => {
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(frameId)
    }
  }, [smoothing])

  return { containerRef, offset }
}
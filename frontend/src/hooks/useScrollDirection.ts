import { useEffect, useRef } from 'react'

/**
 * Rastreia se o usuário estava rolando pra baixo ou pra cima na última
 * vez que a página se moveu — usado pra decidir a direção da transição
 * de página (pixels descendo ou subindo). Fica numa ref pra não causar
 * re-renders a cada scroll.
 */
export function useScrollDirection() {
  const directionRef = useRef<'down' | 'up'>('down')
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY

    function handleScroll() {
      const y = window.scrollY
      if (y > lastY.current + 2) {
        directionRef.current = 'down'
      } else if (y < lastY.current - 2) {
        directionRef.current = 'up'
      }
      lastY.current = y
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return directionRef
}

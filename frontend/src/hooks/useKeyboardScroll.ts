import { useEffect, RefObject } from 'react'

/**
 * Quando a seção está visível, as setas ← → rolam a página suavemente,
 * movendo o gato pela timeline (mantém tudo sincronizado com o scroll).
 */
export function useKeyboardScroll(
  sectionRef: RefObject<HTMLElement | null>,
  step = 120
) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const section = sectionRef.current
      if (!section) return

      // Só age se a seção Projects está ocupando a tela
      const rect = section.getBoundingClientRect()
      const isActive = rect.top <= 0 && rect.bottom >= window.innerHeight
      if (!isActive) return

      if (e.key === 'ArrowRight') {
        e.preventDefault()
        window.scrollBy({ top: step, behavior: 'smooth' })
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        window.scrollBy({ top: -step, behavior: 'smooth' })
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [sectionRef, step])
}
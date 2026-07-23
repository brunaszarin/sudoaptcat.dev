'use client'

import { useGSAP } from '@gsap/react'
import { ScrollSmoother } from '@/lib/gsap'

interface SmoothScrollProviderProps {
  children: React.ReactNode
}

/**
 * Envolve o conteúdo da página com a estrutura que o ScrollSmoother exige
 * (#smooth-wrapper > #smooth-content). Elementos position:fixed (como o
 * Navbar) precisam ficar FORA dessa estrutura — por isso ela só envolve
 * {children}, nunca o layout inteiro.
 */
export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.2,
      effects: false,
    })

    return () => smoother.kill()
  }, [])

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  )
}

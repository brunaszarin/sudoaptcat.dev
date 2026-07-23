'use client'

import { useGSAP } from '@gsap/react'
import { ScrollSmoother, ScrollTrigger } from '@/lib/gsap'

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

    // No mobile, o scroll nativo por toque tem timing/momentum diferente
    // por dispositivo, e isso conflita com pins ativos (ScrollTrigger.pin)
    // — o normalizeScroll assume o controle do scroll pela thread de JS,
    // sincronizando os repaints e evitando o "pulo" do pin. É a correção
    // oficial recomendada pelo GSAP pra essa combinação.
    ScrollTrigger.normalizeScroll(true)

    // Componentes filhos (ProjectsSection, BlogSection) montam ANTES do
    // pai — o efeito deles cria seus próprios ScrollTrigger.pin() antes
    // do ScrollSmoother sequer existir, calculando posições erradas.
    // Um refresh geral logo após a criação do smoother corrige todos os
    // pins que já foram criados "cedo demais".
    const id = requestAnimationFrame(() => ScrollTrigger.refresh())

    return () => {
      cancelAnimationFrame(id)
      ScrollTrigger.normalizeScroll(false)
      smoother.kill()
    }
  }, [])

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  )
}

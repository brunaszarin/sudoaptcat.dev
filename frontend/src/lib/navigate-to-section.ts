'use client'

import { ScrollSmoother, ScrollTrigger } from './gsap'

/**
 * Navega até uma seção por id, usando o método próprio do ScrollSmoother
 * (não scrollIntoView/window.scrollTo, que dessincronizam do wrapper
 * transformado). Depois que o scroll "assenta", força um
 * ScrollTrigger.refresh() — necessário pra qualquer pin (ProjectsSection,
 * BlogSection) recalcular corretamente sua posição depois do salto,
 * senão o scroll continua mas o pin não reconhece que devia travar ali.
 */
export function navigateToSection(id: string) {
  const smoother = ScrollSmoother.get()
  const el = document.getElementById(id)

  if (smoother && el) {
    smoother.scrollTo(el, true)
    setTimeout(() => ScrollTrigger.refresh(), 900)
  } else {
    el?.scrollIntoView({ behavior: 'smooth' })
  }
}

/** Mesma lógica de navigateToSection, mas pro topo absoluto da página. */
export function navigateToTop() {
  const smoother = ScrollSmoother.get()

  if (smoother) {
    smoother.scrollTo(0, true)
    setTimeout(() => ScrollTrigger.refresh(), 900)
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

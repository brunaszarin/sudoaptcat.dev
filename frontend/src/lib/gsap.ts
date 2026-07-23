'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

// Registra os plugins uma única vez, em algum lugar central — evita repetir
// isso em cada componente que for usar ScrollTrigger/ScrollSmoother
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

  // No mobile, a barra de endereço do navegador aparece/some durante o
  // scroll, disparando eventos de "resize" no meio do caminho — o
  // ScrollTrigger recalcula tudo nesse momento e quebra os pins ativos.
  // Essa config (recomendada pela documentação oficial) ignora esses
  // resizes espúrios de mobile, só recalculando em resizes de verdade.
  ScrollTrigger.config({ ignoreMobileResize: true })
}

export { gsap, ScrollTrigger, ScrollSmoother }

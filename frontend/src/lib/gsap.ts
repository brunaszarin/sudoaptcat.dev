'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'

// Registra os plugins uma única vez, em algum lugar central — evita repetir
// isso em cada componente que for usar ScrollTrigger/ScrollSmoother
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
}

export { gsap, ScrollTrigger, ScrollSmoother }

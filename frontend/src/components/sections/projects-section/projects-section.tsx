'use client'

import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { useCatWalk } from '@/hooks/useCatWalk'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import { SpaceBackground } from './space-background'
import { BuildingsSkyline } from './buildings-skyline'
import { WorldStrip, CAT_ANCHOR } from './world-strip'
import { WalkingCat } from './walking-cat'
import { useFadeIn } from '@/hooks/useFadeIn'
import { ControlsHint } from './controls-hint'
import { useKeyboardScroll } from '@/hooks/useKeyboardScroll'
import { ScrollTrigger } from '@/lib/gsap'
import styles from './projects-section.module.css'

export function ProjectsSection() {
  // Usa o useCatWalk só pelo sectionRef (gatilho do pin + do teclado) —
  // o progresso de verdade agora vem suavizado do ScrollTrigger abaixo
  const { sectionRef } = useCatWalk()
  const { containerRef, offset } = useMouseParallax()
  const { ref: fadeRef, isVisible } = useFadeIn<HTMLElement>(0.01)
  const stickyRef = useRef<HTMLDivElement>(null)
  useKeyboardScroll(sectionRef)

  const [progress, setProgress] = useState(0)
  const [facingLeft, setFacingLeft] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Combina os refs de scroll do gato + fade na seção externa (500vh)
  const setSectionRefs = (node: HTMLElement | null) => {
    sectionRef.current = node
    fadeRef.current = node
  }

  // Combina os refs de paralaxe do mouse + o alvo do pin na div interna
  const setStickyRefs = (node: HTMLDivElement | null) => {
    containerRef.current = node
    stickyRef.current = node
  }

  // Trava a div .sticky na tela enquanto a <section> externa (500vh) rola —
  // usa ScrollTrigger.pin() em vez de position:sticky (compatível com o
  // ScrollSmoother). O mesmo trigger também entrega o progresso via scrub,
  // suavizado (com um pequeno atraso elástico), em vez do valor bruto do
  // scroll — é isso que deixa o andar do gato suave.
  useGSAP(() => {
    if (!sectionRef.current || !stickyRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      pin: stickyRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pinSpacing: false,
      pinType: 'transform',
      scrub: 0.6,
      onUpdate: (self) => {
        setProgress(self.progress)
        if (self.direction === -1) setFacingLeft(true)
        else if (self.direction === 1) setFacingLeft(false)

        // "Anda" só enquanto o scroll está de fato em movimento — desliga
        // sozinho 120ms depois do último disparo, mesma lógica que o
        // useCatWalk original tinha antes da migração pro scrub
        setIsScrolling(true)
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
        scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 120)
      },
    })

    return () => {
      trigger.kill()
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current)
    }
  }, [])

  // O fade-in da seção (fade-section/is-visible) aplica um translateY até
  // a seção aparecer — se o ScrollTrigger calcular a posição do pin antes
  // desse transform "assentar", ele guarda um valor levemente errado.
  // Recalcula assim que o fade termina (mesma duração do CSS: 0.8s).
  useEffect(() => {
    if (!isVisible) return
    const id = setTimeout(() => ScrollTrigger.refresh(), 850)
    return () => clearTimeout(id)
  }, [isVisible])

  // Nos últimos 15% da jornada, o gato "destrava" e anda pra fora pela direita
  const EXIT_START = 0.85
  const catExit =
    progress > EXIT_START
      ? ((progress - EXIT_START) / (1 - EXIT_START)) * 1400
      : 0

  return (
    <section
      id="projects"
      ref={setSectionRefs}
      className={`${styles.projects} fade-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className={styles.sticky} ref={setStickyRefs}>
        <SpaceBackground mouseOffset={offset} />

        <div className={styles.header}>
          <p className={styles.label}>my journey</p>
          <h2 className={styles.title}>some places I&apos;ve been </h2>
        </div>

        <div className={styles.stage}>
          <BuildingsSkyline progress={progress} />
          {/* O mundo que desliza */}
          <WorldStrip progress={progress} />
          <ControlsHint />
          {/* O gato fixo à esquerda */}
          <div
            className={styles.catAnchor}
            style={{
              left: `${CAT_ANCHOR}px`,
              transform: `translateX(${catExit}px)`,
              transition: 'transform 0.4s ease-out',
            }}
          >
            <WalkingCat
              isWalking={isScrolling && progress > 0 && progress < 1}
              facingLeft={facingLeft}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

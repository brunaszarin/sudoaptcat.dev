'use client'

import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
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
  // Só precisamos de uma ref pra seção — o progresso de verdade vem
  // suavizado do ScrollTrigger abaixo (useCatWalk foi removido por rodar
  // um listener de scroll à toa, sem seus valores calculados serem usados)
  const sectionRef = useRef<HTMLElement | null>(null)
  const { containerRef, offset } = useMouseParallax()
  const { ref: fadeRef, isVisible } = useFadeIn<HTMLElement>(0.01)
  const stickyRef = useRef<HTMLDivElement>(null)
  useKeyboardScroll(sectionRef)

  const [progress, setProgress] = useState(0)
  const [facingLeft, setFacingLeft] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [viewportWidth, setViewportWidth] = useState(0)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Largura da viewport, pra calcular quanto o gato precisa andar pra sair
  // de vez da tela (não dá pra usar um valor fixo em px — em telas largas
  // um número fixo pequeno demais deixa o gato "parado" visível à direita)
  useEffect(() => {
    function update() {
      setViewportWidth(window.innerWidth)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

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

  // Largura do sprite do gato (precisa bater com walking-cat.module.css .cat)
  const CAT_WIDTH = 80
  // Margem de segurança extra, mesmo espírito do EXIT_MARGIN em world-strip.tsx
  const EXIT_MARGIN = 60

  // Assim que o mundo termina de deslizar (mesmo corte que o WorldStrip
  // usa pra WORLD_END), o gato sai de vez pela direita — não depende mais
  // de continuar rolando um trecho extra depois disso (0.85 a 1.0), que
  // na prática quase nunca era percorrido, deixando o gato "preso".
  // A distância precisa ser relativa à largura real da tela: um valor fixo
  // pequeno demais deixa o gato visível parado à direita em telas largas.
  const WORLD_END = 0.85
  const catExit =
    progress >= WORLD_END && viewportWidth > 0
      ? viewportWidth - CAT_ANCHOR + CAT_WIDTH + EXIT_MARGIN
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

'use client'

import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import { SpaceBackground } from './space-background'
import { BuildingsSkyline } from './buildings-skyline'
import { WorldStrip, CAT_ANCHOR, getWorldShift, getActiveIndex } from './world-strip'
import { WalkingCat } from './walking-cat'
import { CompanyModal } from './company-modal'
import { useFadeIn } from '@/hooks/useFadeIn'
import { ControlsHint } from './controls-hint'
import { useKeyboardScroll } from '@/hooks/useKeyboardScroll'
import { ScrollTrigger } from '@/lib/gsap'
import { EXPERIENCES, type Experience } from '@/data/experiences'
import styles from './projects-section.module.css'

// Duração da animação do gato "entrando" no prédio antes do modal abrir
const ENTER_ANIMATION_MS = 850

export function ProjectsSection() {
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

  // Estado da interação: qual empresa está no modal (null = fechado), e se
  // o gato está no meio da animação de "entrar" (encolhe antes do modal abrir)
  const [activeExperience, setActiveExperience] = useState<Experience | null>(null)
  const [isEntering, setIsEntering] = useState(false)

  useEffect(() => {
    function update() {
      setViewportWidth(window.innerWidth)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const setSectionRefs = (node: HTMLElement | null) => {
    sectionRef.current = node
    fadeRef.current = node
  }

  const setStickyRefs = (node: HTMLDivElement | null) => {
    containerRef.current = node
    stickyRef.current = node
  }

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

  useEffect(() => {
    if (!isVisible) return
    const id = setTimeout(() => ScrollTrigger.refresh(), 850)
    return () => clearTimeout(id)
  }, [isVisible])

  // Dispara ao clicar/tocar no prédio ou apertar Enter — o gato "entra"
  // (encolhe/some por um instante) e só depois o modal abre
  function handleInteract(experience: Experience) {
    if (isEntering || activeExperience) return
    setIsEntering(true)
    setTimeout(() => {
      setActiveExperience(experience)
    }, ENTER_ANIMATION_MS)
  }

  // O gato só volta a aparecer quando o modal fecha de vez — fica
  // "escondido dentro do prédio" durante toda a leitura do card, não só
  // durante a animação inicial de entrar
  function handleCloseModal() {
    setActiveExperience(null)
    setIsEntering(false)
  }

  // Enter abre a empresa ativa (mesmo gatilho que clicar no prompt/prédio)
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key !== 'Enter') return
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const isSectionActive = rect.top <= 0 && rect.bottom >= window.innerHeight
      if (!isSectionActive) return

      const shift = getWorldShift(progress)
      const index = getActiveIndex(shift)
      if (index >= 0) {
        handleInteract(EXPERIENCES[index])
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [progress, isEntering, activeExperience])

  const CAT_WIDTH = 80
  const EXIT_MARGIN = 60
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
          <WorldStrip progress={progress} onInteract={handleInteract} />
          <ControlsHint />

          {/* O gato fixo à esquerda — encolhe/some brevemente ao "entrar"
              num prédio, antes do modal abrir */}
          <div
            className={styles.catAnchor}
            style={{
              left: `${CAT_ANCHOR}px`,
              transform: `translateX(${catExit}px) scale(${isEntering ? 0.5 : 1})`,
              opacity: isEntering ? 0 : 1,
              transition: 'transform 0.4s ease-out, opacity 0.35s ease, scale 0.35s ease',
            }}
          >
            <WalkingCat
              isWalking={isScrolling && progress > 0 && progress < 1}
              facingLeft={facingLeft}
            />
          </div>
        </div>
      </div>

      <CompanyModal experience={activeExperience} onClose={handleCloseModal} />
    </section>
  )
}

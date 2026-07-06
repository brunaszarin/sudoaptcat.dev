'use client'

import { useCatWalk } from '@/hooks/useCatWalk'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import { SpaceBackground } from './SpaceBackground'
import { WorldStrip, CAT_ANCHOR } from './WorldStrip'
import { WalkingCat } from './WalkingCat'
import { useFadeIn } from '@/hooks/useFadeIn'
import styles from './ProjectsSection.module.css'

export function ProjectsSection() {
  const { sectionRef, progress, isWalking, facingLeft } = useCatWalk()
  const { containerRef, offset } = useMouseParallax()
 const { ref: fadeRef, isVisible } = useFadeIn<HTMLElement>(0.01)

  // Combina os dois refs (scroll do gato + fade) no mesmo elemento
  const setRefs = (node: HTMLElement | null) => {
    sectionRef.current = node
    fadeRef.current = node
  }

  // Nos últimos 15% da jornada, o gato "destrava" e anda pra fora pela direita
  const EXIT_START = 0.85
  const catExit =
    progress > EXIT_START
      ? ((progress - EXIT_START) / (1 - EXIT_START)) * 1400
      : 0

  return (
    <section
      id="projects"
      ref={setRefs}
      className={`${styles.projects} fade-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className={styles.sticky} ref={containerRef}>
        <SpaceBackground mouseOffset={offset} />

        <div className={styles.header}>
          <p className={styles.label}>// my journey</p>
          <h2 className={styles.title}>where the cat has walked</h2>
        </div>

        <div className={styles.stage}>
          {/* O mundo que desliza */}
          <WorldStrip progress={progress} />

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
              isWalking={progress > 0 && progress < 1}
              facingLeft={facingLeft}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
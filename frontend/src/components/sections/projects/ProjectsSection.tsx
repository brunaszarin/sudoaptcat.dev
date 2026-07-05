'use client'

import { useCatWalk } from '@/hooks/useCatWalk'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import { TimelineScenery } from './TimelineScenery'
import { WorldStrip, CAT_ANCHOR } from './WorldStrip'
import { WalkingCat } from './WalkingCat'
import styles from './ProjectsSection.module.css'

export function ProjectsSection() {
  const { sectionRef, progress, isWalking } = useCatWalk()
  const { containerRef, offset } = useMouseParallax()

   // Nos últimos 10% da jornada, o gato "destrava" e anda pra fora pela direita
  const EXIT_START = 0.85
  const catExit =
    progress > EXIT_START
      ? ((progress - EXIT_START) / (1 - EXIT_START)) * 1400
      : 0

  return (
    <section id="projects" ref={sectionRef} className={styles.projects}>
      <div className={styles.sticky} ref={containerRef}>
        <TimelineScenery progress={progress} mouseOffset={offset} />

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
            }}
          >
            <WalkingCat isWalking={progress > 0 && progress < 1} />
          </div>
        </div>
      </div>
    </section>
  )
}
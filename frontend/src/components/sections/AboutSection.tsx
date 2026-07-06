'use client'

import { useScrollParallax } from '@/hooks/useScrollParallax'
import { ParallaxBackground } from './ParallaxBackground'
import { useFadeIn } from '@/hooks/useFadeIn'
import styles from './AboutSection.module.css'

export function AboutSection() {
  const { elementRef, offset } = useScrollParallax(0.50)
  const { ref: fadeRef, isVisible } = useFadeIn<HTMLElement>()

  return (
    <section
      id="about"
      ref={fadeRef}
      className={`${styles.about} fade-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div ref={elementRef} className={styles.bgWrap}>
        <ParallaxBackground offset={{ x: 0, y: offset }} />
      </div>

      <div className={styles.content}>
        <p className={styles.label}>about me</p>
        <h2 className={styles.title}>nice to meet you</h2>
        <div className={styles.bio}>
          <p>
            I'm a frontend-focused Fullstack Developer with expertise in React,
            Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind and Sass.
          </p>
          <p>
            Experienced in developing and integrating solutions across insurance
            systems, e-commerce ecosystems and logistics ERPs, handling complex
            business rules and data-driven applications. Solid backend experience
            with Node, Python, C# and Java, working with REST and GraphQL APIs.
          </p>
          <p>
            Proficient with Git (GitHub, GitLab), testing (Jest, React Testing
            Library), and Agile methodologies (Scrum, Kanban). Focused on
            performance, scalability, maintainability and clean code.
          </p>
        </div>
      </div>
    </section>
  )
}
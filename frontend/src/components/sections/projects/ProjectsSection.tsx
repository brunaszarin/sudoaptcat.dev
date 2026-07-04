'use client'

import { EXPERIENCES } from '@/data/experiences'
import { useCatWalk } from '@/hooks/useCatWalk'
import { TimelinePath, ROW_YS } from './TimelinePath'
import { CompanyHouse } from './CompanyHouse'
import { WalkingCat } from './WalkingCat'
import styles from './ProjectsSection.module.css'

// Onde cada casinha fica (x do canto da casa), alternando lados
const HOUSE_XS = [512, 134, 512, 134, 512]

// Onde o texto de cada empresa fica (centro do label)
const LABEL_XS = [536, 158, 536, 158, 536]

export function ProjectsSection() {
  const { sectionRef, cat } = useCatWalk()

  return (
<section id="projects" ref={sectionRef} className={styles.projects}>
      <div className={styles.sticky}>
        <div className={styles.header}>
          <p className={styles.label}>// my journey</p>
          <h2 className={styles.title}>where the cat has walked</h2>
        </div>

        <div className={styles.mapWrap}>
        <svg
          className={styles.map}
          viewBox="0 0 680 760"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="Timeline of companies where Bruna has worked"
        >
          {/* Símbolos de código decorativos ao fundo */}
          <g className={styles.codeSymbols} aria-hidden="true">
            <text x="300" y="50" className={styles.sym}>&lt;/&gt;</text>
            <text x="470" y="195" className={styles.sym}>{'{ }'}</text>
            <text x="300" y="335" className={styles.sym}>/</text>
            <text x="470" y="475" className={styles.sym}>&lt;&gt;</text>
            <text x="300" y="615" className={styles.sym}>;</text>
          </g>

          {/* O caminho serpenteante */}
          <TimelinePath />

          {/* As casinhas + textos de cada empresa */}
          {EXPERIENCES.map((exp, i) => (
            <g key={exp.id}>
              <CompanyHouse x={HOUSE_XS[i]} y={ROW_YS[i] - 44} />
              <text
                x={LABEL_XS[i]}
                y={ROW_YS[i] + 38}
                className={styles.company}
                textAnchor="middle"
              >
                {exp.company}
              </text>
              <text
                x={LABEL_XS[i]}
                y={ROW_YS[i] + 56}
                className={styles.period}
                textAnchor="middle"
              >
                {exp.period}
              </text>
            </g>
          ))}

 {/* Gatinho que caminha pelo caminho conforme o scroll */}
          <WalkingCat
            x={cat.x}
            y={cat.y}
            facingLeft={cat.facingLeft}
            isWalking={cat.isWalking}
    />
        </svg>
      </div>
    </div>
    </section>
  )
}
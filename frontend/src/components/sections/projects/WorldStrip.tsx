import { EXPERIENCES } from '@/data/experiences'
import { CompanyHouse } from './CompanyHouse'
import { CompanyCard } from './CompanyCard'
import styles from './WorldStrip.module.css'

// Distância entre cada empresa (em px na faixa do mundo)
const STOP_SPACING = 620
// Onde a primeira empresa começa
const FIRST_STOP = 400
// Largura total da faixa do mundo
export const WORLD_WIDTH =
  FIRST_STOP + STOP_SPACING * (EXPERIENCES.length - 1) + 2000

// A posição X de cada empresa na faixa
export function stopX(index: number) {
  return FIRST_STOP + index * STOP_SPACING
}

// Onde o gato fica fixo na tela (px da esquerda)
export const CAT_ANCHOR = 140

interface WorldStripProps {
  progress: number
}

export function WorldStrip({ progress }: WorldStripProps) {
  // O mundo termina de deslizar em 85% do scroll (o resto é pro gato sair)
  const WORLD_END = 0.85
  const worldProgress = Math.min(1, progress / WORLD_END)
  const maxShift = stopX(EXPERIENCES.length - 1) - CAT_ANCHOR - 200
  const shift = worldProgress * maxShift

  return (
    <div
      className={styles.world}
      style={{
        width: `${WORLD_WIDTH}px`,
        transform: `translateX(${-shift}px)`,
      }}
    >
      {/* Chão */}
      <div className={styles.ground} />
      <div className={styles.groundTop} />

      {/* Casinhas + cards de cada empresa */}
      {EXPERIENCES.map((exp, i) => {
        // Quão "ativa" está esta empresa (o gato está na frente dela?)
        const catWorldX = shift + CAT_ANCHOR
        const distance = Math.abs(catWorldX - stopX(i))
        const isActive = distance < STOP_SPACING / 2.2

        return (
          <div key={exp.id}>
            {/* Casinha */}
            <div
              className={styles.house}
              style={{ left: `${stopX(i) - 70}px` }}
            >
              <CompanyHouse />
            </div>

            {/* Card com detalhes */}
            <div
              className={`${styles.cardSlot} ${isActive ? styles.cardActive : ''}`}
              style={{ left: `${stopX(i) + 60}px` }}
            >
              <CompanyCard experience={exp} />
            </div>
          </div>
        )
      })}
    </div>
  )
}
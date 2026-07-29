'use client'

import Image from 'next/image'
import { EXPERIENCES, type Experience } from '@/data/experiences'
import styles from './world-strip.module.css'

// Distância entre cada empresa (em px na faixa do mundo)
const STOP_SPACING = 900
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

// Largura do card (usada só pro cálculo de quanto o mundo precisa deslizar)
const CARD_WIDTH = 280
// Margem de segurança extra pra garantir que tudo saiu de vez da tela,
// independente do tamanho do dispositivo
const EXIT_MARGIN = 60

// O mundo termina de deslizar em 85% do scroll (o resto é pro gato sair)
const WORLD_END = 0.85

// Distância (em px) que o gato precisa estar do centro do prédio pra ele
// ficar "ativo" (calibrado pela largura real do prédio, ±90px do centro)
const ACTIVE_THRESHOLD = 100

// Largura fixa em que cada prédio é renderizado (precisa bater com
// .house { width: 180px } no CSS) — usada pra calcular a altura visual
// real de cada foto, já que elas têm proporções diferentes entre si
const HOUSE_RENDER_WIDTH = 180

// Margem de sobra entre o topo do prédio e o prompt de interação
const PROMPT_MARGIN_ABOVE = 30

// Os 3 prédios em foto, alternados por índice (1, 2, 3, 1, 2, 3...) —
// cada um com suas dimensões reais (proporções diferentes entre si), pro
// Next.js calcular a proporção certa e não "flutuarem" fora do chão
const BUILDING_IMAGES = [
  { src: '/assets/building1.png', width: 429, height: 726 },
  { src: '/assets/building2.png', width: 424, height: 569 },
  { src: '/assets/building3.png', width: 388, height: 815 },
]

export function getWorldShift(progress: number) {
  const worldProgress = Math.min(1, progress / WORLD_END)
  const lastCardRightEdge = stopX(EXPERIENCES.length - 1) + 60 + CARD_WIDTH
  const maxShift = lastCardRightEdge + EXIT_MARGIN - CAT_ANCHOR
  return worldProgress * maxShift
}

// Qual empresa está "na mira" do gato pra um dado deslocamento do mundo —
// usada tanto aqui (destacar o prédio) quanto no ProjectsSection (saber
// se a tecla Enter deve abrir alguma coisa)
export function getActiveIndex(shift: number): number {
  const catWorldX = shift + CAT_ANCHOR
  for (let i = 0; i < EXPERIENCES.length; i++) {
    if (Math.abs(catWorldX - stopX(i)) < ACTIVE_THRESHOLD) {
      return i
    }
  }
  return -1
}

interface WorldStripProps {
  progress: number
  onInteract: (experience: Experience) => void
}

export function WorldStrip({ progress, onInteract }: WorldStripProps) {
  const shift = getWorldShift(progress)
  const activeIndex = getActiveIndex(shift)

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

      {/* Postes de luz — um no meio do caminho entre cada par de prédios,
          com a luz tremulando e vagalumes de pixel voando ao redor */}
      {EXPERIENCES.slice(0, -1).map((exp, i) => {
        const lampX = (stopX(i) + stopX(i + 1)) / 2
        return (
          <div
            key={`lamp-${exp.id}`}
            className={styles.streetlamp}
            style={{ left: `${lampX}px` }}
          >
            <Image src="/assets/streetlamp.png" alt="" width={75} height={457} />
            <div className={styles.lampGlow} />
            <span className={`${styles.firefly} ${styles.fireflyA}`} />
            <span className={`${styles.firefly} ${styles.fireflyB}`} />
            <span className={`${styles.firefly} ${styles.fireflyC}`} />
          </div>
        )
      })}

      {/* Prédios de cada empresa */}
      {EXPERIENCES.map((exp, i) => {
        const isActive = i === activeIndex
        const building = BUILDING_IMAGES[i % BUILDING_IMAGES.length]

        return (
          <div key={exp.id}>
            {/* Prompt de interação — só aparece quando o gato está na
                frente desse prédio específico */}
            {isActive && (
              <button
                className={styles.prompt}
                style={{
                  left: `${stopX(i)}px`,
                  bottom: `${158 + (HOUSE_RENDER_WIDTH * building.height) / building.width + PROMPT_MARGIN_ABOVE}px`,
                }}
                onClick={() => onInteract(exp)}
              >
                press ENTER or tap to open
              </button>
            )}

            {/* Prédio — alterna entre as 3 fotos conforme a ordem, com
                um leve destaque quando está ativo */}
            <button
              className={`${styles.house} ${isActive ? styles.houseActive : ''}`}
              style={{ left: `${stopX(i) - 90}px` }}
              onClick={() => isActive && onInteract(exp)}
              tabIndex={-1}
              aria-label={isActive ? `open ${exp.company}` : undefined}
            >
              <Image
                src={building.src}
                alt=""
                width={building.width}
                height={building.height}
                className={styles.houseImage}
              />
            </button>
          </div>
        )
      })}
    </div>
  )
}

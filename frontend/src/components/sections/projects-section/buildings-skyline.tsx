import { getWorldShift } from './world-strip'
import styles from './buildings-skyline.module.css'

interface BuildingsSkylineProps {
  progress: number
}

// Uma camada por profundidade: cada uma se move numa velocidade diferente
// em relação ao mundo em primeiro plano, sempre na direção OPOSTA (reforça
// a sensação de profundidade — parecem ficar "pra trás" conforme o gato
// caminha). Quanto mais longe (far), mais devagar; quanto mais perto
// (near), mais rápido — imita como o olho percebe camadas de distância
// reais.
const LAYERS = [
  { src: '/assets/city-far.svg', factor: -0.06, className: 'far' },
  { src: '/assets/city-mid.svg', factor: -0.13, className: 'mid' },
  { src: '/assets/city-near.svg', factor: -0.22, className: 'near' },
] as const

export function BuildingsSkyline({ progress }: BuildingsSkylineProps) {
  const worldShift = getWorldShift(progress)

  return (
    <div className={styles.skylineWrap} aria-hidden="true">
      {LAYERS.map(({ src, factor, className }) => (
        <div
          key={src}
          className={`${styles.layer} ${styles[className]}`}
          style={{
            backgroundImage: `url(${src})`,
            transform: `translateX(${worldShift * factor}px)`,
          }}
        />
      ))}
    </div>
  )
}

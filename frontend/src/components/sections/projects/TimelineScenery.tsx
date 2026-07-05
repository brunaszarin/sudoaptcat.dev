import { SceneryLayer } from './SceneryLayer'
import styles from './TimelineScenery.module.css'

interface TimelineSceneryProps {
  progress: number
  mouseOffset: { x: number; y: number }
}

export function TimelineScenery({ progress, mouseOffset }: TimelineSceneryProps) {
  return (
    <div className={styles.scenery} aria-hidden="true">
      {/* CAMADA 1 — céu: estrelas, sparkles, lua (move quase nada) */}
      <SceneryLayer depth={15} progress={progress} mouseOffset={mouseOffset}>
        <svg viewBox="0 0 680 500" preserveAspectRatio="xMidYMid meet" shapeRendering="crispEdges">
          <g fill="#aaff00">
            <rect x="80" y="45" width="2" height="2" opacity="0.5" />
            <rect x="200" y="75" width="2" height="2" opacity="0.35" />
            <rect x="350" y="40" width="2" height="2" opacity="0.5" />
            <rect x="480" y="60" width="2" height="2" opacity="0.4" />
            <rect x="600" y="48" width="2" height="2" opacity="0.45" />
            <rect x="140" y="120" width="2" height="2" opacity="0.3" />
            <rect x="420" y="110" width="2" height="2" opacity="0.35" />
          </g>
          {/* lua pixel */}
          <g>
            <rect x="562" y="38" width="30" height="30" fill="#2f5d00" />
            <rect x="568" y="32" width="18" height="6" fill="#2f5d00" />
            <rect x="568" y="68" width="18" height="6" fill="#2f5d00" />
            <rect x="556" y="44" width="6" height="18" fill="#2f5d00" />
            <rect x="592" y="44" width="6" height="18" fill="#2f5d00" />
            <rect x="570" y="44" width="8" height="8" fill="#3b6d11" />
            <rect x="580" y="56" width="6" height="6" fill="#3b6d11" />
          </g>
          {/* sparkles */}
          <g fill="#aaff00" className={styles.sparkles}>
            <text x="150" y="60" fontSize="16" className={styles.sp1}>✦</text>
            <text x="300" y="52" fontSize="12" className={styles.sp2}>✧</text>
            <text x="450" y="68" fontSize="14" className={styles.sp3}>✦</text>
            <text x="580" y="90" fontSize="11" className={styles.sp1}>✧</text>
          </g>
        </svg>
      </SceneryLayer>

      {/* CAMADA 2 — nuvens distantes (move pouco) */}
      <SceneryLayer depth={30} progress={progress} mouseOffset={mouseOffset}>
        <svg viewBox="0 0 680 500" preserveAspectRatio="xMidYMid meet" shapeRendering="crispEdges">
          <g fill="#152210">
            <g>
              <rect x="60" y="150" width="90" height="18" />
              <rect x="75" y="140" width="60" height="12" />
              <rect x="90" y="132" width="30" height="10" />
              <rect x="50" y="160" width="110" height="10" />
            </g>
            <g>
              <rect x="380" y="135" width="100" height="18" />
              <rect x="400" y="125" width="65" height="12" />
              <rect x="418" y="118" width="32" height="9" />
              <rect x="370" y="145" width="120" height="10" />
            </g>
          </g>
        </svg>
      </SceneryLayer>

      {/* CAMADA 3 — nuvens próximas (move um pouco mais) */}
      <SceneryLayer depth={50} progress={progress} mouseOffset={mouseOffset}>
        <svg viewBox="0 0 680 500" preserveAspectRatio="xMidYMid meet" shapeRendering="crispEdges">
          <g>
            <g>
              <rect x="120" y="200" width="130" height="26" fill="#1f3310" />
              <rect x="145" y="185" width="85" height="16" fill="#1f3310" />
              <rect x="168" y="175" width="42" height="12" fill="#264012" />
              <rect x="108" y="217" width="155" height="14" fill="#1a2c0d" />
              <rect x="145" y="185" width="85" height="5" fill="#3b6d11" opacity="0.6" />
            </g>
            <g>
              <rect x="470" y="190" width="120" height="24" fill="#1f3310" />
              <rect x="492" y="177" width="80" height="14" fill="#1f3310" />
              <rect x="512" y="168" width="40" height="11" fill="#264012" />
              <rect x="458" y="206" width="145" height="13" fill="#1a2c0d" />
              <rect x="492" y="177" width="80" height="5" fill="#3b6d11" opacity="0.6" />
            </g>
          </g>
        </svg>
      </SceneryLayer>

      {/* CAMADA 4 — floresta silhueta (move médio) */}
      <SceneryLayer depth={75} progress={progress} mouseOffset={mouseOffset}>
        <svg viewBox="0 0 680 500" preserveAspectRatio="xMidYMid meet" shapeRendering="crispEdges">
          <g fill="#1a2900">
            <polygon points="0,330 45,255 90,330" />
            <polygon points="75,330 130,240 185,330" />
            <polygon points="380,330 430,250 480,330" />
            <polygon points="470,330 525,238 580,330" />
            <polygon points="575,330 625,247 675,330" />
            <rect x="0" y="325" width="680" height="20" />
          </g>
        </svg>
      </SceneryLayer>
    </div>
  )
}
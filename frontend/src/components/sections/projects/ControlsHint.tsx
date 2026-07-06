import styles from './ControlsHint.module.css'

export function ControlsHint() {
  return (
    <div className={styles.hint} aria-hidden="true">
      <div className={`${styles.border} ${styles.clip}`} />
      <div className={`${styles.fill} ${styles.clip}`} />

      <div className={styles.content}>
        {/* Ícone de mouse pixel */}
        <svg className={styles.icon} viewBox="0 0 10 14" shapeRendering="crispEdges">
          <rect x="2" y="0" width="6" height="1" fill="currentColor" />
          <rect x="1" y="1" width="8" height="1" fill="currentColor" />
          <rect x="0" y="2" width="10" height="8" fill="currentColor" />
          <rect x="1" y="10" width="8" height="1" fill="currentColor" />
          <rect x="2" y="11" width="6" height="1" fill="currentColor" />
          <rect x="4" y="3" width="2" height="3" fill="#0a0a0a" />
        </svg>

        <span className={styles.text}>scroll</span>

        <span className={styles.divider}>or use</span>

        {/* Seta esquerda pixel */}
        <svg className={styles.key} viewBox="0 0 12 12" shapeRendering="crispEdges">
          <rect x="0" y="0" width="12" height="12" fill="currentColor" />
          <rect x="1" y="1" width="10" height="10" fill="#0a0a0a" />
          <rect x="6" y="3" width="1" height="6" fill="currentColor" />
          <rect x="5" y="4" width="1" height="4" fill="currentColor" />
          <rect x="4" y="5" width="1" height="2" fill="currentColor" />
          <rect x="3" y="6" width="6" height="1" fill="currentColor" />
        </svg>

        {/* Seta direita pixel */}
        <svg className={styles.key} viewBox="0 0 12 12" shapeRendering="crispEdges">
          <rect x="0" y="0" width="12" height="12" fill="currentColor" />
          <rect x="1" y="1" width="10" height="10" fill="#0a0a0a" />
          <rect x="5" y="3" width="1" height="6" fill="currentColor" />
          <rect x="6" y="4" width="1" height="4" fill="currentColor" />
          <rect x="7" y="5" width="1" height="2" fill="currentColor" />
          <rect x="3" y="6" width="6" height="1" fill="currentColor" />
        </svg>
      </div>
    </div>
  )
}
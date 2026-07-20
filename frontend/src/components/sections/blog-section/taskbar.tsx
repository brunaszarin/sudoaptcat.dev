import styles from './blog-section.module.css'

interface TaskbarProps {
  clock: string
}

export function Taskbar({ clock }: TaskbarProps) {
  return (
    <div className={styles.taskbar}>
      <div className={styles.startButton}>
        <svg width="14" height="14" viewBox="0 0 8 8" shapeRendering="crispEdges" fill="currentColor">
          <rect x="0" y="0" width="3" height="3" />
          <rect x="4" y="0" width="4" height="3" />
          <rect x="0" y="4" width="3" height="4" />
          <rect x="4" y="4" width="4" height="4" />
        </svg>
        <span>start</span>
      </div>
      <span className={styles.clock}>{clock}</span>
    </div>
  )
}

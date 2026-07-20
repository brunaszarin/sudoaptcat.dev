import styles from './blog-section.module.css'

interface DialogAction {
  label: string
  onClick: () => void
  variant?: 'ok' | 'ghost'
}

interface SystemDialogProps {
  icon: string
  message: string
  actions: DialogAction[]
  onClose: () => void
}

export function SystemDialog({ icon, message, actions, onClose }: SystemDialogProps) {
  return (
    <div className={styles.errorOverlay} onClick={onClose}>
      <div className={styles.errorWindow} onClick={(e) => e.stopPropagation()}>
        <div className={styles.errorBorder} />
        <div className={styles.errorInner}>
          <div className={styles.errorBar}>
            <span className={styles.errorBarTitle}>system</span>
            <button className={styles.errorClose} onClick={onClose}>✕</button>
          </div>
          <div className={styles.errorBody}>
            <span className={styles.errorIcon}>{icon}</span>
            <p className={styles.errorMessage}>{message}</p>
          </div>
          <div className={styles.errorActions}>
            {actions.map((action) => (
              <button
                key={action.label}
                className={action.variant === 'ghost' ? styles.errorGhost : styles.errorOk}
                onClick={action.onClick}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

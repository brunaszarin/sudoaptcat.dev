'use client'

import { useRef, useState } from 'react'
import styles from './blog-section.module.css'

interface DialogAction {
  label: string
  onClick: () => void
  variant?: 'ok' | 'ghost' | 'filled'
}

interface SystemDialogProps {
  icon: string
  message: string
  actions: DialogAction[]
  onClose: () => void
  /** Desloca a posição inicial do popup pra direita (px) — 0 = centralizado */
  offsetX?: number
  /** Permite arrastar o popup pela barra de título */
  draggable?: boolean
}

function actionClassName(variant?: DialogAction['variant']) {
  if (variant === 'ghost') return styles.errorGhost
  if (variant === 'filled') return styles.errorFilled
  return styles.errorOk
}

export function SystemDialog({
  icon,
  message,
  actions,
  onClose,
  offsetX = 0,
  draggable = false,
}: SystemDialogProps) {
  const [drag, setDrag] = useState({ x: 0, y: 0 })
  const dragState = useRef<{ startX: number; startY: number; originX: number; originY: number } | null>(null)

  function handlePointerDown(e: React.PointerEvent) {
    if (!draggable) return
    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: drag.x,
      originY: drag.y,
    }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragState.current) return
    const { startX, startY, originX, originY } = dragState.current
    setDrag({
      x: originX + (e.clientX - startX),
      y: originY + (e.clientY - startY),
    })
  }

  function handlePointerUp(e: React.PointerEvent) {
    dragState.current = null
    e.currentTarget.releasePointerCapture(e.pointerId)
  }

  return (
    <div
      className={styles.errorOverlay}
      onClick={onClose}
      style={offsetX ? { justifyContent: 'flex-end', paddingRight: `${offsetX}px` } : undefined}
    >
      <div
        className={styles.errorWindow}
        onClick={(e) => e.stopPropagation()}
        style={{ transform: `translate(${drag.x}px, ${drag.y}px)` }}
      >
        <div className={styles.errorBorder} />
        <div className={styles.errorInner}>
          <div
            className={`${styles.errorBar} ${draggable ? styles.errorBarDraggable : ''}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
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
                className={actionClassName(action.variant)}
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

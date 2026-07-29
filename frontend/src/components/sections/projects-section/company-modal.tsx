'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Experience } from '@/data/experiences'
import styles from './company-modal.module.css'

interface CompanyModalProps {
  experience: Experience | null
  onClose: () => void
}

export function CompanyModal({ experience, onClose }: CompanyModalProps) {
  // Só renderiza o portal depois de montar no cliente — document.body não
  // existe durante SSR
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Fecha com Escape, além do clique fora / botão ✕
  useEffect(() => {
    if (!experience) return
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [experience, onClose])

  const isOpen = experience !== null

  if (!mounted) return null

  return createPortal(
    <div
      className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      {experience && (
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <div className={`${styles.border} ${styles.clip}`} />
          <div className={`${styles.fill} ${styles.clip}`}>
            <button className={styles.close} onClick={onClose} aria-label="close">
              ✕
            </button>

            <p className={styles.period}>
              {experience.period} · {experience.location}
            </p>
            <h3 className={styles.company}>{experience.company}</h3>
            <p className={styles.role}>{experience.role}</p>
            <p className={styles.description}>{experience.description}</p>

            <div className={styles.techs}>
              {experience.technologies.map((tech) => (
                <span key={tech} className={styles.tech}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body
  )
}

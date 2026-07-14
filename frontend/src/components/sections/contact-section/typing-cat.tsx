'use client'

import { useEffect, useState } from 'react'
import styles from './typing-cat.module.css'

const FRAMES = [
  '/assets/computer1.png',
  '/assets/computer2.png',
  '/assets/computer3.png',
]

export function TypingCat() {
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    function tick(next: number) {
      setFrame(next)
      // Digita rápido por alguns frames, depois pausa
      const isPausePoint = next === 0
      const delay = isPausePoint ? 1400 : 220
      timeout = setTimeout(() => {
        tick((next + 1) % FRAMES.length)
      }, delay)
    }

    tick(0)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <img
      src={FRAMES[frame]}
      alt="pixel cat typing on a computer"
      className={styles.cat}
    />
  )
}
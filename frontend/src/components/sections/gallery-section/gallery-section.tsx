'use client'

import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { useFadeIn } from '@/hooks/useFadeIn'
import { ScrollTrigger } from '@/lib/gsap'
import styles from './gallery-section.module.css'

const IMAGES = [
  '/assets/projects/1.png',
  '/assets/projects/2.png',
  '/assets/projects/3.png',
  '/assets/projects/4.png',
  '/assets/projects/5.png',
  '/assets/projects/6.png',
]

export function GallerySection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const { ref: fadeRef, isVisible } = useFadeIn<HTMLElement>(0.01)

  const [progress, setProgress] = useState(0)

  const setSectionRefs = (node: HTMLElement | null) => {
    sectionRef.current = node
    fadeRef.current = node
  }

  useGSAP(() => {
    if (!sectionRef.current || !stickyRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      pin: stickyRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pinSpacing: false,
      pinType: 'transform',
      scrub: 0.6,
      onUpdate: (self) => {
        setProgress(self.progress)
      },
    })

    return () => trigger.kill()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    const id = setTimeout(() => ScrollTrigger.refresh(), 850)
    return () => clearTimeout(id)
  }, [isVisible])

  // O deslocamento máximo é medido direto no DOM (largura real da
  // trilha de imagens menos a largura da tela) — evita ter que calcular
  // manualmente com base no número/tamanho de imagens, como fizemos com
  // os prédios da seção Projects
  const [maxShift, setMaxShift] = useState(0)

  useEffect(() => {
    function measure() {
      if (!trackRef.current) return
      const trackWidth = trackRef.current.scrollWidth
      const viewportWidth = window.innerWidth
      setMaxShift(Math.max(0, trackWidth - viewportWidth + viewportWidth * 0.06))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <section
      id="gallery"
      ref={setSectionRefs}
      className={`${styles.gallery} fade-section ${isVisible ? 'is-visible' : ''}`}
      style={{ height: `calc(100vh + ${IMAGES.length * 60}vh)` }}
    >
      <div className={styles.sticky} ref={stickyRef}>
        <div className={styles.header}>
          <p className={styles.label}>a peek behind the scenes</p>
          <h2 className={styles.title}>how i build things<span style={{ color: 'var(--color-neon)' }}>.</span></h2>
        </div>

        <div
          className={styles.track}
          ref={trackRef}
          style={{ transform: `translateX(-${progress * maxShift}px)` }}
        >
          {IMAGES.map((src) => (
            <div key={src} className={styles.panel}>
              <Image src={src} alt="" width={1200} height={675} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

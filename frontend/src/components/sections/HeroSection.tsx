'use client'

import Image from 'next/image'
import { SchrodingerCat } from './SchrodingerCat'
import { useMouseParallax } from '@/hooks/useMouseParallax'
import { ParallaxBackground } from './ParallaxBackground'
import { FloatingElements } from './FloatingElements'
import { PixelButton } from '@/components/ui/PixelButton'
import { useFadeIn } from '@/hooks/useFadeIn'
import styles from './HeroSection.module.css'

export function HeroSection() {
  const { containerRef, offset } = useMouseParallax()
  const { ref: fadeRef, isVisible } = useFadeIn()

  return (
     <section
      id="home"
      ref={fadeRef}
      className={`${styles.hero} fade-section section-fade-bottom ${isVisible ? 'is-visible' : ''}`}
    >
      <ParallaxBackground offset={offset} />
      <FloatingElements />
      {/* Imagem flutuante — canto superior esquerdo */}
      <div
        className={styles.floatImgTopLeft}
        style={{
          transform: `translate(${offset.x * 14}px, ${offset.y * 14}px)`,
        }}
      >
        <Image
          src="/assets/coracao.png"
          alt=""
          width={20}
          height={20}
          className={styles.floatImg}
          aria-hidden="true"
        />
      </div>

      {/* Imagem flutuante — canto inferior direito */}
      <div
        className={styles.floatImgBottomRight}
        style={{
          transform: `translate(${offset.x * 30}px, ${offset.y * 30}px)`,
        }}
      >
        <Image
          src="/assets/bun.png"
          alt=""
          width={30}
          height={30}
          className={styles.floatImg}
          aria-hidden="true"
        />
      </div>
      <div className={styles.content}>
        {/* Texto à esquerda */}
        <div
          className={styles.text}
          style={{
            transform: `translate(${offset.x * -5}px, ${offset.y * -5}px)`,
          }}
        >
          <p className={styles.tag}>hi, i'm bruna szarin 👋🏻</p>
          <h1 className={styles.title}>
            a fullstack software engineer.
          </h1>
          <p className={styles.subtitle}>
            I build things for the web (and pet cats)

          </p>
          <div className={styles.buttons}>
            <PixelButton variant="green">my work</PixelButton>
            <PixelButton
              variant="ghost"
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              about me
            </PixelButton>
          </div>
        </div>

        {/* Gato de Schrödinger — reage ao mouse e sai da caixa no hover */}
        <div
          className={styles.catWrap}
          style={{
            transform: `translate(${offset.x * 20}px, ${offset.y * 20}px)`,
          }}
        >
          <SchrodingerCat width={350} height={350} />
        </div>
      </div>
    </section>
  )
}
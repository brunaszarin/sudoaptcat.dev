'use client'

import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import { useFadeIn } from '@/hooks/useFadeIn'
import { ScrollTrigger } from '@/lib/gsap'
import styles from './ecommerce-section.module.css'

// Quantos "capítulos" a seção tem — cada um cobre um tema diferente da
// especialização em Shopify, com seu próprio texto e produto caindo
const CHAPTERS = [
  {
    label: 'expert in ecommerce',
    heading: 'shopify development',
    desc: "10+ years building fast, conversion-focused Shopify storefronts for brands across different industries.",
  },
  {
    label: 'theme development',
    heading: "Liquid, at the core of every store I build",
    desc: "Over 10 years working with Shopify's templating language — building fast, maintainable themes from scratch or customizing existing ones to fit exactly what a brand needs.",
  },
  {
    label: 'online store 2.0',
    heading: 'Sections, blocks, and merchant-friendly themes',
    desc: 'JSON templates, sections and blocks, Metafields and Metaobjects — building storefronts merchants can actually customize themselves, without touching code.',
  },
  {
    label: 'checkout extensibility',
    heading: 'The last step of the purchase, done right',
    desc: 'Custom checkout experiences and A/B-tested improvements to reduce drop-off — every friction point removed between "add to cart" and "order confirmed."',
  },
  {
    label: 'payments & shipping',
    heading: 'Integrating the tools that make a sale real',
    desc: 'Payment gateway and shipping provider integrations — connecting storefronts to the infrastructure that actually gets products to customers.',
  },
  {
    label: 'app development',
    heading: 'Custom apps that extend what Shopify can do',
    desc: "Building and integrating Shopify apps — connecting stores to ERPs, marketing platforms, and whatever custom tooling a business needs.",
  },
  {
    label: 'storefront & admin api',
    heading: 'GraphQL, REST, and webhooks that just work',
    desc: "I've implemented GA4, Google Tag Manager, Meta Pixel, and the Facebook Conversions API — configuring purchase, add-to-cart, and checkout events with accurate attribution.",
  },
  {
    label: 'performance',
    heading: "Fast stores convert. I make sure they're fast",
    desc: 'Lighthouse, PageSpeed Insights, Core Web Vitals, Microsoft Clarity, and Hotjar — monitoring performance and user behavior to find bottlenecks across the whole customer journey.',
  },
  {
    label: 'industries',
    heading: 'Different industries, the same care for detail',
    desc: 'DTC fashion, health & wellness, InsurTech, FinTech, SaaS, and logistics — building customer-facing web applications and scalable frontend solutions across very different businesses.',
  },
]

// Produtos que caem dentro da sacola — um por capítulo, na mesma ordem
const PRODUCTS = [
  { src: '/assets/shoe.png', width: 203, height: 158, name: 'Shopify' },
  { src: '/assets/lipstick.png', width: 62, height: 182, name: 'Liquid' },
  { src: '/assets/dress.png', width: 157, height: 196, name: 'Custom Themes' },
  { src: '/assets/shoe.png', width: 203, height: 158, name: 'Checkout Ext.' },
  { src: '/assets/perfume.png', width: 151, height: 201, name: 'Payments' },
  { src: '/assets/computer.png', width: 179, height: 161, name: 'App Dev' },
  { src: '/assets/camera.png', width: 214, height: 158, name: 'Storefront API' },
  { src: '/assets/book.png', width: 151, height: 172, name: 'Performance' },
  { src: '/assets/blush.png', width: 129, height: 184, name: 'Industries' },
]

// A sacola só "chega" (fade + desliza) depois desse tanto de scroll —
// o texto já aparece de cara, criando uma entrada assíncrona
const BAG_REVEAL_THRESHOLD = 0.03

export function EcommerceSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const { ref: fadeRef, isVisible } = useFadeIn<HTMLElement>(0.01)

  const [progress, setProgress] = useState(0)
  const [bagVisible, setBagVisible] = useState(false)

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

  const currentStep = Math.min(CHAPTERS.length - 1, Math.floor(progress * CHAPTERS.length))

  useEffect(() => {
    setBagVisible(progress > BAG_REVEAL_THRESHOLD)
  }, [progress])

  return (
    <section
      id="ecommerce"
      ref={setSectionRefs}
      className={`${styles.ecommerce} fade-section ${isVisible ? 'is-visible' : ''}`}
      style={{ height: `calc(100vh + ${CHAPTERS.length * 70}vh)` }}
    >
      <div className={styles.sticky} ref={stickyRef}>
        <div className={styles.glowLayer}>
          <div className={`${styles.glow} ${styles.glow1}`} />
          <div className={`${styles.glow} ${styles.glow2}`} />
          <div className={`${styles.glow} ${styles.glow3}`} />
          <div className={`${styles.glow} ${styles.glow4}`} />
          <div className={`${styles.glow} ${styles.glow5}`} />

          <span className={`${styles.sparkle} ${styles.sparkle1}`} />
          <span className={`${styles.sparkle} ${styles.sparkle2}`} />
          <span className={`${styles.sparkle} ${styles.sparkle3}`} />
          <span className={`${styles.sparkle} ${styles.sparkle4}`} />
          <span className={`${styles.sparkle} ${styles.sparkle5}`} />
          <span className={`${styles.sparkle} ${styles.sparkle6}`} />
          <span className={`${styles.sparkle} ${styles.sparkle7}`} />
          <span className={`${styles.sparkle} ${styles.sparkle8}`} />
          <span className={`${styles.sparkle} ${styles.sparkle9}`} />
          <span className={`${styles.sparkle} ${styles.sparkle10}`} />
        </div>

        {/* Moedas flutuantes — independentes do scroll, decorativas.
            Ficam fora do .stage (bloco central de 1200px), direto no
            .sticky, pra poderem se espalhar pela seção sem atrapalhar
            a leitura do texto */}
        <div className={styles.coinsLayer}>
          {['coinBig1', 'coinBig2', 'coinSmall1', 'coinSmall2', 'coinSmall3', 'coinSmall4'].map(
            (name) => (
              <div
                key={name}
                className={`${styles.coin} ${styles[name]} ${isVisible ? styles.visible : ''}`}
              >
                <div className={styles.coinInner}>
                  <Image src="/assets/coin.png" alt="" width={173} height={213} />
                </div>
              </div>
            )
          )}
        </div>

        <div className={styles.stage}>

          {/* Sacola — enche/acende conforme o scroll, com produtos caindo */}
          <div className={`${styles.left} ${bagVisible ? styles.visible : ''}`}>
            <div className={styles.bagWrap}>
              <Image
                src="/assets/shopify-bag.png"
                alt=""
                width={502}
                height={545}
                className={styles.bagImg}
              />

              <div className={styles.bagFillWrap}>
                <div
                  className={styles.waveOverlay}
                  style={{ top: `${(1 - progress) * 100}%` }}
                />
                <Image
                  src="/assets/shopify-bag.png"
                  alt=""
                  width={502}
                  height={545}
                  className={styles.bagImgLit}
                  style={{ clipPath: `inset(${(1 - progress) * 100}% 0 0 0)` }}
                />
              </div>

              {PRODUCTS.map((product, i) => {
                const isCurrent = i === currentStep
                const hasSettled = i < currentStep
                const className = [
                  styles.fallingItem,
                  isCurrent ? styles.dropped : '',
                  hasSettled ? styles.settled : '',
                ].join(' ')
                return (
                  <div key={product.name} className={className}>
                    <div className={styles.itemIcon}>
                      <Image
                        src={product.src}
                        alt=""
                        width={product.width}
                        height={product.height}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Texto — troca por capítulo, sincronizado com o produto caindo */}
          <div className={styles.right}>
            {CHAPTERS.map((chapter, i) => (
              <div
                key={chapter.label}
                className={`${styles.chapter} ${i === currentStep ? styles.active : ''}`}
              >
                <p className={styles.chapterLabel}>{chapter.label}</p>
                <h3 className={styles.heading}>
                  {chapter.heading}
                  <span className={styles.dot}>.</span>
                </h3>
                <p className={styles.desc}>{chapter.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

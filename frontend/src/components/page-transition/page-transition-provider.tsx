'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import { gsap } from '@/lib/gsap'
import { PageTransitionContext } from './page-transition-context'
import styles from './page-transition.module.css'

const PIXEL_COUNT = 100
const BASE_DURATION = 0.55 // segundos
const MAX_START_DELAY = 0.2 // segundos

function randomX() {
  return Math.random() * 100
}

interface PageTransitionProviderProps {
  children: React.ReactNode
}

export function PageTransitionProvider({ children }: PageTransitionProviderProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const pendingNavigation = useRef<string | null>(null)
  const scrollDirectionRef = useScrollDirection()
  const router = useRouter()
  const pathname = usePathname()
  const [isFirstRender, setIsFirstRender] = useState(true)

  // Não anima na primeira carga da página, só em navegações subsequentes
  useEffect(() => {
    setIsFirstRender(false)
  }, [])

  const runReveal = useCallback((direction: 'down' | 'up') => {
    const overlay = overlayRef.current
    if (!overlay) return

    const pixels: HTMLDivElement[] = []
    const stageH = window.innerHeight

    for (let i = 0; i < PIXEL_COUNT; i++) {
      const el = document.createElement('div')
      el.className = styles.pixel
      el.style.left = `${randomX()}%`
      el.style.top = direction === 'down' ? '-10px' : `${stageH + 10}px`
      overlay.appendChild(el)
      pixels.push(el)
    }

    pixels.forEach((el) => {
      const delay = Math.random() * MAX_START_DELAY
      const speedFactor = 0.6 + Math.random() * 0.9
      const duration = BASE_DURATION * speedFactor
      const travel = stageH + 20
      const endY = direction === 'down' ? travel - 10 : -travel + 10

      gsap.fromTo(
        el,
        { opacity: 1, y: 0 },
        {
          y: endY,
          duration,
          delay,
          ease: 'none',
          onComplete: () => el.remove(),
        }
      )
      gsap.to(el, {
        opacity: 0,
        duration: 0.15,
        delay: delay + duration - 0.1,
      })
    })
  }, [])

  const runCover = useCallback(
    (direction: 'down' | 'up', onMid: () => void) => {
      const overlay = overlayRef.current
      if (!overlay) return

      const pixels: HTMLDivElement[] = []
      const stageH = window.innerHeight

      for (let i = 0; i < PIXEL_COUNT; i++) {
        const el = document.createElement('div')
        el.className = styles.pixel
        el.style.left = `${randomX()}%`
        el.style.top = direction === 'down' ? '-10px' : `${stageH + 10}px`
        overlay.appendChild(el)
        pixels.push(el)
      }

      let midCalled = false

      pixels.forEach((el) => {
        const delay = Math.random() * MAX_START_DELAY
        const speedFactor = 0.6 + Math.random() * 0.9
        const duration = BASE_DURATION * speedFactor
        const travel = stageH + 20
        const endY = direction === 'down' ? travel - 10 : -travel + 10

        gsap.fromTo(
          el,
          { opacity: 1, y: 0 },
          {
            y: endY,
            duration,
            delay,
            ease: 'none',
            onComplete: () => el.remove(),
          }
        )
        gsap.to(el, {
          opacity: 0,
          duration: 0.15,
          delay: delay + duration - 0.1,
        })
      })

      // Dispara a troca de rota no meio do trajeto dos pixels — parecido
      // com o timing do protótipo aprovado (crossfade no meio do movimento)
      setTimeout(() => {
        if (!midCalled) {
          midCalled = true
          onMid()
        }
      }, 300)
    },
    []
  )

  const navigate = useCallback(
    (path: string) => {
      if (path === pathname) return
      const direction = scrollDirectionRef.current
      pendingNavigation.current = direction

      runCover(direction, () => {
        router.push(path)
      })
    },
    [pathname, router, runCover, scrollDirectionRef]
  )

  // Assim que a rota muda de verdade (nova página montada), dispara a
  // revelação — na mesma direção que a cobertura usou
  useEffect(() => {
    if (isFirstRender) return
    const direction = pendingNavigation.current
    if (direction) {
      runReveal(direction)
      pendingNavigation.current = null
    }
  }, [pathname, isFirstRender, runReveal])

  // Intercepta cliques em links internos (<Link>/<a href="/...">) de
  // forma global, sem precisar trocar cada <Link> do projeto
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      const anchor = (e.target as HTMLElement)?.closest('a')
      if (!anchor) return

      const href = anchor.getAttribute('href')
      if (!href || !href.startsWith('/')) return
      if (anchor.target === '_blank' || anchor.hasAttribute('download')) return
      if (href === pathname) return

      e.preventDefault()
      navigate(href)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [navigate, pathname])

  return (
    <PageTransitionContext.Provider value={{ navigate }}>
      {children}
      <div ref={overlayRef} className={styles.overlay} aria-hidden="true" />
    </PageTransitionContext.Provider>
  )
}

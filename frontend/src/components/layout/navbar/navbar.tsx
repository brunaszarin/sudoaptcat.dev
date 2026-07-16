'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Tooltip } from '@/components/ui/tooltip'
import { MobileTabBar } from './mobile-tab-bar'
import styles from './navbar.module.css'

const LINKS = [
  { label: 'home', id: 'home' },
  { label: 'about', id: 'about' },
  { label: 'projects', id: 'projects' },
  { label: 'blog', id: 'blog' },
  { label: 'contact', id: 'contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'

  useEffect(() => {
    if (!isHome) {
      setActive(pathname.startsWith('/blog') ? 'blog' : '')
      return
    }

    let ticking = false

    function computeActive() {
      ticking = false
      setScrolled(window.scrollY > 20)

      const middle = window.scrollY + window.innerHeight / 2
      let current = LINKS[0].id
      for (const link of LINKS) {
        const el = document.getElementById(link.id)
        if (!el) continue
        if (middle >= el.offsetTop) {
          current = link.id
        }
      }
      setActive(current)
    }

    function handleScroll() {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(computeActive)
      }
    }

    computeActive()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome, pathname])

  function goToSection(id: string) {
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push(`/#${id}`)
    }
  }

  function goHome() {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      router.push('/')
    }
  }

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <button className={styles.logo} onClick={goHome} aria-label="go to home">
          sudo apt <b>cat</b>
        </button>

        <ul className={styles.links}>
          {LINKS.map((link) => (
            <li key={link.id}>
              <button
                className={`${styles.link} ${active === link.id ? styles.linkActive : ''}`}
                onClick={() => goToSection(link.id)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <Tooltip text="download my cv here" position="bottom" align="right">
          <a href="/assets/bruna-szarin-cv.pdf" download className={styles.cvIcon} aria-label="download my cv">
            <svg width="22" height="22" viewBox="0 0 11 11" shapeRendering="crispEdges">
              <rect x="0" y="0" width="9" height="1" fill="currentColor" />
              <rect x="0" y="0" width="1" height="11" fill="currentColor" />
              <rect x="9" y="1" width="1" height="10" fill="currentColor" />
              <rect x="10" y="2" width="1" height="9" fill="currentColor" />
              <rect x="0" y="10" width="11" height="1" fill="currentColor" />
              <rect x="3" y="1" width="3" height="3" fill="currentColor" />
              <rect x="2" y="6" width="6" height="1" fill="currentColor" />
              <rect x="2" y="6" width="1" height="4" fill="currentColor" />
              <rect x="7" y="6" width="1" height="4" fill="currentColor" />
              <rect x="2" y="9" width="6" height="1" fill="currentColor" />
            </svg>
          </a>
        </Tooltip>
      </nav>

      <MobileTabBar />
    </>
  )
}

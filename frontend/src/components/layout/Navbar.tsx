'use client'

import { useState, useEffect } from 'react'
import { Tooltip } from '@/components/ui/Tooltip'
import styles from './Navbar.module.css'

const LINKS = [
  { label: 'home', id: 'home' },
  { label: 'about', id: 'about' },
  { label: 'projects', id: 'projects' },
  { label: 'contact', id: 'contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <span className={styles.logo}>
        sudo apt <b>cat</b>
      </span>

      <ul className={styles.links}>
        {LINKS.map((link) => (
          <li key={link.id}>
            <button
              className={styles.link}
              onClick={() => scrollToSection(link.id)}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>

      <Tooltip text="download my cv here" position="bottom" align="right">
        <a href="/curriculo.pdf" download className={styles.cvIcon} aria-label="download my cv">
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
  )
}
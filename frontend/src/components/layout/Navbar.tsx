'use client'

import { useState, useEffect } from 'react'
import { PixelButton } from '@/components/ui/PixelButton'
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

      <a href="/curriculo.pdf" download className={styles.cvLink}>
        <PixelButton variant="green">↓ resume</PixelButton>
      </a>
    </nav>
  )
}
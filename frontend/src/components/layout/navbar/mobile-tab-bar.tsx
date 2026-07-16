'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { HomeIcon, UserIcon, MonitorIcon, BlogIcon, MailIcon } from './nav-icons'
import styles from './mobile-tab-bar.module.css'

const TABS = [
  { id: 'home', label: 'home', Icon: HomeIcon },
  { id: 'about', label: 'about', Icon: UserIcon },
  { id: 'projects', label: 'projects', Icon: MonitorIcon },
  { id: 'blog', label: 'blog', Icon: BlogIcon },
  { id: 'contact', label: 'contact', Icon: MailIcon },
]

const SHOW_THRESHOLD = 120

export function MobileTabBar() {
  const [active, setActive] = useState('home')
  const [visible, setVisible] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'

  useEffect(() => {
    if (!isHome) {
      // Fora da home não temos as seções pra observar — só marca "blog"
      // como ativo quando estamos dentro de /blog
      setActive(pathname.startsWith('/blog') ? 'blog' : '')
      setVisible(true)
      return
    }

    let ticking = false

    function computeState() {
      ticking = false
      setVisible(window.scrollY > SHOW_THRESHOLD)

      const middle = window.scrollY + window.innerHeight / 2
      let current = TABS[0].id
      for (const tab of TABS) {
        const el = document.getElementById(tab.id)
        if (!el) continue
        if (middle >= el.offsetTop) {
          current = tab.id
        }
      }
      setActive(current)
    }

    function handleScroll() {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(computeState)
      }
    }

    computeState()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome, pathname])

  function handleClick(id: string) {
    if (id === 'blog') {
      router.push('/blog')
      return
    }
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push(`/#${id}`)
    }
  }

  return (
    <nav
      className={`${styles.bar} ${visible ? styles.visible : ''}`}
      aria-label="mobile navigation"
    >
      {TABS.map(({ id, label, Icon }) => {
        const isActive = active === id
        return (
          <button
            key={id}
            className={styles.item}
            onClick={() => handleClick(id)}
            aria-current={isActive ? 'page' : undefined}
          >
            {isActive && (
              <span className={`${styles.activeFill} ${styles.clip}`} aria-hidden="true" />
            )}
            <span className={`${styles.content} ${isActive ? styles.active : ''}`}>
              <Icon />
              <span className={styles.label}>{label}</span>
            </span>
          </button>
        )
      })}
    </nav>
  )
}

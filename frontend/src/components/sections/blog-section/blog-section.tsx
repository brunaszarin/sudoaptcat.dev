'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePosts } from '@/hooks/usePosts'
import { useTerminalScroll } from '@/hooks/useTerminalScroll'
import { HomeIcon, UserIcon, MonitorIcon, MailIcon, TrashIcon } from '@/components/layout/navbar/nav-icons'
import styles from './blog-section.module.css'

function formatDate(iso: string) {
  return iso.slice(0, 10)
}

const DESKTOP_ICONS = [
  { id: 'trash', label: 'trash', Icon: TrashIcon },
  { id: 'home', label: 'home', Icon: HomeIcon },
  { id: 'about', label: 'about', Icon: UserIcon },
  { id: 'projects', label: 'projects', Icon: MonitorIcon },
  { id: 'contact', label: 'contact', Icon: MailIcon },
]

export function BlogSection() {
  const { data: posts } = usePosts()
  const [showTrashError, setShowTrashError] = useState(false)
  const [showBlogPrompt, setShowBlogPrompt] = useState(false)
  const [hasPromptedBlogNav, setHasPromptedBlogNav] = useState(false)
  const router = useRouter()
  const [clock, setClock] = useState('')

  const recentPosts = (posts ?? [])
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const { sectionRef, powerLevel, selectedIndex } = useTerminalScroll(recentPosts.length)

  // Relógio da taskbar — só no cliente, evita erro de hidratação
  useEffect(() => {
    function tick() {
      setClock(
        new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      )
    }
    tick()
    const interval = setInterval(tick, 30000)
    return () => clearInterval(interval)
  }, [])

  // Assim que o terminal termina de "ligar" pela primeira vez, oferece
  // ir pra página completa do blog
  useEffect(() => {
    if (powerLevel >= 0.98 && !hasPromptedBlogNav) {
      setHasPromptedBlogNav(true)
      setShowBlogPrompt(true)
    }
  }, [powerLevel, hasPromptedBlogNav])

  function openPost(slug: string) {
    window.open(`/blog/${slug}`, '_blank')
  }

  function handleDesktopIconClick(id: string) {
    if (id === 'trash') {
      setShowTrashError(true)
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      const section = sectionRef.current
      if (!section) return
      const rect = section.getBoundingClientRect()
      const isActive = rect.top <= 0 && rect.bottom >= window.innerHeight
      if (!isActive) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        window.scrollBy({ top: window.innerHeight * 0.25, behavior: 'smooth' })
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        window.scrollBy({ top: -window.innerHeight * 0.25, behavior: 'smooth' })
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        openPost(recentPosts[selectedIndex].slug)
      } else if (e.key === 'Escape') {
        setShowTrashError(false)
        setShowBlogPrompt(false)
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [selectedIndex, recentPosts, sectionRef])

  const sectionHeight = `calc(100vh + ${Math.max(recentPosts.length, 1) * 70 + 60}vh)`

  return (
    <section
      id="blog"
      ref={sectionRef}
      className={styles.blog}
      style={{ height: sectionHeight }}
    >
      <div className={styles.sticky}>

        <div className={styles.desktopIcons}>
          {DESKTOP_ICONS.map(({ id, label, Icon }) => (
            <button key={id} className={styles.desktopIcon} onClick={() => handleDesktopIconClick(id)}>
              <Icon className={styles.desktopIconSvg} />
              <span className={styles.desktopIconLabel}>{label}</span>
            </button>
          ))}
        </div>

        <div className={styles.header}>
          <p className={styles.label}>from the blog</p>
          <h2 className={styles.title}>what i&apos;ve been writing</h2>
        </div>

        <div
          className={styles.terminalOuter}
          style={{
            transform: `scaleY(${Math.max(powerLevel, 0.03)}) scaleX(${Math.min(1, powerLevel * 3 + 0.1)})`,
            filter: `brightness(${1 + (1 - powerLevel) * 2})`,
            opacity: powerLevel > 0.02 ? 1 : 0,
          }}
        >
          <div className={styles.terminalBorder} />
          <div className={styles.terminal}>
            <div className={styles.terminalBar}>
              <span className={styles.dot} style={{ background: '#4d7200' }} />
              <span className={styles.dot} style={{ background: '#7bc400' }} />
              <span className={styles.dot} style={{ background: '#aaff00' }} />
              <span className={styles.terminalTitle}>bruna@sudoaptcat: ~/blog</span>
            </div>

            <div className={styles.terminalBody}>
              <p className={styles.prompt}>
                <span className={styles.promptSymbol}>$</span> ls posts/ --recent
              </p>

              {recentPosts.map((post, i) => (
                <button
                  key={post.id}
                  className={`${styles.postRow} ${i === selectedIndex ? styles.postRowActive : ''}`}
                  onClick={() => openPost(post.slug)}
                >
                  <div className={styles.postLine}>
                    <span>
                      {i === selectedIndex ? '>' : ' '} <span className={styles.postName}>{post.slug}.md</span>
                    </span>
                    <span className={styles.postDate}>{formatDate(post.createdAt)}</span>
                  </div>
                  <p className={styles.postExcerpt}># {post.excerpt}</p>
                  <div className={styles.tags}>
                    {post.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                </button>
              ))}

              <p className={styles.promptEnd}>
                <span className={styles.promptSymbol}>$</span>{' '}
                <span className={styles.hint}>
                  {selectedIndex >= 0
                    ? 'press enter or click to open'
                    : 'use ↑ ↓ or scroll to navigate'}
                </span>
                <span className={styles.cursor}>_</span>
              </p>
            </div>
          </div>
        </div>

        {showTrashError && (
          <div className={styles.errorOverlay} onClick={() => setShowTrashError(false)}>
            <div className={styles.errorWindow} onClick={(e) => e.stopPropagation()}>
              <div className={styles.errorBorder} />
              <div className={styles.errorInner}>
                <div className={styles.errorBar}>
                  <span className={styles.errorBarTitle}>system</span>
                  <button className={styles.errorClose} onClick={() => setShowTrashError(false)}>✕</button>
                </div>
                <div className={styles.errorBody}>
                  <span className={styles.errorIcon}>!</span>
                  <p className={styles.errorMessage}>can&apos;t open trash — the cat already did that!</p>
                </div>
                <div className={styles.errorActions}>
                  <button className={styles.errorOk} onClick={() => setShowTrashError(false)}>OK</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showBlogPrompt && (
          <div className={styles.errorOverlay} onClick={() => setShowBlogPrompt(false)}>
            <div className={styles.errorWindow} onClick={(e) => e.stopPropagation()}>
              <div className={styles.errorBorder} />
              <div className={styles.errorInner}>
                <div className={styles.errorBar}>
                  <span className={styles.errorBarTitle}>system</span>
                  <button className={styles.errorClose} onClick={() => setShowBlogPrompt(false)}>✕</button>
                </div>
                <div className={styles.errorBody}>
                  <span className={styles.errorIcon}>?</span>
                  <p className={styles.errorMessage}>open the full blog page?</p>
                </div>
                <div className={styles.errorActions}>
                  <button className={styles.errorGhost} onClick={() => setShowBlogPrompt(false)}>no</button>
                  <button className={styles.errorOk} onClick={() => router.push('/blog')}>yes</button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className={styles.taskbar}>
          <div className={styles.startButton}>
            <svg width="14" height="14" viewBox="0 0 8 8" shapeRendering="crispEdges" fill="currentColor">
              <rect x="0" y="0" width="3" height="3" />
              <rect x="4" y="0" width="4" height="3" />
              <rect x="0" y="4" width="3" height="4" />
              <rect x="4" y="4" width="4" height="4" />
            </svg>
            <span>start</span>
          </div>
          <span className={styles.clock}>{clock}</span>
        </div>

      </div>
    </section>
  )
}

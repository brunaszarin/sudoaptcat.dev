'use client'

import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { useRouter } from 'next/navigation'
import { usePosts } from '@/hooks/usePosts'
import { computePowerLevel, computeSelectedIndex } from '@/hooks/useTerminalScroll'
import { DesktopIcons } from './desktop-icons'
import { Terminal } from './terminal'
import { SystemDialog } from './system-dialog'
import { Taskbar } from './taskbar'
import { ScrollTrigger } from '@/lib/gsap'
import styles from './blog-section.module.css'

export function BlogSection() {
  const { data: posts } = usePosts()
  const [showTrashError, setShowTrashError] = useState(false)
  const [showBlogPrompt, setShowBlogPrompt] = useState(false)
  const [hasPromptedBlogNav, setHasPromptedBlogNav] = useState(false)
  const router = useRouter()
  const [clock, setClock] = useState('')

  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const [powerLevel, setPowerLevel] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const recentPosts = (posts ?? [])
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  // Trava a div .sticky na tela enquanto a <section> externa rola — usa
  // ScrollTrigger.pin() em vez de position:sticky (compatível com o
  // ScrollSmoother). O scrub entrega o progresso já suavizado, que
  // alimenta as mesmas funções puras que o useTerminalScroll usava.
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
        setPowerLevel(computePowerLevel(self.progress))
        setSelectedIndex(computeSelectedIndex(self.progress, recentPosts.length))
      },
    })

    // A altura da seção depende dos posts carregarem (recentPosts.length
    // só fica correto depois que a API responde) — o ScrollSmoother mede
    // a altura da página antes disso, então força um recálculo assim que
    // o tamanho real é conhecido (o próprio efeito já roda de novo quando
    // recentPosts.length muda, mas o refresh garante que o ScrollSmoother
    // também atualiza sua métrica interna de altura total).
    const refreshId = setTimeout(() => ScrollTrigger.refresh(), 100)

    return () => {
      trigger.kill()
      clearTimeout(refreshId)
    }
  }, [recentPosts.length])

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
  }, [selectedIndex, recentPosts])

  const sectionHeight = `calc(100vh + ${Math.max(recentPosts.length, 1) * 70 + 60}vh)`

  return (
    <section
      id="blog"
      ref={sectionRef}
      className={styles.blog}
      style={{ height: sectionHeight }}
    >
      <div className={styles.sticky} ref={stickyRef}>
        <DesktopIcons onIconClick={handleDesktopIconClick} />

        <div className={styles.header}>
          <p className={styles.label}>from the blog</p>
          <h2 className={styles.title}>what i&apos;ve been writing</h2>
        </div>

        <Terminal
          posts={recentPosts}
          selectedIndex={selectedIndex}
          powerLevel={powerLevel}
          onOpenPost={openPost}
        />

        {showTrashError && (
          <SystemDialog
            icon="!"
            message="can't open trash — the cat already did that!"
            onClose={() => setShowTrashError(false)}
            actions={[{ label: 'OK', onClick: () => setShowTrashError(false) }]}
          />
        )}

        {showBlogPrompt && (
          <SystemDialog
            icon="?"
            message="open the full blog page?"
            onClose={() => setShowBlogPrompt(false)}
            actions={[
              { label: 'no', onClick: () => setShowBlogPrompt(false), variant: 'ghost' },
              { label: 'yes', onClick: () => router.push('/blog') },
            ]}
          />
        )}

        <Taskbar clock={clock} />
      </div>
    </section>
  )
}

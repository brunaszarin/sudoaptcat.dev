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
import { navigateToSection } from '@/lib/navigate-to-section'
import styles from './blog-section.module.css'

// Quantos posts aparecem por "página" dentro do terminal — evita a tela
// ficar gigante conforme o número de posts publicados cresce. Menor no
// mobile, onde cada post ocupa proporcionalmente mais espaço vertical.
const PAGE_SIZE_DESKTOP = 2
const PAGE_SIZE_MOBILE = 1

function usePageSize() {
  const [pageSize, setPageSize] = useState(PAGE_SIZE_DESKTOP)

  useEffect(() => {
    function update() {
      setPageSize(window.innerWidth <= 768 ? PAGE_SIZE_MOBILE : PAGE_SIZE_DESKTOP)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return pageSize
}

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
  const [currentPage, setCurrentPage] = useState(0)
  const PAGE_SIZE = usePageSize()
  // Guarda o tamanho da página atual numa ref — o onUpdate do pin lê
  // sempre o valor mais recente daqui, sem precisar que o efeito seja
  // recriado (evita o bug de perder o pin quando os posts carregam)
  const pagePostsLengthRef = useRef(0)

  // Todos os posts publicados — não tem mais teto artificial de 5, já que
  // a paginação (3 por página) cuida de nunca deixar a tela gigante
  const allPosts = (posts ?? [])
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const totalPages = Math.max(1, Math.ceil(allPosts.length / PAGE_SIZE))

  // Se o PAGE_SIZE muda (ex: girar o celular, redimensionar a janela) e a
  // página atual passa a não existir mais, volta pra última válida
  useEffect(() => {
    if (currentPage > totalPages - 1) {
      setCurrentPage(totalPages - 1)
    }
  }, [totalPages, currentPage])

  const pagePosts = allPosts.slice(currentPage * PAGE_SIZE, currentPage * PAGE_SIZE + PAGE_SIZE)

  function goToPrevPage() {
    setCurrentPage((p) => Math.max(0, p - 1))
  }

  function goToNextPage() {
    setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
  }

  // Trava a div .sticky na tela enquanto a <section> externa rola — usa
  // ScrollTrigger.pin() em vez de position:sticky (compatível com o
  // ScrollSmoother). O scrub entrega o progresso já suavizado, que
  // alimenta as mesmas funções puras que o useTerminalScroll usava.
  // A seleção é calculada com base no tamanho da PÁGINA atual (até 3
  // itens), não no total de posts — muda de página não exige mais scroll.
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
        setSelectedIndex(computeSelectedIndex(self.progress, pagePostsLengthRef.current))
      },
    })

    // A altura da seção agora é baseada só no PAGE_SIZE (3), não no total
    // de posts — como cada página sempre mostra no máximo 3 itens, a
    // quantidade de espaço de scroll necessária nunca muda, mesmo que
    // você publique mais artigos depois.
    const refreshId = setTimeout(() => ScrollTrigger.refresh(), 100)

    return () => {
      trigger.kill()
      clearTimeout(refreshId)
    }
    // Roda só uma vez — o pin nunca precisa ser recriado, mesmo quando os
    // posts carregam ou a página muda (a ref acima cuida de manter o
    // cálculo de seleção atualizado sem precisar recriar o ScrollTrigger)
  }, [])

  // Mantém a ref sincronizada sempre que a página atual muda de tamanho
  useEffect(() => {
    pagePostsLengthRef.current = pagePosts.length
  }, [pagePosts.length])

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
    navigateToSection(id)
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
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goToPrevPage()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        goToNextPage()
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        openPost(pagePosts[selectedIndex].slug)
      } else if (e.key === 'Escape') {
        setShowTrashError(false)
        setShowBlogPrompt(false)
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [selectedIndex, pagePosts, totalPages])

  // Altura fixa baseada só no PAGE_SIZE (3) — não no total de posts, já
  // que a paginação garante que a tela nunca mostra mais que isso de uma
  // vez, independente de quantos artigos você publicar no futuro.
  const sectionHeight = `calc(100vh + ${PAGE_SIZE * 70 + 60}vh)`

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
          posts={pagePosts}
          selectedIndex={selectedIndex}
          powerLevel={powerLevel}
          onOpenPost={openPost}
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevPage={goToPrevPage}
          onNextPage={goToNextPage}
        />

        {showTrashError && (
          <SystemDialog
            icon="!"
            message="can't open trash — the cat already did that!"
            onClose={() => setShowTrashError(false)}
            draggable
            actions={[{ label: 'OK', onClick: () => setShowTrashError(false), variant: 'filled' }]}
          />
        )}

        {showBlogPrompt && (
          <SystemDialog
            icon="?"
            message="open the full blog page?"
            onClose={() => setShowBlogPrompt(false)}
            offsetX={80}
            draggable
            actions={[
              { label: 'yes', onClick: () => router.push('/blog'), variant: 'filled' },
              { label: 'no', onClick: () => setShowBlogPrompt(false), variant: 'ghost' },
            ]}
          />
        )}

        <Taskbar clock={clock} />
      </div>
    </section>
  )
}

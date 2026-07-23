import { render, screen, fireEvent, act } from '@testing-library/react'
import { BlogSection } from './blog-section'
import type { Post } from '@/types'

const pushMock = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: pushMock }),
}))

const mockUsePosts = jest.fn()
jest.mock('@/hooks/usePosts', () => ({
  usePosts: () => mockUsePosts(),
}))

// Captura o onUpdate registrado pelo componente no ScrollTrigger.create,
// pra podermos simular qualquer valor de progresso nos testes — sem isso,
// o pin/scrub de verdade nunca dispara dentro do jsdom
let capturedOnUpdate: ((self: { progress: number; direction: number }) => void) | null = null

jest.mock('@/lib/gsap', () => ({
  gsap: {},
  ScrollTrigger: {
    create: (config: { onUpdate?: typeof capturedOnUpdate }) => {
      capturedOnUpdate = config.onUpdate ?? null
      return { kill: jest.fn() }
    },
    refresh: jest.fn(),
  },
}))

function fireScrollUpdate(progress: number) {
  act(() => {
    capturedOnUpdate?.({ progress, direction: 1 })
  })
}

function makePost(overrides: Partial<Post> = {}): Post {
  return {
    id: 1,
    title: 'Test Post',
    slug: 'test-post',
    excerpt: 'a short summary',
    content: 'full content',
    coverImage: null,
    tags: [],
    published: true,
    createdAt: '2026-07-14T10:00:00Z',
    ...overrides,
  }
}

describe('BlogSection', () => {
  beforeEach(() => {
    pushMock.mockClear()
    capturedOnUpdate = null
    mockUsePosts.mockReturnValue({ data: [makePost()] })
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders the section header', () => {
    render(<BlogSection />)
    expect(screen.getByText("what i've been writing")).toBeInTheDocument()
  })

  it('renders the desktop icons', () => {
    render(<BlogSection />)
    expect(screen.getByText('trash')).toBeInTheDocument()
    expect(screen.getByText('home')).toBeInTheDocument()
  })

  it('renders the terminal with posts from usePosts', () => {
    render(<BlogSection />)
    expect(screen.getByText('test-post.md')).toBeInTheDocument()
  })

  it('filters out unpublished posts', () => {
    mockUsePosts.mockReturnValue({
      data: [makePost({ slug: 'draft', published: false })],
    })
    render(<BlogSection />)
    expect(screen.queryByText('draft.md')).not.toBeInTheDocument()
  })

  it('opens the trash error dialog when the trash icon is clicked', () => {
    render(<BlogSection />)
    fireEvent.click(screen.getByText('trash'))
    expect(screen.getByText(/the cat already did that/i)).toBeInTheDocument()
  })

  it('closes the trash dialog when OK is clicked', () => {
    render(<BlogSection />)
    fireEvent.click(screen.getByText('trash'))
    fireEvent.click(screen.getByText('OK'))
    expect(screen.queryByText(/the cat already did that/i)).not.toBeInTheDocument()
  })

  it('shows the blog navigation prompt once powerLevel reaches the threshold', () => {
    // progress 0.5 = meio do trajeto = powerLevel máximo (totalmente "ligado")
    render(<BlogSection />)
    fireScrollUpdate(0.5)
    expect(screen.getByText('open the full blog page?')).toBeInTheDocument()
  })

  it('does not show the blog prompt when powerLevel is below the threshold', () => {
    // progress perto da ponta (0.05) = powerLevel baixo (ainda "ligando")
    render(<BlogSection />)
    fireScrollUpdate(0.05)
    expect(screen.queryByText('open the full blog page?')).not.toBeInTheDocument()
  })

  it('navigates to /blog when "yes" is clicked on the prompt', () => {
    render(<BlogSection />)
    fireScrollUpdate(0.5)
    fireEvent.click(screen.getByText('yes'))
    expect(pushMock).toHaveBeenCalledWith('/blog')
  })

  it('dismisses the prompt when "no" is clicked, without navigating', () => {
    render(<BlogSection />)
    fireScrollUpdate(0.5)
    fireEvent.click(screen.getByText('no'))
    expect(screen.queryByText('open the full blog page?')).not.toBeInTheDocument()
    expect(pushMock).not.toHaveBeenCalled()
  })

  it('updates the clock on mount', () => {
    render(<BlogSection />)
    act(() => {
      jest.advanceTimersByTime(0)
    })
    const clockRegex = /^\d{2}:\d{2}$/
    const clockEl = screen.getAllByText(clockRegex, { exact: false })
    expect(clockEl.length).toBeGreaterThanOrEqual(0)
  })
})

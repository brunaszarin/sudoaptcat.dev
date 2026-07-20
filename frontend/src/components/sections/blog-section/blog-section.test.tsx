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

let mockSelectedIndex = -1
let mockPowerLevel = 1
const mockSectionRef = { current: document.createElement('section') }

jest.mock('@/hooks/useTerminalScroll', () => ({
  useTerminalScroll: () => ({
    sectionRef: mockSectionRef,
    powerLevel: mockPowerLevel,
    selectedIndex: mockSelectedIndex,
  }),
}))

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
  let openSpy: jest.SpyInstance

  beforeEach(() => {
    pushMock.mockClear()
    mockSelectedIndex = -1
    mockPowerLevel = 0.5 // abaixo do threshold de 0.98, evita disparar o prompt sozinho
    mockUsePosts.mockReturnValue({ data: [makePost()] })
    openSpy = jest.spyOn(window, 'open').mockImplementation(() => null)
    jest.useFakeTimers()
  })

  afterEach(() => {
    openSpy.mockRestore()
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
    mockPowerLevel = 1
    render(<BlogSection />)
    expect(screen.getByText('open the full blog page?')).toBeInTheDocument()
  })

  it('does not show the blog prompt when powerLevel is below the threshold', () => {
    mockPowerLevel = 0.5
    render(<BlogSection />)
    expect(screen.queryByText('open the full blog page?')).not.toBeInTheDocument()
  })

  it('navigates to /blog when "yes" is clicked on the prompt', () => {
    mockPowerLevel = 1
    render(<BlogSection />)
    fireEvent.click(screen.getByText('yes'))
    expect(pushMock).toHaveBeenCalledWith('/blog')
  })

  it('dismisses the prompt when "no" is clicked, without navigating', () => {
    mockPowerLevel = 1
    render(<BlogSection />)
    fireEvent.click(screen.getByText('no'))
    expect(screen.queryByText('open the full blog page?')).not.toBeInTheDocument()
    expect(pushMock).not.toHaveBeenCalled()
  })

  it('updates the clock on mount', () => {
    render(<BlogSection />)
    // O relógio é preenchido de forma assíncrona pelo useEffect — só
    // confirmamos que o elemento existe e não está mais vazio
    act(() => {
      jest.advanceTimersByTime(0)
    })
    const clockRegex = /^\d{2}:\d{2}$/
    const clockEl = screen.getAllByText(clockRegex, { exact: false })
    expect(clockEl.length).toBeGreaterThanOrEqual(0)
  })
})

import { render, screen, fireEvent, act } from '@testing-library/react'
import { MobileTabBar } from './mobile-tab-bar'

const pushMock = jest.fn()
let mockPathname = '/'

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({ push: pushMock }),
}))

function mockSectionOffsetTop(id: string, offsetTop: number) {
  const el = document.createElement('div')
  el.id = id
  Object.defineProperty(el, 'offsetTop', { value: offsetTop, configurable: true })
  document.body.appendChild(el)
  return el
}

describe('MobileTabBar', () => {
  let rafSpy: jest.SpyInstance

  beforeEach(() => {
    mockPathname = '/'
    pushMock.mockClear()
    document.body.innerHTML = ''
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true })
    // O componente agrupa cálculos de scroll com requestAnimationFrame —
    // sem mockar, o callback nunca roda de forma síncrona no teste
    rafSpy = jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0)
      return 0
    })
  })

  afterEach(() => {
    rafSpy.mockRestore()
  })

  it('renders all 5 tabs', () => {
    render(<MobileTabBar />)
    ;['home', 'about', 'projects', 'blog', 'contact'].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('is hidden by default on the home page (before scrolling past the threshold)', () => {
    render(<MobileTabBar />)
    const nav = screen.getByRole('navigation', { name: 'mobile navigation' })
    expect(nav.className).not.toMatch(/visible/)
  })

  it('becomes visible after scrolling past the threshold on the home page', () => {
    render(<MobileTabBar />)
    const nav = screen.getByRole('navigation', { name: 'mobile navigation' })

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 200, configurable: true })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(nav.className).toMatch(/visible/)
  })

  it('is always visible when not on the home page', () => {
    mockPathname = '/blog'
    render(<MobileTabBar />)
    const nav = screen.getByRole('navigation', { name: 'mobile navigation' })
    expect(nav.className).toMatch(/visible/)
  })

  it('marks "blog" as active when on any /blog route', () => {
    mockPathname = '/blog/my-first-post'
    render(<MobileTabBar />)
    const blogButton = screen.getByText('blog').closest('button')
    expect(blogButton).toHaveAttribute('aria-current', 'page')
  })

  it('marks no tab as active on unrelated routes', () => {
    mockPathname = '/some-other-page'
    render(<MobileTabBar />)
    const buttons = screen.getAllByRole('button')
    buttons.forEach((btn) => {
      expect(btn).not.toHaveAttribute('aria-current', 'page')
    })
  })

  it('clicking "blog" always navigates to /blog via the router', () => {
    render(<MobileTabBar />)
    fireEvent.click(screen.getByText('blog'))
    expect(pushMock).toHaveBeenCalledWith('/blog')
  })

  it('clicking a section tab on the home page scrolls to that section', () => {
    const aboutSection = mockSectionOffsetTop('about', 500)
    aboutSection.scrollIntoView = jest.fn()

    render(<MobileTabBar />)
    fireEvent.click(screen.getByText('about'))

    expect(aboutSection.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('clicking a section tab off the home page navigates with a hash', () => {
    mockPathname = '/blog'
    render(<MobileTabBar />)
    fireEvent.click(screen.getByText('about'))

    expect(pushMock).toHaveBeenCalledWith('/#about')
  })

  it('updates the active tab based on scroll position (scroll-spy)', () => {
    mockSectionOffsetTop('home', 0)
    mockSectionOffsetTop('about', 1000)
    mockSectionOffsetTop('projects', 2000)

    render(<MobileTabBar />)

    act(() => {
      // middle = scrollY + innerHeight/2 = 1200 + 400 = 1600 -> passou de "about" (1000)
      Object.defineProperty(window, 'scrollY', { value: 1200, configurable: true })
      window.dispatchEvent(new Event('scroll'))
    })

    const aboutButton = screen.getByText('about').closest('button')
    expect(aboutButton).toHaveAttribute('aria-current', 'page')
  })
})

import { render, screen, fireEvent, act } from '@testing-library/react'
import { PageTransitionProvider } from './page-transition-provider'
import { usePageTransition } from '@/hooks/usePageTransition'

const pushMock = jest.fn()
let mockPathname = '/'

jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname,
  useRouter: () => ({ push: pushMock }),
}))

jest.mock('@/lib/gsap', () => ({
  gsap: {
    fromTo: jest.fn(),
    to: jest.fn(),
  },
  ScrollTrigger: {},
}))

function TriggerButton() {
  const { navigate } = usePageTransition()
  return <button onClick={() => navigate('/blog')}>go</button>
}

describe('PageTransitionProvider', () => {
  beforeEach(() => {
    pushMock.mockClear()
    mockPathname = '/'
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders children normally', () => {
    render(
      <PageTransitionProvider>
        <p>hello</p>
      </PageTransitionProvider>
    )
    expect(screen.getByText('hello')).toBeInTheDocument()
  })

  it('calls router.push after the cover animation delay when navigate is called', () => {
    render(
      <PageTransitionProvider>
        <TriggerButton />
      </PageTransitionProvider>
    )

    fireEvent.click(screen.getByText('go'))
    expect(pushMock).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(pushMock).toHaveBeenCalledWith('/blog')
  })

  it('does nothing when navigating to the current pathname', () => {
    mockPathname = '/blog'
    render(
      <PageTransitionProvider>
        <TriggerButton />
      </PageTransitionProvider>
    )

    fireEvent.click(screen.getByText('go'))
    act(() => {
      jest.advanceTimersByTime(300)
    })

    expect(pushMock).not.toHaveBeenCalled()
  })

  it('intercepts clicks on internal links and prevents default navigation', () => {
    render(
      <PageTransitionProvider>
        <a href="/about">about</a>
      </PageTransitionProvider>
    )

    const link = screen.getByText('about')
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true })
    const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault')

    act(() => {
      link.dispatchEvent(clickEvent)
    })
    expect(preventDefaultSpy).toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(300)
    })
    expect(pushMock).toHaveBeenCalledWith('/about')
  })

  it('does not intercept clicks on external links', () => {
    render(
      <PageTransitionProvider>
        <a href="https://example.com">external</a>
      </PageTransitionProvider>
    )

    const link = screen.getByText('external')
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true })
    const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault')

    act(() => {
      link.dispatchEvent(clickEvent)
    })
    expect(preventDefaultSpy).not.toHaveBeenCalled()
  })

  it('does not intercept clicks on links with target="_blank"', () => {
    render(
      <PageTransitionProvider>
        <a href="/blog" target="_blank">blank</a>
      </PageTransitionProvider>
    )

    const link = screen.getByText('blank')
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true })
    const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault')

    act(() => {
      link.dispatchEvent(clickEvent)
    })
    expect(preventDefaultSpy).not.toHaveBeenCalled()
  })

  it('does not intercept clicks with a modifier key held (e.g. cmd+click to open in new tab)', () => {
    render(
      <PageTransitionProvider>
        <a href="/blog">blog</a>
      </PageTransitionProvider>
    )

    const link = screen.getByText('blog')
    const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true, metaKey: true })
    const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault')

    act(() => {
      link.dispatchEvent(clickEvent)
    })
    expect(preventDefaultSpy).not.toHaveBeenCalled()
  })

  it('spawns pixels starting from the top when the default direction is "down"', () => {
    render(
      <PageTransitionProvider>
        <TriggerButton />
      </PageTransitionProvider>
    )

    fireEvent.click(screen.getByText('go'))

    const pixel = document.querySelector('[class*="pixel"]') as HTMLElement
    expect(pixel).toBeTruthy()
    expect(pixel.style.top).toBe('-10px')
  })

  it('spawns pixels starting from the bottom when the last scroll direction was up', () => {
    render(
      <PageTransitionProvider>
        <TriggerButton />
      </PageTransitionProvider>
    )

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 200, configurable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 50, configurable: true })
      window.dispatchEvent(new Event('scroll'))
    })

    fireEvent.click(screen.getByText('go'))

    const pixel = document.querySelector('[class*="pixel"]') as HTMLElement
    expect(pixel).toBeTruthy()
    expect(pixel.style.top).not.toBe('-10px')
  })
})

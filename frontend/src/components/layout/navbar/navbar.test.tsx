import { render, screen, fireEvent, act, within } from '@testing-library/react'
import { Navbar } from './navbar'

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
  useRouter: () => ({ push: jest.fn() }),
}))

describe('Navbar', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('renders the logo and all nav links', () => {
    render(<Navbar />)
    expect(screen.getByText('cat')).toBeInTheDocument()
    ;['home', 'about', 'projects', 'contact'].forEach((label) => {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0)
    })
  })

  it('renders the CV download link with tooltip', () => {
    render(<Navbar />)
    const link = screen.getByLabelText('download my cv')
    expect(link).toHaveAttribute('href', '/assets/bruna-szarin-cv.pdf')
    expect(link).toHaveAttribute('download')
    expect(screen.getByRole('tooltip')).toHaveTextContent('download my cv here')
  })

  it('scrolls to the target section when a desktop link is clicked', () => {
    const section = document.createElement('div')
    section.id = 'about'
    section.scrollIntoView = jest.fn()
    document.body.appendChild(section)

    render(<Navbar />)
    const desktopNav = document.querySelector('.links') as HTMLElement
    fireEvent.click(within(desktopNav).getByText('about'))
    expect(section.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
  })

  it('adds the scrolled class after scrolling past 20px', async () => {
    const { container } = render(<Navbar />)
    const nav = container.querySelector('nav')
    expect(nav?.className).not.toMatch(/scrolled/)

    await act(async () => {
      Object.defineProperty(window, 'scrollY', { value: 50, configurable: true })
      window.dispatchEvent(new Event('scroll'))
      // O cálculo agora roda dentro de requestAnimationFrame (throttle
      // do scroll-spy) — espera o próximo frame antes de checar o estado
      await new Promise((resolve) => requestAnimationFrame(resolve))
    })

    expect(nav?.className).toMatch(/scrolled/)
  })

  it('renders the mobile tab bar with all sections', () => {
    render(<Navbar />)
    const mobileNav = screen.getByRole('navigation', { name: 'mobile navigation' })
    ;['home', 'about', 'projects', 'contact'].forEach((label) => {
      expect(within(mobileNav).getByText(label)).toBeInTheDocument()
    })
  })
})

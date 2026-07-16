import { render, screen } from '@testing-library/react'
import { HeroSection } from './hero-section'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img alt="" {...props} />,
}))
jest.mock('@/hooks/useMouseParallax', () => ({
  useMouseParallax: () => ({ containerRef: { current: null }, offset: { x: 0, y: 0 } }),
}))
jest.mock('@/hooks/useFadeIn', () => ({
  useFadeIn: () => ({ ref: { current: null }, isVisible: true }),
}))
jest.mock('../schrodinger-cat', () => ({
  SchrodingerCat: () => <div data-testid="cat" />,
}))
jest.mock('../parallax-background', () => ({
  ParallaxBackground: () => <div data-testid="parallax-bg" />,
}))
jest.mock('../floating-elements', () => ({
  FloatingElements: () => <div data-testid="floating" />,
}))
jest.mock('@/components/ui/pixel-button', () => ({
  PixelButton: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => <button onClick={onClick}>{children}</button>,
}))

describe('HeroSection', () => {
  it('renders headline and subtitle', () => {
    render(<HeroSection />)
    expect(screen.getByText('a fullstack software engineer.')).toBeInTheDocument()
    expect(screen.getByText(/I build things for the web/i)).toBeInTheDocument()
  })

  it('renders the "my work" and "about me" buttons', () => {
    render(<HeroSection />)
    expect(screen.getByText('my work')).toBeInTheDocument()
    expect(screen.getByText('about me')).toBeInTheDocument()
  })

  it('scrolls to #projects when "my work" is clicked', () => {
    const section = document.createElement('div')
    section.id = 'projects'
    section.scrollIntoView = jest.fn()
    document.body.appendChild(section)

    render(<HeroSection />)
    screen.getByText('my work').click()
    expect(section.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })
    document.body.removeChild(section)
  })

  it('renders the SchrodingerCat', () => {
    render(<HeroSection />)
    expect(screen.getByTestId('cat')).toBeInTheDocument()
  })
})

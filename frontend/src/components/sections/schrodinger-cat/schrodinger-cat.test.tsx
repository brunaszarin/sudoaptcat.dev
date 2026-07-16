import { render, screen } from '@testing-library/react'
import { SchrodingerCat } from './schrodinger-cat'

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ priority: _priority, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => <img alt="" {...props} />,
}))

describe('SchrodingerCat', () => {
  it('renders both cat states (closed and open box)', () => {
    const { container } = render(<SchrodingerCat />)
    expect(screen.getByAltText('gato de Schrödinger escondido na caixa')).toBeInTheDocument()
    expect(container.querySelectorAll('img')).toHaveLength(2)
  })

  it('applies custom width and height to both images', () => {
    const { container } = render(<SchrodingerCat width={100} height={80} />)
    const images = container.querySelectorAll('img')
    images.forEach((img) => {
      expect(img).toHaveAttribute('width', '100')
      expect(img).toHaveAttribute('height', '80')
    })
  })

  it('renders 6 decorative sparkles', () => {
    const { container } = render(<SchrodingerCat />)
    const sparkles = container.querySelectorAll('[aria-hidden="true"]')
    expect(sparkles.length).toBeGreaterThanOrEqual(6)
  })
})

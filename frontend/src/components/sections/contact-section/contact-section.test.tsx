import { render, screen, fireEvent } from '@testing-library/react'
import { ContactSection } from './contact-section'

const mutateMock = jest.fn()

jest.mock('@/hooks/useFadeIn', () => ({
  useFadeIn: () => ({ ref: { current: null }, isVisible: true }),
}))
jest.mock('@/hooks/useContact', () => ({
  useContact: () => ({
    mutate: mutateMock,
    isPending: false,
    isSuccess: false,
    isError: false,
  }),
}))
jest.mock('@/components/ui/pixel-button', () => ({
  PixelButton: ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props}>{children}</button>,
}))
jest.mock('@/components/sections/social-links', () => ({
  SocialLinks: () => <div data-testid="social-links" />,
}))
jest.mock('./floating-symbols', () => ({
  FloatingSymbols: () => <div data-testid="floating-symbols" />,
}))
jest.mock('./typing-cat', () => ({
  TypingCat: () => <div data-testid="typing-cat" />,
}))

describe('ContactSection', () => {
  beforeEach(() => mutateMock.mockClear())

  it('renders name, email and message fields', () => {
    render(<ContactSection />)
    expect(screen.getByLabelText('name')).toBeInTheDocument()
    expect(screen.getByLabelText('email')).toBeInTheDocument()
    expect(screen.getByLabelText('message')).toBeInTheDocument()
  })

  it('updates form state as the user types', () => {
    render(<ContactSection />)
    fireEvent.change(screen.getByLabelText('name'), { target: { value: 'Bruna' } })
    expect(screen.getByLabelText('name')).toHaveValue('Bruna')
  })

  it('calls contact.mutate with form data on submit', () => {
    render(<ContactSection />)
    fireEvent.change(screen.getByLabelText('name'), { target: { value: 'Bruna' } })
    fireEvent.change(screen.getByLabelText('email'), { target: { value: 'b@b.com' } })
    fireEvent.change(screen.getByLabelText('message'), { target: { value: 'hey' } })
    fireEvent.submit(screen.getByLabelText('name').closest('form')!)

    expect(mutateMock).toHaveBeenCalledWith(
      { name: 'Bruna', email: 'b@b.com', message: 'hey' },
      expect.any(Object)
    )
  })

  it('renders the mailto link and social links', () => {
    render(<ContactSection />)
    expect(screen.getByText('brunaszarin@gmail.com')).toHaveAttribute(
      'href',
      'mailto:brunaszarin@gmail.com'
    )
    expect(screen.getByTestId('social-links')).toBeInTheDocument()
  })
})

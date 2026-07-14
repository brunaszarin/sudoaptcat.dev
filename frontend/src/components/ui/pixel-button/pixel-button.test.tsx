import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PixelButton } from './pixel-button'

describe('PixelButton', () => {
  it('renderiza o texto passado como children', () => {
    // Arrange
    render(<PixelButton>my work</PixelButton>)

    // Act
    const button = screen.getByRole('button', { name: 'my work' })

    // Assert
    expect(button).toBeInTheDocument()
  })

  it('dispara o onClick quando clicado', async () => {
    // Arrange
    const handleClick = jest.fn()
    const user = userEvent.setup()
    render(<PixelButton onClick={handleClick}>enviar</PixelButton>)

    // Act
    await user.click(screen.getByRole('button', { name: 'enviar' }))

    // Assert
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('não dispara o onClick quando desabilitado', async () => {
    // Arrange
    const handleClick = jest.fn()
    const user = userEvent.setup()
    render(
      <PixelButton onClick={handleClick} disabled>
        enviar
      </PixelButton>
    )

    // Act
    await user.click(screen.getByRole('button', { name: 'enviar' }))

    // Assert
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('aplica a variante correta', () => {
    // Arrange
    const { container } = render(<PixelButton variant="pink">start</PixelButton>)

    // Act
    const button = container.querySelector('button')

    // Assert
    expect(button?.className).toContain('pink')
  })
})

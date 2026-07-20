import { render, screen, fireEvent } from '@testing-library/react'
import { SystemDialog } from './system-dialog'

describe('SystemDialog', () => {
  it('renders the icon and message', () => {
    render(
      <SystemDialog icon="!" message="something happened" actions={[]} onClose={jest.fn()} />
    )
    expect(screen.getByText('!')).toBeInTheDocument()
    expect(screen.getByText('something happened')).toBeInTheDocument()
  })

  it('renders each action button and calls its onClick when clicked', () => {
    const okClick = jest.fn()
    const noClick = jest.fn()

    render(
      <SystemDialog
        icon="?"
        message="are you sure?"
        onClose={jest.fn()}
        actions={[
          { label: 'no', onClick: noClick, variant: 'ghost' },
          { label: 'yes', onClick: okClick },
        ]}
      />
    )

    fireEvent.click(screen.getByText('no'))
    expect(noClick).toHaveBeenCalled()

    fireEvent.click(screen.getByText('yes'))
    expect(okClick).toHaveBeenCalled()
  })

  it('calls onClose when the ✕ button is clicked', () => {
    const onClose = jest.fn()
    render(<SystemDialog icon="!" message="msg" actions={[]} onClose={onClose} />)

    fireEvent.click(screen.getByText('✕'))
    expect(onClose).toHaveBeenCalled()
  })

  it('calls onClose when clicking the overlay background', () => {
    const onClose = jest.fn()
    const { container } = render(
      <SystemDialog icon="!" message="msg" actions={[]} onClose={onClose} />
    )

    // O primeiro filho do container é o overlay de fundo
    fireEvent.click(container.firstChild as Element)
    expect(onClose).toHaveBeenCalled()
  })

  it('does not call onClose when clicking inside the dialog window itself', () => {
    const onClose = jest.fn()
    render(<SystemDialog icon="!" message="click test" actions={[]} onClose={onClose} />)

    fireEvent.click(screen.getByText('click test'))
    expect(onClose).not.toHaveBeenCalled()
  })
})

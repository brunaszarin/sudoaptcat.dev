import { render, screen } from '@testing-library/react'
import { Taskbar } from './taskbar'

describe('Taskbar', () => {
  it('renders the start button', () => {
    render(<Taskbar clock="14:32" />)
    expect(screen.getByText('start')).toBeInTheDocument()
  })

  it('displays the clock value passed in as a prop', () => {
    render(<Taskbar clock="09:05" />)
    expect(screen.getByText('09:05')).toBeInTheDocument()
  })

  it('renders an empty clock without crashing', () => {
    render(<Taskbar clock="" />)
    expect(screen.getByText('start')).toBeInTheDocument()
  })
})

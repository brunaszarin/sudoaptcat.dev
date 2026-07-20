import { render, screen, fireEvent } from '@testing-library/react'
import { DesktopIcons } from './desktop-icons'

describe('DesktopIcons', () => {
  it('renders all 5 icons with labels', () => {
    render(<DesktopIcons onIconClick={jest.fn()} />)
    ;['trash', 'home', 'about', 'projects', 'contact'].forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument()
    })
  })

  it('calls onIconClick with the correct id when an icon is clicked', () => {
    const onIconClick = jest.fn()
    render(<DesktopIcons onIconClick={onIconClick} />)

    fireEvent.click(screen.getByText('trash'))
    expect(onIconClick).toHaveBeenCalledWith('trash')

    fireEvent.click(screen.getByText('about'))
    expect(onIconClick).toHaveBeenCalledWith('about')
  })

  it('renders icons in a fixed order: trash, home, about, projects, contact', () => {
    render(<DesktopIcons onIconClick={jest.fn()} />)
    const labels = screen.getAllByRole('button').map((btn) => btn.textContent)
    expect(labels).toEqual(['trash', 'home', 'about', 'projects', 'contact'])
  })
})

import { renderHook, act } from '@testing-library/react'
import { useScrollDirection } from './useScrollDirection'

describe('useScrollDirection', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, configurable: true })
  })

  it('starts with direction "down"', () => {
    const { result } = renderHook(() => useScrollDirection())
    expect(result.current.current).toBe('down')
  })

  it('detects downward scroll', () => {
    const { result } = renderHook(() => useScrollDirection())

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100, configurable: true })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current.current).toBe('down')
  })

  it('detects upward scroll after scrolling down first', () => {
    const { result } = renderHook(() => useScrollDirection())

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 200, configurable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 50, configurable: true })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current.current).toBe('up')
  })

  it('ignores tiny scroll deltas (2px or less)', () => {
    const { result } = renderHook(() => useScrollDirection())

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 300, configurable: true })
      window.dispatchEvent(new Event('scroll'))
    })
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 299, configurable: true })
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current.current).toBe('down')
  })

  it('removes the scroll listener on unmount', () => {
    const removeSpy = jest.spyOn(window, 'removeEventListener')
    const { unmount } = renderHook(() => useScrollDirection())

    unmount()

    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    removeSpy.mockRestore()
  })
})

import { renderHook, act } from '@testing-library/react'
import { useTerminalScroll } from './useTerminalScroll'

function mockSection(offsetHeight: number, top: number) {
  const section = document.createElement('section')
  Object.defineProperty(section, 'offsetHeight', { value: offsetHeight, configurable: true })
  section.getBoundingClientRect = jest.fn(() => ({ top } as DOMRect))
  return section
}

function renderWithSection(itemCount: number, offsetHeight: number, top: number) {
  const section = mockSection(offsetHeight, top)
  return renderHook(() => {
    const hook = useTerminalScroll(itemCount)
    if (!hook.sectionRef.current) {
      hook.sectionRef.current = section
    }
    return hook
  })
}

describe('useTerminalScroll', () => {
  let rafSpy: jest.SpyInstance

  beforeEach(() => {
    rafSpy = jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0)
      return 0
    })
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true })
  })

  afterEach(() => {
    rafSpy.mockRestore()
  })

  it('starts with progress 0, powerLevel 0, and no item selected', () => {
    const { result } = renderWithSection(5, 1800, 0)
    expect(result.current.progress).toBe(0)
    expect(result.current.powerLevel).toBe(0)
    expect(result.current.selectedIndex).toBe(-1)
  })

  it('clamps progress between 0 and 1', () => {
    // offsetHeight 1800, viewport 800, top positivo -> scrolled negativo -> clamp em 0
    const { result } = renderWithSection(5, 1800, 500)
    expect(result.current.progress).toBe(0)
  })

  it('reaches full power (1) once progress is far enough from both edges', () => {
    // offsetHeight 1800, viewport 800 -> scrollableDistance = 1000
    // queremos progress = 0.5 -> scrolled = 500 -> top = -500
    const section = mockSection(1800, -500)
    const { result } = renderHook(() => {
      const hook = useTerminalScroll(5)
      if (!hook.sectionRef.current) hook.sectionRef.current = section
      return hook
    })

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current.progress).toBeCloseTo(0.5)
    expect(result.current.powerLevel).toBe(1)
  })

  it('has powerLevel 0 right at the very start of scroll', () => {
    const { result } = renderWithSection(5, 1800, 0)
    expect(result.current.progress).toBe(0)
    expect(result.current.powerLevel).toBe(0)
  })

  it('selects no item while still inside the power-ramp zone', () => {
    // progress = 0.1 está dentro da zona de "ligando" (< 0.28) -> sem seleção
    // scrollableDistance = 1000, progress 0.1 -> scrolled = 100 -> top = -100
    const section = mockSection(1800, -100)
    const { result } = renderHook(() => {
      const hook = useTerminalScroll(5)
      if (!hook.sectionRef.current) hook.sectionRef.current = section
      return hook
    })

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current.selectedIndex).toBe(-1)
  })

  it('selects the middle item when progress is centered', () => {
    // progress 0.5, itemCount 5 -> zona útil 0.28–0.72, local 0.5 -> index 2
    const section = mockSection(1800, -500)
    const { result } = renderHook(() => {
      const hook = useTerminalScroll(5)
      if (!hook.sectionRef.current) hook.sectionRef.current = section
      return hook
    })

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current.selectedIndex).toBe(2)
  })

  it('never selects an item when itemCount is 0', () => {
    const section = mockSection(1800, -500)
    const { result } = renderHook(() => {
      const hook = useTerminalScroll(0)
      if (!hook.sectionRef.current) hook.sectionRef.current = section
      return hook
    })

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current.selectedIndex).toBe(-1)
  })

  it('does nothing when sectionRef.current is null', () => {
    const { result } = renderHook(() => useTerminalScroll(5))

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current.progress).toBe(0)
    expect(result.current.selectedIndex).toBe(-1)
  })

  it('removes the scroll listener on unmount', () => {
    const section = mockSection(1800, -500)
    const removeSpy = jest.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() => {
      const hook = useTerminalScroll(5)
      if (!hook.sectionRef.current) hook.sectionRef.current = section
      return hook
    })

    unmount()

    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function))
    removeSpy.mockRestore()
  })
})

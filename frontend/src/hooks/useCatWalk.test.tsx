import { renderHook, act } from '@testing-library/react'
import { useCatWalk } from './useCatWalk'

function mockSection(offsetHeight: number, top: number) {
  const section = document.createElement('section')
  Object.defineProperty(section, 'offsetHeight', { value: offsetHeight, configurable: true })
  section.getBoundingClientRect = jest.fn(() => ({ top } as DOMRect))
  return section
}

function renderWithSection(offsetHeight: number, top: number) {
  const section = mockSection(offsetHeight, top)
  return renderHook(() => {
    const walk = useCatWalk()
    if (!walk.sectionRef.current) {
      walk.sectionRef.current = section
    }
    return walk
  })
}

describe('useCatWalk', () => {
  let rafSpy: jest.SpyInstance

  beforeEach(() => {
    jest.useFakeTimers()
    // Executa o callback do requestAnimationFrame na hora, de forma síncrona,
    // pra podermos testar o resultado sem esperar um frame de verdade
    rafSpy = jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0)
      return 0
    })
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true })
  })

  afterEach(() => {
    rafSpy.mockRestore()
    jest.useRealTimers()
  })

  it('starts with progress 0 and facing right', () => {
    // O hook chama computeScroll() uma vez no mount (não só em eventos de
    // scroll de verdade), então isWalking já nasce true quando há seção —
    // por isso não testamos isWalking aqui, só nos valores que não dependem
    // desse efeito colateral do mount.
    const { result } = renderWithSection(1800, 0)
    expect(result.current.progress).toBe(0)
    expect(result.current.facingLeft).toBe(false)
  })

  it('sets isWalking to true immediately on mount when a section is attached', () => {
    const { result } = renderWithSection(1800, 0)
    expect(result.current.isWalking).toBe(true)
  })

  it('computes progress based on scroll position within the section', () => {
    // offsetHeight 1800, viewport 800 -> scrollableDistance = 1000
    // top = -500 -> scrolled = 500 -> progress = 0.5
    const section = mockSection(1800, -500)
    const { result } = renderHook(() => {
      const walk = useCatWalk()
      if (!walk.sectionRef.current) walk.sectionRef.current = section
      return walk
    })

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current.progress).toBeCloseTo(0.5)
  })

  it('clamps progress between 0 and 1', () => {
    const section = mockSection(1800, 500) // top positivo -> scrolled negativo
    const { result } = renderHook(() => {
      const walk = useCatWalk()
      if (!walk.sectionRef.current) walk.sectionRef.current = section
      return walk
    })

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current.progress).toBe(0)
  })

  it('sets isWalking to true on scroll and back to false after the timeout', () => {
    const section = mockSection(1800, -100)
    const { result } = renderHook(() => {
      const walk = useCatWalk()
      if (!walk.sectionRef.current) walk.sectionRef.current = section
      return walk
    })

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })
    expect(result.current.isWalking).toBe(true)

    act(() => {
      jest.advanceTimersByTime(120)
    })
    expect(result.current.isWalking).toBe(false)
  })

  it('sets facingLeft to false when scrolling forward (progress increasing)', () => {
    const section = mockSection(1800, 0)
    const { result } = renderHook(() => {
      const walk = useCatWalk()
      if (!walk.sectionRef.current) walk.sectionRef.current = section
      return walk
    })

    section.getBoundingClientRect = jest.fn(() => ({ top: -200 } as DOMRect))
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current.facingLeft).toBe(false)
  })

  it('sets facingLeft to true when scrolling backward (progress decreasing)', () => {
    const section = mockSection(1800, -400)
    const { result } = renderHook(() => {
      const walk = useCatWalk()
      if (!walk.sectionRef.current) walk.sectionRef.current = section
      return walk
    })

    // primeiro avança bastante...
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    // ...depois volta
    section.getBoundingClientRect = jest.fn(() => ({ top: -100 } as DOMRect))
    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current.facingLeft).toBe(true)
  })

  it('does nothing when sectionRef.current is null (no listener attached)', () => {
    const { result } = renderHook(() => useCatWalk())

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    // Sem seção atribuída, o efeito nunca configura o listener — o estado
    // permanece nos valores iniciais
    expect(result.current.progress).toBe(0)
  })

  it('clears the walking timeout on unmount', () => {
    const section = mockSection(1800, -100)
    const clearSpy = jest.spyOn(window, 'clearTimeout')

    const { unmount } = renderHook(() => {
      const walk = useCatWalk()
      if (!walk.sectionRef.current) walk.sectionRef.current = section
      return walk
    })

    act(() => {
      window.dispatchEvent(new Event('scroll'))
    })

    unmount()

    expect(clearSpy).toHaveBeenCalled()
    clearSpy.mockRestore()
  })
})

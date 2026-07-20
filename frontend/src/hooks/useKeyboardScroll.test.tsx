import { renderHook } from '@testing-library/react'
import { useKeyboardScroll } from './useKeyboardScroll'

function mockSectionRect(overrides: Partial<DOMRect>) {
  const rect = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    toJSON: () => {},
    ...overrides,
  } as DOMRect

  const section = document.createElement('section')
  section.getBoundingClientRect = jest.fn(() => rect)
  return section
}

describe('useKeyboardScroll', () => {
  let scrollBySpy: jest.SpyInstance

  beforeEach(() => {
    scrollBySpy = jest.spyOn(window, 'scrollBy').mockImplementation(() => {})
    Object.defineProperty(window, 'innerHeight', { value: 800, configurable: true })
  })

  afterEach(() => {
    scrollBySpy.mockRestore()
  })

  it('scrolls forward on ArrowRight when the section fills the viewport', () => {
    const section = mockSectionRect({ top: 0, bottom: 800 })
    const ref = { current: section }

    renderHook(() => useKeyboardScroll(ref))

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))

    expect(scrollBySpy).toHaveBeenCalledWith({ top: 120, behavior: 'smooth' })
  })

  it('scrolls backward on ArrowLeft when the section fills the viewport', () => {
    const section = mockSectionRect({ top: 0, bottom: 800 })
    const ref = { current: section }

    renderHook(() => useKeyboardScroll(ref))

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }))

    expect(scrollBySpy).toHaveBeenCalledWith({ top: -120, behavior: 'smooth' })
  })

  it('respects a custom step value', () => {
    const section = mockSectionRect({ top: 0, bottom: 800 })
    const ref = { current: section }

    renderHook(() => useKeyboardScroll(ref, 300))

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))

    expect(scrollBySpy).toHaveBeenCalledWith({ top: 300, behavior: 'smooth' })
  })

  it('does nothing when the section is not filling the viewport', () => {
    // Seção parcialmente fora de vista (top > 0) — não deve reagir
    const section = mockSectionRect({ top: 50, bottom: 700 })
    const ref = { current: section }

    renderHook(() => useKeyboardScroll(ref))

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))

    expect(scrollBySpy).not.toHaveBeenCalled()
  })

  it('does nothing when sectionRef.current is null', () => {
    const ref = { current: null }

    renderHook(() => useKeyboardScroll(ref))

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }))

    expect(scrollBySpy).not.toHaveBeenCalled()
  })

  it('ignores keys other than ArrowLeft/ArrowRight', () => {
    const section = mockSectionRect({ top: 0, bottom: 800 })
    const ref = { current: section }

    renderHook(() => useKeyboardScroll(ref))

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))

    expect(scrollBySpy).not.toHaveBeenCalled()
  })

  it('removes the keydown listener on unmount', () => {
    const section = mockSectionRect({ top: 0, bottom: 800 })
    const ref = { current: section }
    const removeSpy = jest.spyOn(window, 'removeEventListener')

    const { unmount } = renderHook(() => useKeyboardScroll(ref))
    unmount()

    expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
    removeSpy.mockRestore()
  })
})

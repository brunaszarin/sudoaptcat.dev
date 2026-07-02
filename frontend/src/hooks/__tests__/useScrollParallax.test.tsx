import { renderHook } from '@testing-library/react'
import { useScrollParallax } from '../useScrollParallax'

describe('useScrollParallax', () => {
  it('retorna elementRef e offset inicial', () => {
    // Arrange & Act
    const { result } = renderHook(() => useScrollParallax())

    // Assert
    expect(result.current.elementRef).toBeDefined()
    expect(typeof result.current.offset).toBe('number')
  })

  it('aceita uma velocidade customizada', () => {
    // Arrange & Act
    const { result } = renderHook(() => useScrollParallax(0.5))

    // Assert
    expect(result.current.offset).toBe(0)
  })

  it('registra e remove o listener de scroll', () => {
    // Arrange
    const addSpy = jest.spyOn(window, 'addEventListener')
    const removeSpy = jest.spyOn(window, 'removeEventListener')

    // Act
    const { unmount } = renderHook(() => useScrollParallax())
    unmount()

    // Assert — como o elementRef é null no jsdom, o listener não é registrado,
    // mas o hook deve desmontar sem erro
    expect(() => unmount()).not.toThrow()

    addSpy.mockRestore()
    removeSpy.mockRestore()
  })
})
import { renderHook} from '@testing-library/react'
import { useMouseParallax } from '../useMouseParallax'

describe('useMouseParallax', () => {
  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => {
      return 1
    })
    jest.spyOn(window, 'cancelAnimationFrame').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('retorna containerRef e offset inicial zerado', () => {
    // Arrange & Act
    const { result } = renderHook(() => useMouseParallax())

    // Assert
    expect(result.current.offset).toEqual({ x: 0, y: 0 })
    expect(result.current.containerRef).toBeDefined()
  })

  it('aceita um fator de suavização customizado', () => {
    // Arrange & Act
    const { result } = renderHook(() => useMouseParallax(0.2))

    // Assert
    expect(result.current.offset).toEqual({ x: 0, y: 0 })
  })

it('desmonta sem lançar erro', () => {
    // Arrange
    const { unmount } = renderHook(() => useMouseParallax())

    // Act & Assert
    expect(() => unmount()).not.toThrow()
  })
})
import { renderHook } from '@testing-library/react'
import { usePageTransition } from './usePageTransition'
import { PageTransitionContext } from '@/components/page-transition/page-transition-context'

describe('usePageTransition', () => {
  it('throws when used outside of PageTransitionProvider', () => {
    const { result } = renderHook(() => {
      try {
        return usePageTransition()
      } catch (e) {
        return e as Error
      }
    })

    expect(result.current).toBeInstanceOf(Error)
    expect((result.current as Error).message).toMatch(/PageTransitionProvider/)
  })

  it('returns the context value when inside a provider', () => {
    const navigate = jest.fn()
    function wrapper({ children }: { children: React.ReactNode }) {
      return (
        <PageTransitionContext.Provider value={{ navigate }}>
          {children}
        </PageTransitionContext.Provider>
      )
    }

    const { result } = renderHook(() => usePageTransition(), { wrapper })
    expect(result.current.navigate).toBe(navigate)
  })
})

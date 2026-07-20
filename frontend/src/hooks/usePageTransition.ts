import { useContext } from 'react'
import { PageTransitionContext } from '@/components/page-transition/page-transition-context'

/**
 * Hook pra navegar entre páginas passando pela transição de pixels.
 * Usa isso em vez de router.push direto sempre que for uma navegação
 * de página inteira (não rolagem dentro da mesma página).
 */
export function usePageTransition() {
  const ctx = useContext(PageTransitionContext)
  if (!ctx) {
    throw new Error('usePageTransition precisa estar dentro de <PageTransitionProvider>')
  }
  return ctx
}

'use client'

import { createContext } from 'react'

interface PageTransitionContextValue {
  navigate: (path: string) => void
}

export const PageTransitionContext = createContext<PageTransitionContextValue | null>(null)

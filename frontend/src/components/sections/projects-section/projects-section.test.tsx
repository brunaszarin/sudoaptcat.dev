import { render, screen, act } from '@testing-library/react'
import { ProjectsSection } from './projects-section'

jest.mock('@/hooks/useCatWalk', () => ({
  useCatWalk: () => ({ sectionRef: { current: document.createElement('section') } }),
}))

jest.mock('@/hooks/useMouseParallax', () => ({
  useMouseParallax: () => ({ containerRef: { current: null }, offset: { x: 0, y: 0 } }),
}))

jest.mock('@/hooks/useFadeIn', () => ({
  useFadeIn: () => ({ ref: { current: null }, isVisible: true }),
}))

jest.mock('@/hooks/useKeyboardScroll', () => ({
  useKeyboardScroll: jest.fn(),
}))

jest.mock('./space-background', () => ({
  SpaceBackground: () => <div data-testid="space-bg" />,
}))

jest.mock('./world-strip', () => ({
  WorldStrip: () => <div data-testid="world-strip" />,
  CAT_ANCHOR: 100,
  getWorldShift: (progress: number) => progress * 1000,
}))

jest.mock('./buildings-skyline', () => ({
  BuildingsSkyline: () => <div data-testid="buildings-skyline" />,
}))

jest.mock('./walking-cat', () => ({
  WalkingCat: ({ isWalking }: { isWalking: boolean }) => <div data-testid="walking-cat" data-walking={isWalking} />,
}))

jest.mock('./controls-hint', () => ({
  ControlsHint: () => <div data-testid="controls-hint" />,
}))

// Captura o onUpdate registrado pelo componente no ScrollTrigger.create,
// pra podermos simular qualquer valor de progresso/direção nos testes —
// sem isso, o pin/scrub de verdade nunca dispara dentro do jsdom
let capturedOnUpdate: ((self: { progress: number; direction: number }) => void) | null = null

jest.mock('@/lib/gsap', () => ({
  gsap: {},
  ScrollTrigger: {
    create: (config: { onUpdate?: typeof capturedOnUpdate }) => {
      capturedOnUpdate = config.onUpdate ?? null
      return { kill: jest.fn() }
    },
    refresh: jest.fn(),
  },
}))

function fireScrollUpdate(progress: number, direction = 1) {
  act(() => {
    capturedOnUpdate?.({ progress, direction })
  })
}

describe('ProjectsSection', () => {
  beforeEach(() => {
    capturedOnUpdate = null
  })

  it('renders the section title', () => {
    render(<ProjectsSection />)
    expect(screen.getByText("some places I've been")).toBeInTheDocument()
  })

  it('renders the world strip, cat and controls hint', () => {
    render(<ProjectsSection />)
    expect(screen.getByTestId('world-strip')).toBeInTheDocument()
    expect(screen.getByTestId('walking-cat')).toBeInTheDocument()
    expect(screen.getByTestId('controls-hint')).toBeInTheDocument()
  })

  it('marks the cat as walking when progress is between 0 and 1', () => {
    render(<ProjectsSection />)
    fireScrollUpdate(0.5)
    expect(screen.getByTestId('walking-cat')).toHaveAttribute('data-walking', 'true')
  })

  it('does not mark the cat as walking when progress is 0', () => {
    render(<ProjectsSection />)
    fireScrollUpdate(0)
    expect(screen.getByTestId('walking-cat')).toHaveAttribute('data-walking', 'false')
  })

  it('positions the cat anchor at CAT_ANCHOR px from the left', () => {
    const { container } = render(<ProjectsSection />)
    const anchor = container.querySelector(`[style*="left: 100px"]`)
    expect(anchor).toBeInTheDocument()
  })
})

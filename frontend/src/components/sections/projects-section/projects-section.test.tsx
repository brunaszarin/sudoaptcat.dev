import { render, screen } from '@testing-library/react'
import { ProjectsSection } from './projects-section'

jest.mock('@/hooks/useCatWalk', () => ({
  useCatWalk: () => ({ sectionRef: { current: null }, progress: 0.5, facingLeft: false }),
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

describe('ProjectsSection', () => {
  it('renders the section title', () => {
    render(<ProjectsSection />)
    expect(screen.getByText("some places I've already been")).toBeInTheDocument()
  })

  it('renders the world strip, cat and controls hint', () => {
    render(<ProjectsSection />)
    expect(screen.getByTestId('world-strip')).toBeInTheDocument()
    expect(screen.getByTestId('walking-cat')).toBeInTheDocument()
    expect(screen.getByTestId('controls-hint')).toBeInTheDocument()
  })

  it('marks the cat as walking when progress is between 0 and 1', () => {
    render(<ProjectsSection />)
    expect(screen.getByTestId('walking-cat')).toHaveAttribute('data-walking', 'true')
  })

  it('positions the cat anchor at CAT_ANCHOR px from the left', () => {
    const { container } = render(<ProjectsSection />)
    const anchor = container.querySelector(`[style*="left: 100px"]`)
    expect(anchor).toBeInTheDocument()
  })
})

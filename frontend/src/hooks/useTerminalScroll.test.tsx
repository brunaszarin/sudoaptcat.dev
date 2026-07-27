import { computePowerLevel, computeSelectedIndex } from './useTerminalScroll'

describe('computePowerLevel', () => {
  it('is 0 right at the very start of the progress range', () => {
    expect(computePowerLevel(0)).toBe(0)
  })

  it('is 0 right at the very end of the progress range', () => {
    expect(computePowerLevel(1)).toBe(0)
  })

  it('reaches full power (1) once progress is far enough from both edges', () => {
    expect(computePowerLevel(0.5)).toBe(1)
  })

  it('is symmetric — same power at equal distances from each edge', () => {
    expect(computePowerLevel(0.2)).toBeCloseTo(computePowerLevel(0.8))
  })
})

describe('computeSelectedIndex', () => {
  it('selects no item while still inside the power-ramp zone', () => {
    // 0.1 está dentro da zona de "ligando" (< 0.28)
    expect(computeSelectedIndex(0.1, 5)).toBe(-1)
  })

  it('selects the middle item when progress is centered', () => {
    // progress 0.5, itemCount 5 -> zona útil 0.28–0.72, local 0.5 -> index 2
    expect(computeSelectedIndex(0.5, 5)).toBe(2)
  })

  it('never selects an item when itemCount is 0', () => {
    expect(computeSelectedIndex(0.5, 0)).toBe(-1)
  })

  it('clamps the index to the last item even at the very edge of the zone', () => {
    expect(computeSelectedIndex(0.71, 5)).toBeLessThanOrEqual(4)
  })
})

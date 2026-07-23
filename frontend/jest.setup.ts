import '@testing-library/jest-dom'

// O jsdom (ambiente simulado do Jest) não implementa window.matchMedia,
// mas o GSAP passou a depender dele internamente (via ScrollTrigger) —
// sem esse mock, qualquer teste que importe src/lib/gsap quebra.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // API antiga, alguns libs ainda checam
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

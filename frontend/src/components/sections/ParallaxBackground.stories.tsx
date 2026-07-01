import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ParallaxBackground } from './ParallaxBackground'
import { useMouseParallax } from '@/hooks/useMouseParallax'

// Wrapper que conecta o hook ao componente pra demonstrar o efeito ao vivo
function ParallaxDemo() {
  const { containerRef, offset } = useMouseParallax()

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '500px',
        background: '#000',
        overflow: 'hidden',
      }}
    >
      <ParallaxBackground offset={offset} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#4d7200',
          fontFamily: 'var(--font-bricolage)',
          fontSize: '13px',
          pointerEvents: 'none',
        }}
      >
        
      </div>
    </div>
  )
}

const meta = {
  title: 'Sections/ParallaxBackground',
  component: ParallaxDemo,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof ParallaxDemo>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
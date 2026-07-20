import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { FloatingSymbols } from './floating-symbols'

const meta = {
  title: 'Sections/ContactSection/FloatingSymbols',
  component: FloatingSymbols,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof FloatingSymbols>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ position: 'relative', height: '400px', background: '#000' }}>
        <Story />
      </div>
    ),
  ],
}

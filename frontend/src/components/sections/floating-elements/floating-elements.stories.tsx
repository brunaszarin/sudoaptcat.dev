import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { FloatingElements } from './floating-elements'

const meta = {
  title: 'Sections/FloatingElements',
  component: FloatingElements,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof FloatingElements>

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

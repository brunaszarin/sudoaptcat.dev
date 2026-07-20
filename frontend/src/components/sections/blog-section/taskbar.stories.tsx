import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Taskbar } from './taskbar'

const meta = {
  title: 'BlogSection/Taskbar',
  component: Taskbar,
  parameters: { layout: 'fullscreen' },
  args: {
    clock: '14:32',
  },
} satisfies Meta<typeof Taskbar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const EmptyClock: Story = {
  args: { clock: '' },
}

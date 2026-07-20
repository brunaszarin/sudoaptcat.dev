import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { DesktopIcons } from './desktop-icons'

const meta = {
  title: 'BlogSection/DesktopIcons',
  component: DesktopIcons,
  parameters: { layout: 'centered' },
  args: {
    onIconClick: (id: string) => console.log('clicked:', id),
  },
} satisfies Meta<typeof DesktopIcons>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

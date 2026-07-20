import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { TypingCat } from './typing-cat'

const meta = {
  title: 'Sections/ContactSection/TypingCat',
  component: TypingCat,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof TypingCat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

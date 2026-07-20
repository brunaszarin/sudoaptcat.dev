import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SocialLinks } from './social-links'

const meta = {
  title: 'Sections/SocialLinks',
  component: SocialLinks,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SocialLinks>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

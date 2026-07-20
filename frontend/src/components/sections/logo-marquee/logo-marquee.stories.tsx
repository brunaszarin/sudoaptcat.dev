import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { LogoMarquee } from './logo-marquee'

const meta = {
  title: 'Sections/LogoMarquee',
  component: LogoMarquee,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof LogoMarquee>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

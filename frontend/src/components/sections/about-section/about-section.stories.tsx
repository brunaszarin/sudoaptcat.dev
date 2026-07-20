import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { AboutSection } from './about-section'

const meta = {
  title: 'Sections/AboutSection',
  component: AboutSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AboutSection>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

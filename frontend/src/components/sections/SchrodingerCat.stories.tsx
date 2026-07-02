import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SchrodingerCat } from './SchrodingerCat'

const meta = {
  title: 'Sections/SchrodingerCat',
  component: SchrodingerCat,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof SchrodingerCat>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
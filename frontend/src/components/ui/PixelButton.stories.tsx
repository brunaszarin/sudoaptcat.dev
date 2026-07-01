import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PixelButton } from './PixelButton'

const meta = {
  title: 'UI/PixelButton',
  component: PixelButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['green', 'pink', 'ghost'],
      description: 'Estilo visual do botão',
    },
    disabled: {
      control: 'boolean',
    },
    children: {
      control: 'text',
      description: 'Texto do botão',
    },
  },
  args: {
    children: 'my work',
    variant: 'green',
  },
} satisfies Meta<typeof PixelButton>

export default meta
type Story = StoryObj<typeof meta>

export const Green: Story = {
  args: {
    variant: 'green',
    children: 'my work',
  },
}

export const Pink: Story = {
  args: {
    variant: 'pink',
    children: 'start',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'about me',
  },
}

export const Disabled: Story = {
  args: {
    variant: 'green',
    children: 'my work',
    disabled: true,
  },
}
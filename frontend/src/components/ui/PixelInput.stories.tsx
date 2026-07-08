import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { PixelInput } from './PixelInput'

const meta = {
  title: 'UI/PixelInput',
  component: PixelInput,
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text' },
    multiline: { control: 'boolean' },
    placeholder: { control: 'text' },
  },
  args: {
    label: 'name',
    name: 'name',
    placeholder: 'your name',
    multiline: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PixelInput>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {
  args: { label: 'name', placeholder: 'your name' },
}

export const Email: Story = {
  args: { label: 'email', name: 'email', placeholder: 'you@email.com', type: 'email' },
}

export const Textarea: Story = {
  args: {
    label: 'message',
    name: 'message',
    placeholder: 'tell me about your project...',
    multiline: true,
  },
}
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { SystemDialog } from './system-dialog'

const meta = {
  title: 'BlogSection/SystemDialog',
  component: SystemDialog,
  parameters: { layout: 'centered' },
  args: {
    onClose: () => console.log('closed'),
  },
} satisfies Meta<typeof SystemDialog>

export default meta
type Story = StoryObj<typeof meta>

export const ErrorMessage: Story = {
  args: {
    icon: '!',
    message: "can't open trash — the cat already did that!",
    actions: [{ label: 'OK', onClick: () => console.log('ok') }],
  },
}

export const ConfirmationPrompt: Story = {
  args: {
    icon: '?',
    message: 'open the full blog page?',
    actions: [
      { label: 'no', onClick: () => console.log('no'), variant: 'ghost' },
      { label: 'yes', onClick: () => console.log('yes') },
    ],
  },
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Tooltip } from './Tooltip'

const DemoTarget = () => (
  <button
    style={{
      background: 'none',
      border: 'none',
      color: '#aaff00',
      fontSize: '24px',
      cursor: 'pointer',
    }}
  >
    💾
  </button>
)

const meta = {
  title: 'UI/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: { control: 'text' },
    position: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'De que lado o tooltip aparece',
    },
    align: {
      control: 'select',
      options: ['center', 'right'],
      description: 'Alinhamento (right serve pra elementos perto da borda)',
    },
  },
  args: {
    text: 'download my cv here',
    position: 'top',
    align: 'center',
    children: <DemoTarget />,
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Top: Story = {
  args: { position: 'top' },
}

export const Bottom: Story = {
  args: { position: 'bottom' },
}

export const Left: Story = {
  args: { position: 'left' },
}

export const Right: Story = {
  args: { position: 'right' },
}

export const AlignedRight: Story = {
  args: { position: 'bottom', align: 'right' },
}
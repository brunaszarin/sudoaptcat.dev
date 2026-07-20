import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { HomeIcon, UserIcon, MonitorIcon, MailIcon, BlogIcon, TrashIcon } from './nav-icons'

const ICONS = [
  { name: 'HomeIcon', Icon: HomeIcon },
  { name: 'UserIcon', Icon: UserIcon },
  { name: 'MonitorIcon', Icon: MonitorIcon },
  { name: 'MailIcon', Icon: MailIcon },
  { name: 'BlogIcon', Icon: BlogIcon },
  { name: 'TrashIcon', Icon: TrashIcon },
]

function IconGallery() {
  return (
    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
      {ICONS.map(({ name, Icon }) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            color: '#aaff00',
          }}
        >
          <div style={{ width: 28, height: 28 }}>
            <Icon />
          </div>
          <span style={{ fontSize: 11, fontFamily: 'monospace' }}>{name}</span>
        </div>
      ))}
    </div>
  )
}

const meta = {
  title: 'Layout/NavIcons',
  component: IconGallery,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof IconGallery>

export default meta
type Story = StoryObj<typeof meta>

export const Gallery: Story = {}

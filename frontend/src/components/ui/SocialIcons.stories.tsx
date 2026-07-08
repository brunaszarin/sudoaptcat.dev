import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { GithubIcon, LinkedinIcon, InstagramIcon } from './SocialIcons'

const meta = {
  title: 'UI/SocialIcons',
  parameters: { layout: 'centered' },
} satisfies Meta

export default meta
type Story = StoryObj

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24, color: '#aaff00' }}>
      <GithubIcon className="icon" />
      <LinkedinIcon className="icon" />
      <InstagramIcon className="icon" />
      <style>{`.icon { width: 48px; height: 48px; }`}</style>
    </div>
  ),
}
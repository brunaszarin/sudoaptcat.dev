import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { MobileTabBar } from './mobile-tab-bar'

const meta = {
  title: 'Layout/MobileTabBar',
  component: MobileTabBar,
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile1' },
  },
} satisfies Meta<typeof MobileTabBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
  },
}

export const OnBlogPage: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/blog',
      },
    },
  },
}

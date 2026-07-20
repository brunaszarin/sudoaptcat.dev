import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Terminal } from './terminal'
import type { Post } from '@/types'

function makePost(overrides: Partial<Post> = {}): Post {
  return {
    id: 1,
    title: 'Otimizando animações de scroll',
    slug: 'otimizando-animacoes-scroll',
    excerpt: 'como identifiquei e corrigi re-renders desnecessários numa animação de scroll',
    content: '',
    coverImage: null,
    tags: ['performance', 'react'],
    published: true,
    createdAt: '2026-07-14T10:00:00Z',
    ...overrides,
  }
}

const meta = {
  title: 'BlogSection/Terminal',
  component: Terminal,
  parameters: { layout: 'centered' },
  args: {
    posts: [
      makePost({ id: 1, slug: 'otimizando-animacoes-scroll' }),
      makePost({ id: 2, slug: 'deploy-cloud-run', createdAt: '2026-06-28T10:00:00Z' }),
    ],
    selectedIndex: -1,
    powerLevel: 1,
    onOpenPost: (slug: string) => console.log('open:', slug),
  },
} satisfies Meta<typeof Terminal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithSelection: Story = {
  args: { selectedIndex: 0 },
}

export const PoweringOn: Story = {
  args: { powerLevel: 0.4 },
}

export const Empty: Story = {
  args: { posts: [] },
}

import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BlogSection } from './blog-section'
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

// Pré-popula o cache do React Query com posts fake — o hook usePosts lê
// direto daqui, sem precisar de uma API de verdade rodando no Storybook
function withMockPosts(posts: Post[]) {
  return function Decorator(Story: React.ComponentType) {
    const client = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    })
    client.setQueryData(['posts'], posts)
    return (
      <QueryClientProvider client={client}>
        <Story />
      </QueryClientProvider>
    )
  }
}

const meta = {
  title: 'BlogSection/BlogSection',
  component: BlogSection,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof BlogSection>

export default meta
type Story = StoryObj<typeof meta>

export const WithPosts: Story = {
  decorators: [
    withMockPosts([
      makePost({ id: 1, slug: 'otimizando-animacoes-scroll' }),
      makePost({ id: 2, slug: 'deploy-cloud-run', createdAt: '2026-06-28T10:00:00Z' }),
    ]),
  ],
  parameters: {
    nextjs: { appDirectory: true },
  },
}

export const NoPosts: Story = {
  decorators: [withMockPosts([])],
  parameters: {
    nextjs: { appDirectory: true },
  },
}

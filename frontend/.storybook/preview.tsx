import type { Preview } from '@storybook/nextjs-vite'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../src/app/globals.css'

// Provider global do React Query — necessário pra qualquer story que use
// hooks como usePosts/useContact, que dependem de um QueryClient no contexto
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
})

const preview: Preview = {
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#000000' },
        { name: 'light', value: '#ffffff' },
      ],
    },
    a11y: {
      test: 'todo',
    },
  },
}

export default preview
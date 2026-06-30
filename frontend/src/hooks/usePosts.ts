import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { Post } from '@/types'

export function usePosts() {
    return useQuery({
        queryKey: ['posts'],
        queryFn: () => api.get<Post[]>('/api/posts'),
    })
}

export function usePost(slug: string) {
    return useQuery({
        queryKey: ['posts', slug],
        queryFn: () => api.get<Post>(`/api/posts/${slug}`),
        enabled: !!slug,
    })
}
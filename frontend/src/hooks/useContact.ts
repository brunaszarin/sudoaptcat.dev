import { useMutation } from '@tanstack/react-query'
import { api } from '@/lib/api'
import type { ContactForm, ContactResponse } from '@/types'

export function useContact() {
    return useMutation({
        mutationFn: (data: ContactForm) =>
                api.post<ContactResponse>('/api/contact', data),
        })
    }
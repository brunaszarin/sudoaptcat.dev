export interface Post {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage: string | null
  tags: string[]
  published: boolean
  createdAt: string
}

export interface ContactForm {
  name: string
  email: string
  message: string
}

export interface ContactResponse {
  message: string
}
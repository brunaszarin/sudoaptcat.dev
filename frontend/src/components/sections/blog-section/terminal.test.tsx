import { render, screen, fireEvent } from '@testing-library/react'
import { Terminal } from './terminal'
import type { Post } from '@/types'

function makePost(overrides: Partial<Post> = {}): Post {
  return {
    id: 1,
    title: 'Test Post',
    slug: 'test-post',
    excerpt: 'a short summary',
    content: 'full content',
    coverImage: null,
    tags: ['react', 'testing'],
    published: true,
    createdAt: '2026-07-14T10:00:00Z',
    ...overrides,
  }
}

describe('Terminal', () => {
  it('renders the terminal window title', () => {
    render(<Terminal posts={[]} selectedIndex={-1} powerLevel={1} onOpenPost={jest.fn()} />)
    expect(screen.getByText('bruna@sudoaptcat: ~/blog')).toBeInTheDocument()
  })

  it('renders each post with its slug, date, excerpt, and tags', () => {
    const posts = [makePost({ slug: 'my-post', createdAt: '2026-07-14T10:00:00Z' })]
    render(<Terminal posts={posts} selectedIndex={-1} powerLevel={1} onOpenPost={jest.fn()} />)

    expect(screen.getByText('my-post.md')).toBeInTheDocument()
    expect(screen.getByText('2026-07-14')).toBeInTheDocument()
    expect(screen.getByText('# a short summary')).toBeInTheDocument()
    expect(screen.getByText('react')).toBeInTheDocument()
    expect(screen.getByText('testing')).toBeInTheDocument()
  })

  it('shows the "navigate" hint when nothing is selected', () => {
    render(<Terminal posts={[]} selectedIndex={-1} powerLevel={1} onOpenPost={jest.fn()} />)
    expect(screen.getByText('use ↑ ↓ or scroll to navigate')).toBeInTheDocument()
  })

  it('shows the "open" hint when a post is selected', () => {
    const posts = [makePost()]
    render(<Terminal posts={posts} selectedIndex={0} powerLevel={1} onOpenPost={jest.fn()} />)
    expect(screen.getByText('press enter or click to open')).toBeInTheDocument()
  })

  it('marks the selected post with the ">" prefix', () => {
    const posts = [makePost({ slug: 'a' }), makePost({ id: 2, slug: 'b' })]
    render(<Terminal posts={posts} selectedIndex={1} powerLevel={1} onOpenPost={jest.fn()} />)

    const rows = screen.getAllByRole('button')
    expect(rows[0].textContent).toMatch(/^\s/) // não selecionado começa com espaço
    expect(rows[1].textContent).toMatch(/^>/) // selecionado começa com >
  })

  it('calls onOpenPost with the correct slug when a post row is clicked', () => {
    const onOpenPost = jest.fn()
    const posts = [makePost({ slug: 'clicked-post' })]
    render(<Terminal posts={posts} selectedIndex={-1} powerLevel={1} onOpenPost={onOpenPost} />)

    fireEvent.click(screen.getByText('clicked-post.md'))
    expect(onOpenPost).toHaveBeenCalledWith('clicked-post')
  })

  it('applies scale transforms based on powerLevel', () => {
    const { container } = render(
      <Terminal posts={[]} selectedIndex={-1} powerLevel={0.5} onOpenPost={jest.fn()} />
    )
    const outer = container.firstChild as HTMLElement
    expect(outer.style.transform).toContain('scaleY(0.5)')
  })

  it('is invisible (opacity 0) when powerLevel is at or near zero', () => {
    const { container } = render(
      <Terminal posts={[]} selectedIndex={-1} powerLevel={0} onOpenPost={jest.fn()} />
    )
    const outer = container.firstChild as HTMLElement
    expect(outer.style.opacity).toBe('0')
  })

  it('is visible (opacity 1) once powerLevel is above the threshold', () => {
    const { container } = render(
      <Terminal posts={[]} selectedIndex={-1} powerLevel={0.5} onOpenPost={jest.fn()} />
    )
    const outer = container.firstChild as HTMLElement
    expect(outer.style.opacity).toBe('1')
  })
})

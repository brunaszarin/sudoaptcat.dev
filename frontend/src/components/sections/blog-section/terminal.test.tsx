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

const defaultPaginationProps = {
  currentPage: 0,
  totalPages: 1,
  onPrevPage: jest.fn(),
  onNextPage: jest.fn(),
}

describe('Terminal', () => {
  it('renders the terminal window title', () => {
    render(
      <Terminal posts={[]} selectedIndex={-1} powerLevel={1} onOpenPost={jest.fn()} {...defaultPaginationProps} />
    )
    expect(screen.getByText('bruna@sudoaptcat: ~/blog')).toBeInTheDocument()
  })

  it('renders each post with its slug, date, excerpt, and tags', () => {
    const posts = [makePost({ slug: 'my-post', createdAt: '2026-07-14T10:00:00Z' })]
    render(
      <Terminal posts={posts} selectedIndex={-1} powerLevel={1} onOpenPost={jest.fn()} {...defaultPaginationProps} />
    )
    expect(screen.getByText('my-post.md')).toBeInTheDocument()
    expect(screen.getByText('2026-07-14')).toBeInTheDocument()
    expect(screen.getByText('# a short summary')).toBeInTheDocument()
    expect(screen.getByText('react')).toBeInTheDocument()
    expect(screen.getByText('testing')).toBeInTheDocument()
  })

  it('shows the "navigate" hint when nothing is selected and there is only 1 page', () => {
    render(
      <Terminal posts={[]} selectedIndex={-1} powerLevel={1} onOpenPost={jest.fn()} {...defaultPaginationProps} />
    )
    expect(screen.getByText('use ↑ ↓ or scroll to navigate')).toBeInTheDocument()
  })

  it('shows the "change page" hint when there is more than 1 page', () => {
    render(
      <Terminal
        posts={[]}
        selectedIndex={-1}
        powerLevel={1}
        onOpenPost={jest.fn()}
        {...defaultPaginationProps}
        totalPages={2}
      />
    )
    expect(screen.getByText('use ↑ ↓ to select, ← → to change page')).toBeInTheDocument()
  })

  it('shows the "open" hint when a post is selected', () => {
    const posts = [makePost()]
    render(
      <Terminal posts={posts} selectedIndex={0} powerLevel={1} onOpenPost={jest.fn()} {...defaultPaginationProps} />
    )
    expect(screen.getByText('press enter or click to open')).toBeInTheDocument()
  })

  it('marks the selected post with the ">" prefix', () => {
    const posts = [makePost({ slug: 'a' }), makePost({ id: 2, slug: 'b' })]
    render(
      <Terminal posts={posts} selectedIndex={1} powerLevel={1} onOpenPost={jest.fn()} {...defaultPaginationProps} />
    )
    const rows = screen.getAllByRole('button')
    expect(rows[0].textContent).toMatch(/^\s/)
    expect(rows[1].textContent).toMatch(/^>/)
  })

  it('calls onOpenPost with the correct slug when a post row is clicked', () => {
    const onOpenPost = jest.fn()
    const posts = [makePost({ slug: 'clicked-post' })]
    render(
      <Terminal posts={posts} selectedIndex={-1} powerLevel={1} onOpenPost={onOpenPost} {...defaultPaginationProps} />
    )
    fireEvent.click(screen.getByText('clicked-post.md'))
    expect(onOpenPost).toHaveBeenCalledWith('clicked-post')
  })

  it('applies scale transforms based on powerLevel', () => {
    const { container } = render(
      <Terminal posts={[]} selectedIndex={-1} powerLevel={0.5} onOpenPost={jest.fn()} {...defaultPaginationProps} />
    )
    const outer = container.firstChild as HTMLElement
    expect(outer.style.transform).toContain('scaleY(0.5)')
  })

  it('is invisible (opacity 0) when powerLevel is at or near zero', () => {
    const { container } = render(
      <Terminal posts={[]} selectedIndex={-1} powerLevel={0} onOpenPost={jest.fn()} {...defaultPaginationProps} />
    )
    const outer = container.firstChild as HTMLElement
    expect(outer.style.opacity).toBe('0')
  })

  it('is visible (opacity 1) once powerLevel is above the threshold', () => {
    const { container } = render(
      <Terminal posts={[]} selectedIndex={-1} powerLevel={0.5} onOpenPost={jest.fn()} {...defaultPaginationProps} />
    )
    const outer = container.firstChild as HTMLElement
    expect(outer.style.opacity).toBe('1')
  })

  describe('pagination', () => {
    it('does not render pagination controls when totalPages is 1', () => {
      render(
        <Terminal posts={[]} selectedIndex={-1} powerLevel={1} onOpenPost={jest.fn()} {...defaultPaginationProps} />
      )
      expect(screen.queryByLabelText('previous page')).not.toBeInTheDocument()
    })

    it('renders pagination controls and the current page label when totalPages > 1', () => {
      render(
        <Terminal
          posts={[]}
          selectedIndex={-1}
          powerLevel={1}
          onOpenPost={jest.fn()}
          {...defaultPaginationProps}
          currentPage={1}
          totalPages={3}
        />
      )
      expect(screen.getByText('page 2/3')).toBeInTheDocument()
      expect(screen.getByLabelText('previous page')).toBeInTheDocument()
      expect(screen.getByLabelText('next page')).toBeInTheDocument()
    })

    it('disables the previous button on the first page', () => {
      render(
        <Terminal
          posts={[]}
          selectedIndex={-1}
          powerLevel={1}
          onOpenPost={jest.fn()}
          {...defaultPaginationProps}
          currentPage={0}
          totalPages={2}
        />
      )
      expect(screen.getByLabelText('previous page')).toBeDisabled()
      expect(screen.getByLabelText('next page')).not.toBeDisabled()
    })

    it('disables the next button on the last page', () => {
      render(
        <Terminal
          posts={[]}
          selectedIndex={-1}
          powerLevel={1}
          onOpenPost={jest.fn()}
          {...defaultPaginationProps}
          currentPage={1}
          totalPages={2}
        />
      )
      expect(screen.getByLabelText('next page')).toBeDisabled()
      expect(screen.getByLabelText('previous page')).not.toBeDisabled()
    })

    it('calls onPrevPage and onNextPage when the arrows are clicked', () => {
      const onPrevPage = jest.fn()
      const onNextPage = jest.fn()
      render(
        <Terminal
          posts={[]}
          selectedIndex={-1}
          powerLevel={1}
          onOpenPost={jest.fn()}
          currentPage={1}
          totalPages={3}
          onPrevPage={onPrevPage}
          onNextPage={onNextPage}
        />
      )
      fireEvent.click(screen.getByLabelText('previous page'))
      fireEvent.click(screen.getByLabelText('next page'))
      expect(onPrevPage).toHaveBeenCalled()
      expect(onNextPage).toHaveBeenCalled()
    })
  })
})

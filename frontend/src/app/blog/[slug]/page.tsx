'use client'

import { use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { usePost, usePosts } from '@/hooks/usePosts'
import { BlogIcon } from '@/components/layout/navbar/nav-icons'
import styles from './post.module.css'

function formatDate(iso: string) {
  return iso.slice(0, 10)
}

function estimateReadTime(content: string) {
  const words = content.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / 200))
  return `${minutes} min read`
}

export default function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { data: post, isLoading, error } = usePost(slug)
  const { data: allPosts } = usePosts()

  const nextPost = (allPosts ?? [])
    .filter((p) => p.published && p.slug !== slug)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0]

  if (isLoading) {
    return (
      <main className={styles.page}>
        <p className={styles.status}>loading...</p>
      </main>
    )
  }

  if (error || !post) {
    return (
      <main className={styles.page}>
        <p className={styles.status}>couldn&apos;t find this post</p>
        <Link href="/blog" className={styles.backLink}>
          <BackIcon /> back to blog
        </Link>
      </main>
    )
  }

  return (
    <main className={styles.page}>
      <Link href="/blog" className={styles.backLink}>
        <BackIcon /> back to blog
      </Link>

      <div className={styles.cover}>
        {post.coverImage ? (
          <Image src={post.coverImage} alt="" fill sizes="(max-width: 768px) 100vw, 640px" className={styles.coverImage} />
        ) : (
          <BlogIcon className={styles.coverIcon} />
        )}
      </div>

      <p className={styles.meta}>
        {formatDate(post.createdAt)} · {estimateReadTime(post.content)}
      </p>
      <h1 className={styles.title}>{post.title}</h1>

      <div className={styles.tags}>
        {post.tags.map((tag) => (
          <span key={tag} className={styles.tag}>{tag}</span>
        ))}
      </div>

      <div className={styles.body}>
        <ReactMarkdown
          components={{
            blockquote: ({ children }) => <blockquote className={styles.quote}>{children}</blockquote>,
            code: ({ children, className }) => {
              const isBlock = Boolean(className)
              if (isBlock) {
                return <code className={styles.codeBlock}>{children}</code>
              }
              return <code className={styles.inlineCode}>{children}</code>
            },
            pre: ({ children }) => <pre className={styles.pre}>{children}</pre>,
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>

      {nextPost && (
        <div className={styles.nextSection}>
          <p className={styles.nextLabel}>next post</p>
          <Link href={`/blog/${nextPost.slug}`} className={styles.nextCard}>
            <div className={styles.nextInner}>
              <div>
                <p className={styles.nextDate}>{formatDate(nextPost.createdAt)}</p>
                <h4 className={styles.nextTitle}>{nextPost.title}</h4>
              </div>
              <ArrowIcon />
            </div>
          </Link>
        </div>
      )}
    </main>
  )
}

function BackIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 8 8" shapeRendering="crispEdges" fill="currentColor">
      <rect x="0" y="3" width="6" height="1" />
      <rect x="0" y="4" width="6" height="1" />
      <rect x="1" y="2" width="1" height="1" />
      <rect x="0" y="3" width="1" height="1" />
      <rect x="1" y="5" width="1" height="1" />
      <rect x="2" y="1" width="1" height="1" />
      <rect x="2" y="6" width="1" height="1" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 8 8" shapeRendering="crispEdges" fill="currentColor">
      <rect x="0" y="3" width="6" height="1" />
      <rect x="0" y="4" width="6" height="1" />
      <rect x="5" y="2" width="1" height="1" />
      <rect x="6" y="3" width="1" height="1" />
      <rect x="5" y="5" width="1" height="1" />
      <rect x="4" y="1" width="1" height="1" />
      <rect x="4" y="6" width="1" height="1" />
    </svg>
  )
}

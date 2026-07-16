'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePosts } from '@/hooks/usePosts'
import { BlogIcon, UserIcon } from '@/components/layout/navbar/nav-icons'
import styles from './blog.module.css'

const PAGE_SIZE = 6

function formatDate(iso: string) {
  return iso.slice(0, 10)
}

export function BlogPage() {
  const { data: posts, isLoading, error } = usePosts()
  const [visibleCount, setVisibleCount] = useState(1 + PAGE_SIZE)

  const sorted = (posts ?? [])
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const visible = sorted.slice(0, visibleCount)
  const featured = visible[0]
  const secondary = visible[1]
  const rest = visible.slice(2)
  const hasMore = visibleCount < sorted.length

  return (
    <main className={styles.page}>
      <p className={styles.label}>all posts</p>

      {isLoading && <p className={styles.status}>loading...</p>}
      {error && <p className={styles.status}>couldn&apos;t load posts</p>}
      {!isLoading && sorted.length === 0 && (
        <p className={styles.status}>nothing published yet — check back soon</p>
      )}

      {featured && (
        <div className={styles.topRow}>
          <Link href={`/blog/${featured.slug}`} className={styles.featuredCard}>
            <div className={styles.featuredBorder} />
            <div className={styles.featuredInner}>
              <div className={styles.featuredCover}>
                <BlogIcon className={styles.coverIconLg} />
                <div className={styles.featuredOverlay}>
                  <p className={styles.date}>{formatDate(featured.createdAt)}</p>
                  <h2 className={styles.featuredTitle}>{featured.title}</h2>
                </div>
              </div>
            </div>
          </Link>

          {secondary && (
            <Link href={`/blog/${secondary.slug}`} className={styles.secondaryCard}>
              <div className={styles.secondaryBorder} />
              <div className={styles.secondaryInner}>
                <div className={styles.secondaryCover}>
                  <UserIcon className={styles.coverIconSm} />
                </div>
                <div className={styles.secondaryBody}>
                  <p className={styles.dateSm}>{formatDate(secondary.createdAt)}</p>
                  <h3 className={styles.secondaryTitle}>{secondary.title}</h3>
                  <BlogIcon className={styles.footerIcon} />
                </div>
              </div>
            </Link>
          )}
        </div>
      )}

      {rest.length > 0 && (
        <div className={styles.grid}>
          {rest.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`} className={styles.card}>
              <div className={styles.cardBorder} />
              <div className={styles.cardInner}>
                <div className={styles.cardCover} />
                <div className={styles.cardBody}>
                  <p className={styles.dateXs}>{formatDate(post.createdAt)}</p>
                  <h4 className={styles.cardTitle}>{post.title}</h4>
                  <BlogIcon className={styles.footerIcon} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {hasMore && (
        <button
          className={styles.loadMore}
          onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
        >
          load more
        </button>
      )}
    </main>
  )
}

export default BlogPage

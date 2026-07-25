'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePosts } from '@/hooks/usePosts'
import { BlogIcon } from '@/components/layout/navbar/nav-icons'
import { PostSlider } from './post-slider'
import styles from './blog.module.css'

const SLIDER_COUNT = 3
const PAGE_SIZE = 9

function formatDate(iso: string) {
  return iso.slice(0, 10)
}

function BlogPage() {
  const { data: posts, isLoading, error } = usePosts()
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const sorted = (posts ?? [])
    .filter((p) => p.published)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const sliderPosts = sorted.slice(0, SLIDER_COUNT)
  const gridPosts = sorted.slice(SLIDER_COUNT)
  const visibleGrid = gridPosts.slice(0, visibleCount)
  const hasMore = visibleCount < gridPosts.length

  return (
    <main className={styles.page}>
      <p className={styles.label}>latest posts</p>

      {isLoading && <p className={styles.status}>loading...</p>}
      {error && <p className={styles.status}>couldn&apos;t load posts</p>}
      {!isLoading && !error && sorted.length === 0 && (
        <p className={styles.status}>nothing published yet — check back soon</p>
      )}

      {sliderPosts.length > 0 && <PostSlider posts={sliderPosts} />}

      {gridPosts.length > 0 && (
        <>
          <p className={styles.label}>all posts</p>
          <div className={styles.grid}>
            {visibleGrid.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className={styles.card}>
                <div className={styles.cardBorder} />
                <div className={styles.cardInner}>
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className={styles.coverImage}
                    />
                  ) : (
                    <BlogIcon className={styles.coverIconLg} />
                  )}
                  <div className={styles.cardOverlay}>
                    <p className={styles.date}>{formatDate(post.createdAt)}</p>
                    <h3 className={styles.cardTitle}>{post.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </>
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

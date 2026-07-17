'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePosts } from '@/hooks/usePosts'
import type { Post } from '@/types'
import { BlogIcon } from '@/components/layout/navbar/nav-icons'
import styles from './blog.module.css'

const PAGE_SIZE = 6

function formatDate(iso: string) {
  return iso.slice(0, 10)
}

interface CoverProps {
  post: Post
  fallbackClassName: string
  imageSizes: string
}

// Mostra a capa real do post quando ela existir; cai no ícone pixelado
// (fallback) quando o post ainda não tem coverImage definida
function Cover({ post, fallbackClassName, imageSizes }: CoverProps) {
  if (post.coverImage) {
    return (
      <Image
        src={post.coverImage}
        alt=""
        fill
        sizes={imageSizes}
        className={styles.coverImage}
      />
    )
  }
  return <BlogIcon className={fallbackClassName} />
}

function BlogPage() {
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
      {!isLoading && !error && sorted.length === 0 && (
        <p className={styles.status}>nothing published yet — check back soon</p>
      )}

      {featured && (
        <div className={styles.topRow}>
          <Link href={`/blog/${featured.slug}`} className={styles.featuredCard}>
            <div className={styles.featuredInner}>
              <Cover post={featured} fallbackClassName={styles.coverIconLg} imageSizes="(max-width: 768px) 100vw, 60vw" />
              <div className={styles.featuredOverlay}>
                <p className={styles.date}>{formatDate(featured.createdAt)}</p>
                <h2 className={styles.featuredTitle}>{featured.title}</h2>
              </div>
            </div>
          </Link>

          {secondary && (
            <Link href={`/blog/${secondary.slug}`} className={styles.secondaryCard}>
              <div className={styles.secondaryInner}>
                <Cover post={secondary} fallbackClassName={styles.coverIconSm} imageSizes="(max-width: 768px) 100vw, 40vw" />
                <div className={styles.secondaryOverlay}>
                  <p className={styles.dateSm}>{formatDate(secondary.createdAt)}</p>
                  <h3 className={styles.secondaryTitle}>{secondary.title}</h3>
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
              <div className={styles.cardInner}>
                <div className={styles.cardCover}>
                  {post.coverImage && (
                    <Image
                      src={post.coverImage}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 50vw, 30vw"
                      className={styles.coverImage}
                    />
                  )}
                </div>
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

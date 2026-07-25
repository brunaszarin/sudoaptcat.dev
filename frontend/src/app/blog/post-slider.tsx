'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { Post } from '@/types'
import { BlogIcon } from '@/components/layout/navbar/nav-icons'
import styles from './post-slider.module.css'

const AUTO_ADVANCE_MS = 4000

interface PostSliderProps {
  posts: Post[]
}

export function PostSlider({ posts }: PostSliderProps) {
  const [current, setCurrent] = useState(0)

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % posts.length) + posts.length) % posts.length)
    },
    [posts.length]
  )

  // Troca sozinho a cada 4s
  useEffect(() => {
    if (posts.length <= 1) return
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % posts.length)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(id)
  }, [posts.length, current])

  if (posts.length === 0) return null

  const activePost = posts[current]

  return (
    <div className={styles.slider}>
      <div className={styles.sliderInner}>
        <Link href={`/blog/${activePost.slug}`} className={styles.slideLink}>
          {posts.map((post, i) => (
            <div
              key={post.id}
              className={`${styles.slide} ${i === current ? styles.active : ''}`}
            >
              {post.coverImage ? (
                <Image
                  src={post.coverImage}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                  className={styles.slideImage}
                />
              ) : (
                <div className={styles.slideFallback}>
                  <BlogIcon className={styles.slideFallbackIcon} />
                </div>
              )}
            </div>
          ))}

          <div className={styles.slideOverlay}>
            <h2 className={styles.slideTitle}>{activePost.title}</h2>
            <p className={styles.slideExcerpt}>{activePost.excerpt}</p>
          </div>
        </Link>

        {posts.length > 1 && (
          <>
            <button
              className={`${styles.arrow} ${styles.arrowLeft}`}
              onClick={() => goTo(current - 1)}
              aria-label="previous post"
            >
              ‹
            </button>
            <button
              className={`${styles.arrow} ${styles.arrowRight}`}
              onClick={() => goTo(current + 1)}
              aria-label="next post"
            >
              ›
            </button>

            <div className={styles.dots}>
              {posts.map((post, i) => (
                <button
                  key={post.id}
                  className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                  onClick={() => goTo(i)}
                  aria-label={`go to slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

import type { Post } from '@/types'
import styles from './blog-section.module.css'

function formatDate(iso: string) {
  return iso.slice(0, 10)
}

interface TerminalProps {
  posts: Post[]
  selectedIndex: number
  powerLevel: number
  onOpenPost: (slug: string) => void
}

export function Terminal({ posts, selectedIndex, powerLevel, onOpenPost }: TerminalProps) {
  return (
    <div
      className={styles.terminalOuter}
      style={{
        transform: `scaleY(${Math.max(powerLevel, 0.03)}) scaleX(${Math.min(1, powerLevel * 3 + 0.1)})`,
        filter: `brightness(${1 + (1 - powerLevel) * 2})`,
        opacity: powerLevel > 0.02 ? 1 : 0,
      }}
    >
      <div className={styles.terminalBorder} />
      <div className={styles.terminal}>
        <div className={styles.terminalBar}>
          <span className={styles.dot} style={{ background: '#4d7200' }} />
          <span className={styles.dot} style={{ background: '#7bc400' }} />
          <span className={styles.dot} style={{ background: '#aaff00' }} />
          <span className={styles.terminalTitle}>bruna@sudoaptcat: ~/blog</span>
        </div>

        <div className={styles.terminalBody}>
          <p className={styles.prompt}>
            <span className={styles.promptSymbol}>$</span> ls posts/ --recent
          </p>

          {posts.map((post, i) => (
            <button
              key={post.id}
              className={`${styles.postRow} ${i === selectedIndex ? styles.postRowActive : ''}`}
              onClick={() => onOpenPost(post.slug)}
            >
              <div className={styles.postLine}>
                <span>
                  {i === selectedIndex ? '>' : ' '} <span className={styles.postName}>{post.slug}.md</span>
                </span>
                <span className={styles.postDate}>{formatDate(post.createdAt)}</span>
              </div>
              <p className={styles.postExcerpt}># {post.excerpt}</p>
              <div className={styles.tags}>
                {post.tags.map((tag) => (
                  <span key={tag} className={styles.tag}>{tag}</span>
                ))}
              </div>
            </button>
          ))}

          <p className={styles.promptEnd}>
            <span className={styles.promptSymbol}>$</span>{' '}
            <span className={styles.hint}>
              {selectedIndex >= 0
                ? 'press enter or click to open'
                : 'use ↑ ↓ or scroll to navigate'}
            </span>
            <span className={styles.cursor}>_</span>
          </p>
        </div>
      </div>
    </div>
  )
}

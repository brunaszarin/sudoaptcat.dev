import { GithubIcon, LinkedinIcon, InstagramIcon } from '@/components/ui/social-icons'
import styles from './social-links.module.css'

const SOCIALS = [
  { name: 'GitHub', href: 'https://github.com/brunaszarin', Icon: GithubIcon },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/bruszarin/', Icon: LinkedinIcon },
  { name: 'Instagram', href: 'https://www.instagram.com/sudoaptcat/', Icon: InstagramIcon },
]

export function SocialLinks() {
  return (
    <div className={styles.socials}>
      {SOCIALS.map(({ name, href, Icon }) => (
        <a key={name} href={href} target="_blank" rel="noopener noreferrer" className={styles.link} aria-label={name} title={name}>
          <div className={[styles.border, styles.clip].join(' ')} />
          <div className={[styles.fill, styles.clip].join(' ')} />
          <Icon className={styles.icon} />
        </a>
      ))}
    </div>
  )
}

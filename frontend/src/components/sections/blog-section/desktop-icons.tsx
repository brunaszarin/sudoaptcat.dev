import styles from './blog-section.module.css'

const DESKTOP_ICONS = [
  { id: 'trash', label: 'trash', src: '/assets/icons/trash-alt-solid.svg' },
  { id: 'home', label: 'home', src: '/assets/icons/home-solid.svg' },
  { id: 'about', label: 'about', src: '/assets/icons/user-solid.svg' },
  { id: 'projects', label: 'projects', src: '/assets/icons/folder-solid.svg' },
  { id: 'contact', label: 'contact', src: '/assets/icons/envelope-solid.svg' },
]

interface DesktopIconsProps {
  onIconClick: (id: string) => void
}

export function DesktopIcons({ onIconClick }: DesktopIconsProps) {
  return (
    <div className={styles.desktopIcons}>
      {DESKTOP_ICONS.map(({ id, label, src }) => (
        <button key={id} className={styles.desktopIcon} onClick={() => onIconClick(id)}>
          <span
            className={styles.desktopIconSvg}
            style={{
              WebkitMaskImage: `url(${src})`,
              maskImage: `url(${src})`,
            }}
            aria-hidden="true"
          />
          <span className={styles.desktopIconLabel}>{label}</span>
        </button>
      ))}
    </div>
  )
}

import { HomeIcon, UserIcon, MonitorIcon, MailIcon, TrashIcon } from '@/components/layout/navbar/nav-icons'
import styles from './blog-section.module.css'

const DESKTOP_ICONS = [
  { id: 'trash', label: 'trash', Icon: TrashIcon },
  { id: 'home', label: 'home', Icon: HomeIcon },
  { id: 'about', label: 'about', Icon: UserIcon },
  { id: 'projects', label: 'projects', Icon: MonitorIcon },
  { id: 'contact', label: 'contact', Icon: MailIcon },
]

interface DesktopIconsProps {
  onIconClick: (id: string) => void
}

export function DesktopIcons({ onIconClick }: DesktopIconsProps) {
  return (
    <div className={styles.desktopIcons}>
      {DESKTOP_ICONS.map(({ id, label, Icon }) => (
        <button key={id} className={styles.desktopIcon} onClick={() => onIconClick(id)}>
          <Icon className={styles.desktopIconSvg} />
          <span className={styles.desktopIconLabel}>{label}</span>
        </button>
      ))}
    </div>
  )
}

interface IconProps {
  className?: string
}

/* Casa — ícone "home" */
export function HomeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 10 10" className={className} shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      <rect x="4" y="0" width="2" height="1" />
      <rect x="3" y="1" width="4" height="1" />
      <rect x="2" y="2" width="6" height="1" />
      <rect x="1" y="3" width="1" height="6" />
      <rect x="8" y="3" width="1" height="6" />
      <rect x="2" y="8" width="2" height="1" />
      <rect x="6" y="8" width="2" height="1" />
      <rect x="4" y="5" width="2" height="4" />
    </svg>
  )
}

/* Usuário — ícone "about" */
export function UserIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 10 10" className={className} shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      <rect x="3" y="0" width="4" height="1" />
      <rect x="2" y="1" width="1" height="3" />
      <rect x="7" y="1" width="1" height="3" />
      <rect x="3" y="4" width="4" height="1" />
      <rect x="1" y="6" width="8" height="1" />
      <rect x="1" y="7" width="1" height="2" />
      <rect x="8" y="7" width="1" height="2" />
      <rect x="2" y="9" width="6" height="1" />
    </svg>
  )
}

/* Monitor — ícone "projects" */
export function MonitorIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 10 9" className={className} shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      <rect x="1" y="0" width="8" height="1" />
      <rect x="1" y="5" width="8" height="1" />
      <rect x="1" y="0" width="1" height="6" />
      <rect x="8" y="0" width="1" height="6" />
      <rect x="4" y="6" width="2" height="2" />
      <rect x="2" y="8" width="6" height="1" />
    </svg>
  )
}

/* Envelope — ícone "contact" */
export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 10 8" className={className} shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      <rect x="0" y="0" width="10" height="1" />
      <rect x="0" y="6" width="10" height="1" />
      <rect x="0" y="0" width="1" height="7" />
      <rect x="9" y="0" width="1" height="7" />
      <rect x="1" y="1" width="1" height="1" />
      <rect x="2" y="2" width="1" height="1" />
      <rect x="3" y="3" width="1" height="1" />
      <rect x="8" y="1" width="1" height="1" />
      <rect x="7" y="2" width="1" height="1" />
      <rect x="6" y="3" width="1" height="1" />
      <rect x="4" y="4" width="2" height="1" />
    </svg>
  )
}

/* Livro — ícone "blog" */
export function BlogIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 10 9" className={className} shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      <rect x="2" y="0" width="6" height="1" />
      <rect x="1" y="1" width="1" height="7" />
      <rect x="8" y="1" width="1" height="7" />
      <rect x="2" y="8" width="6" height="1" />
      <rect x="3" y="2" width="4" height="1" />
      <rect x="3" y="4" width="4" height="1" />
      <rect x="3" y="6" width="4" height="1" />
    </svg>
  )
}

/* Lixeira — ícone de easter egg */
export function TrashIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 10 10" className={className} shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      <rect x="3" y="0" width="4" height="1" />
      <rect x="1" y="1" width="8" height="1" />
      <rect x="2" y="2" width="1" height="7" />
      <rect x="7" y="2" width="1" height="7" />
      <rect x="2" y="8" width="6" height="1" />
      <rect x="3" y="3" width="1" height="5" />
      <rect x="6" y="3" width="1" height="5" />
    </svg>
  )
}

interface IconProps {
  className?: string
}

/* GitHub — traçado da arte, viewBox 15x15 */
export function GithubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 15 15" className={className} shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      <rect x="5" y="1" width="5" height="1" />
      <rect x="3" y="2" width="9" height="1" />
      <rect x="2" y="3" width="11" height="1" />
      <rect x="2" y="4" width="2" height="1" /><rect x="5" y="4" width="1" height="1" /><rect x="9" y="4" width="1" height="1" /><rect x="11" y="4" width="2" height="1" />
      <rect x="1" y="5" width="2" height="4" /><rect x="12" y="5" width="2" height="4" />
      <rect x="1" y="9" width="3" height="1" /><rect x="11" y="9" width="3" height="1" />
      <rect x="2" y="10" width="1" height="1" /><rect x="4" y="10" width="2" height="1" /><rect x="9" y="10" width="4" height="1" />
      <rect x="2" y="11" width="1" height="1" /><rect x="9" y="11" width="4" height="1" />
      <rect x="3" y="12" width="1" height="1" /><rect x="9" y="12" width="3" height="1" />
      <rect x="4" y="13" width="2" height="1" /><rect x="9" y="13" width="2" height="1" />
    </svg>
  )
}

/* LinkedIn — traçado da arte, viewBox 16x16 */
export function LinkedinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" className={className} shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      {/* ponto do i */}
      <rect x="0" y="0" width="4" height="4" />
      {/* haste do i */}
      <rect x="0" y="5" width="4" height="11" />
      {/* topo do n (arco) — começa na coluna 6, deixando vão após o i */}
      <rect x="6" y="5" width="3" height="1" />
      <rect x="10" y="5" width="4" height="1" />
      <rect x="6" y="6" width="9" height="1" />
      <rect x="6" y="7" width="10" height="2" />
      {/* perna esquerda do n */}
      <rect x="6" y="9" width="3" height="7" />
      {/* perna direita do n */}
      <rect x="12" y="9" width="4" height="7" />
    </svg>
  )
}

/* Instagram — moldura + lente + flash, viewBox 12x12 */
export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 12 12" className={className} shapeRendering="crispEdges" fill="currentColor" aria-hidden="true">
      {/* moldura externa arredondada */}
      <rect x="2" y="0" width="8" height="1" />
      <rect x="1" y="1" width="1" height="1" /><rect x="10" y="1" width="1" height="1" />
      <rect x="0" y="2" width="1" height="8" />
      <rect x="11" y="2" width="1" height="8" />
      <rect x="1" y="10" width="1" height="1" /><rect x="10" y="10" width="1" height="1" />
      <rect x="2" y="11" width="8" height="1" />

      {/* flash (canto superior direito) */}
      <rect x="8" y="2" width="2" height="1" />

      {/* lente (círculo menor, centralizado) */}
      <rect x="5" y="4" width="2" height="1" />
      <rect x="4" y="5" width="1" height="2" /><rect x="7" y="5" width="1" height="2" />
      <rect x="5" y="7" width="2" height="1" />
    </svg>
  )
}
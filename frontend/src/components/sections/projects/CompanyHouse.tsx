interface CompanyHouseProps {
  x: number
  y: number
}

/**
 * Uma casinha de pixel art. Desenhada a partir de um ponto-base (x, y)
 * que representa o canto superior esquerdo do corpo da casa.
 * Todos os retângulos são posicionados relativos a esse ponto.
 */
export function CompanyHouse({ x, y }: CompanyHouseProps) {
  return (
    <g shapeRendering="crispEdges">
      {/* Telhado (3 camadas, do mais largo pro mais estreito) */}
      <rect x={x - 4} y={y} width={48} height={8} fill="#66aa00" />
      <rect x={x + 2} y={y - 8} width={36} height={8} fill="#88cc00" />
      <rect x={x + 8} y={y - 16} width={24} height={8} fill="#aaff00" />

      {/* Corpo da casa */}
      <rect x={x} y={y + 8} width={40} height={36} fill="#4d7200" />
      <rect x={x} y={y + 8} width={40} height={6} fill="#66aa00" />

      {/* Janelas iluminadas */}
      <rect x={x + 8} y={y + 20} width={10} height={10} fill="#aaff00" />
      <rect x={x + 22} y={y + 20} width={10} height={10} fill="#aaff00" />

      {/* Porta */}
      <rect x={x + 14} y={y + 32} width={12} height={12} fill="#2f5d00" />
    </g>
  )
}
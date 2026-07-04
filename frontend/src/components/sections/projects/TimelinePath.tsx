/**
 * O caminho serpenteante (boustrophedon) pixelizado.
 * Desenha 5 linhas horizontais conectadas por 4 descidas verticais,
 * alternando os lados — como a trilha de um jogo de plataforma.
 */

// As 5 alturas (y) de cada linha horizontal
export const ROW_YS = [102, 242, 382, 522, 662]

// O traçado-guia que o gato segue (mesma rota da trilha, como um único path)
export const GUIDE_PATH = [
  `M 60 ${ROW_YS[0] + 8}`,
  `L 564 ${ROW_YS[0] + 8}`,
  `L 564 ${ROW_YS[1] + 8}`,
  `L 158 ${ROW_YS[1] + 8}`,
  `L 158 ${ROW_YS[2] + 8}`,
  `L 564 ${ROW_YS[2] + 8}`,
  `L 564 ${ROW_YS[3] + 8}`,
  `L 158 ${ROW_YS[3] + 8}`,
  `L 158 ${ROW_YS[4] + 8}`,
  `L 620 ${ROW_YS[4] + 8}`,
].join(' ')

const TRACK = 16 // espessura da trilha
const EDGE_LEFT = 150 // x onde as linhas "internas" começam
const EDGE_RIGHT = 572 // x onde as linhas terminam à direita

interface Segment {
  x: number
  y: number
  width: number
  height: number
}

// Gera os segmentos horizontais e verticais do caminho
function buildSegments(): Segment[] {
  const segments: Segment[] = []

  ROW_YS.forEach((y, i) => {
    const isFirst = i === 0
    const isLast = i === ROW_YS.length - 1

    // Linha horizontal — a primeira e a última são um pouco mais largas
    const startX = isFirst ? 60 : EDGE_LEFT
    const endX = isLast ? 620 : EDGE_RIGHT
    segments.push({
      x: startX,
      y,
      width: endX - startX,
      height: TRACK,
    })

    // Descida vertical (exceto na última linha)
    if (!isLast) {
      // Linhas pares descem pela direita, ímpares pela esquerda
      const goesRight = i % 2 === 0
      const vx = goesRight ? EDGE_RIGHT - TRACK : EDGE_LEFT
      segments.push({
        x: vx,
        y,
        width: TRACK,
        height: ROW_YS[i + 1] - y,
      })
    }
  })

  return segments
}

const SEGMENTS = buildSegments()

export function TimelinePath() {
  return (
 <g shapeRendering="crispEdges" aria-hidden="true">
      {SEGMENTS.map((s, i) => (
        <g key={i}>
          {/* Corpo escuro da trilha */}
          <rect x={s.x} y={s.y} width={s.width} height={s.height} fill="#2f5d00" />
          {/* Borda de cima mais clara (efeito de iluminação) */}
          <rect x={s.x} y={s.y} width={s.width} height={5} fill="#3b6d11" />
        </g>
      ))}

      {/* Path-guia invisível que o gato segue */}
      <path id="cat-guide-path" d={GUIDE_PATH} fill="none" stroke="none" />
    </g>
  )
}
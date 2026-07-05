/**
 * O caminho serpenteante (boustrophedon) pixelizado.
 * Desenha 5 linhas horizontais conectadas por 4 descidas verticais,
 * alternando os lados — como a trilha de um jogo de plataforma.
 */

// As 5 alturas (y) de cada linha horizontal
export const ROW_YS = [102, 242, 382, 522, 662]

// O traçado-guia que o gato segue (a área onde ele de fato caminha)
export const GUIDE_PATH = [
  `M -80 ${ROW_YS[0] + 8}`,           // entra pela esquerda
  `L 564 ${ROW_YS[0] + 8}`,           // linha 1 →
  `L 564 ${ROW_YS[1] + 8}`,           // desce
  `L 158 ${ROW_YS[1] + 8}`,           // linha 2 ←
  `L 158 ${ROW_YS[2] + 8}`,           // desce
  `L 564 ${ROW_YS[2] + 8}`,           // linha 3 →
  `L 564 ${ROW_YS[3] + 8}`,           // desce
  `L 158 ${ROW_YS[3] + 8}`,           // linha 4 ←
  `L 158 ${ROW_YS[4] + 8}`,           // desce
  `L 760 ${ROW_YS[4] + 8}`,           // linha 5 → sai pela direita
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

    // Linha horizontal — a primeira e a última "sangram" pras bordas da tela
    const startX = isFirst ? -400 : EDGE_LEFT
    const endX = isLast ? 1080 : EDGE_RIGHT
    segments.push({
      x: startX,
      y,
      width: endX - startX,
      height: TRACK,
    })

    // Descida vertical (exceto na última linha)
    if (!isLast) {
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
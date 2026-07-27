// Fração do scroll total usada pra "ligar"/"desligar" a TV em cada ponta
const POWER_RAMP = 0.28

// Funções puras usadas pela BlogSection, alimentadas pelo progresso
// suavizado que vem do ScrollTrigger scrub (não mais um hook próprio com
// listener de scroll — isso foi removido por estar sem uso em produção).
export function computePowerLevel(progress: number) {
  // Simétrico: 0 nas duas pontas, sobe pra 1 dentro da "zona ligada"
  return Math.min(1, Math.min(progress, 1 - progress) / POWER_RAMP)
}

export function computeSelectedIndex(progress: number, itemCount: number) {
  if (itemCount <= 0) return -1

  const zoneStart = POWER_RAMP
  const zoneEnd = 1 - POWER_RAMP
  const zoneSize = zoneEnd - zoneStart

  if (progress <= zoneStart || progress >= zoneEnd || zoneSize <= 0) {
    return -1
  }

  const local = (progress - zoneStart) / zoneSize
  return Math.min(itemCount - 1, Math.floor(local * itemCount))
}

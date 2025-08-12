export function colorForId(id: string, provided?: string): string {
  if (provided) return provided
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i)
    hash |= 0
  }
  const hue = Math.abs(hash) % 360
  const saturation = 65
  const lightness = 50
  return `hsl(${hue} ${saturation}% ${lightness}%)`
}



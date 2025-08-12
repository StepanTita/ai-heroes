export type Matchup = {
  a: string
  b: string
  runs: number
  winsA: number
  winsB: number
  updatedAt?: string
  model?: string
}

export async function fetchMatchups(): Promise<Matchup[]> {
  const res = await fetch('/data/matchups.json')
  return res.json()
}

export function computeTotalWins(matchups: Matchup[]): Record<string, number> {
  const totals: Record<string, number> = {}
  for (const m of matchups) {
    totals[m.a] = (totals[m.a] ?? 0) + m.winsA
    totals[m.b] = (totals[m.b] ?? 0) + m.winsB
  }
  return totals
}

export function filterByModel(matchups: Matchup[], model: string | 'all'): Matchup[] {
  if (!model || model === 'all') return matchups
  return matchups.filter((m) => m.model === model)
}



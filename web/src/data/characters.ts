export type Character = {
  id: string
  name: string
  universe: string
  imageUrl: string
  color?: string
}

export async function fetchCharacters(): Promise<Character[]> {
  const res = await fetch('/data/characters.json')
  return res.json()
}

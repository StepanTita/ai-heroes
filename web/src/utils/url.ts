export type SelectedPair = { a: string | null; b: string | null }

export function readSelectedFromUrl(loc: Location = window.location): SelectedPair {
  const params = new URLSearchParams(loc.search)
  const a = params.get('a')
  const b = params.get('b')
  return { a, b }
}

export function writeSelectedToUrl(a: string | null, b: string | null, replace: boolean = true) {
  const params = new URLSearchParams(window.location.search)
  if (a) params.set('a', a)
  else params.delete('a')
  if (b) params.set('b', b)
  else params.delete('b')
  const newUrl = `${window.location.pathname}?${params.toString()}`
  if (replace) window.history.replaceState({}, '', newUrl)
  else window.history.pushState({}, '', newUrl)
}



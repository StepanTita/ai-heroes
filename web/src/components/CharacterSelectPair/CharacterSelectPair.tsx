import type { Character } from '../../data/characters'
import styles from './CharacterSelectPair.module.css'

type Props = {
  characters: Character[]
  selectedA: string | null
  selectedB: string | null
  onChange: (a: string | null, b: string | null) => void
}

function CharacterSelectPair({ characters, selectedA, selectedB, onChange }: Props) {
  const onSelectA = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value || null
    if (value === selectedB) {
      onChange(selectedB, selectedA)
    } else {
      onChange(value, selectedB)
    }
  }

  const onSelectB = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value || null
    if (value === selectedA) {
      onChange(selectedB, selectedA)
    } else {
      onChange(selectedA, value)
    }
  }

  const swap = () => {
    onChange(selectedB, selectedA)
  }

  return (
    <section className={styles.root} aria-label="Select two characters">
      <select className={styles.select} value={selectedA ?? ''} onChange={onSelectA}>
        <option value="">Pick A…</option>
        {characters.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
      <button className={styles.swap} type="button" onClick={swap} aria-label="Swap A and B">↔</button>
      <select className={styles.select} value={selectedB ?? ''} onChange={onSelectB}>
        <option value="">Pick B…</option>
        {characters.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>
    </section>
  )
}

export default CharacterSelectPair



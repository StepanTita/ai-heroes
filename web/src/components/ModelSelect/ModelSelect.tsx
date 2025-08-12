import type { Matchup } from '../../data/matchups'
import styles from './ModelSelect.module.css'

type Props = {
  matchups: Matchup[]
  selected: string | 'all'
  onChange: (model: string | 'all') => void
}

function ModelSelect({ matchups, selected, onChange }: Props) {
  const models = Array.from(new Set(matchups.map((m) => m.model).filter(Boolean))) as string[]
  const options = ['all', ...models]
  return (
    <div className={styles.root}>
      <label htmlFor="model" className={styles.label}>Model:</label>
      <select id="model" className={styles.select} value={selected} onChange={(e) => onChange(e.target.value as any)}>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  )
}

export default ModelSelect



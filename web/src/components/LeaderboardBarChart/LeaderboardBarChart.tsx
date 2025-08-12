import type { Character } from '../../data/characters'
import { computeTotalWins } from '../../data/matchups'
import type { Matchup } from '../../data/matchups'
import { colorForId } from '../../utils/colors'
import styles from './LeaderboardBarChart.module.css'
import LetterAvatar from './LetterAvatar'

type Props = {
  characters: Character[]
  matchups: Matchup[]
  onPickA?: (id: string) => void
}

function LeaderboardBarChart({ characters, matchups, onPickA }: Props) {
  const totals = computeTotalWins(matchups)
  const items = characters
    .map((c) => ({
      id: c.id,
      name: c.name,
      imageUrl: c.imageUrl,
      color: colorForId(c.id, c.color),
      wins: totals[c.id] ?? 0,
    }))
    .sort((a, b) => b.wins - a.wins)

  const maxWins = items[0]?.wins ?? 0

  return (
    <section className={styles.root} aria-label="Leaderboard total wins">
      <div className={styles.bars}>
        {items.map((item) => {
          const heightPct = maxWins > 0 ? Math.round((item.wins / maxWins) * 100) : 0
          return (
            <div
              key={item.id}
              className={styles.bar}
              title={`${item.name}: ${item.wins} wins`}
              role="button"
              tabIndex={0}
              onClick={() => onPickA?.(item.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onPickA?.(item.id)
                }
              }}
            >
              <div className={styles.avatar} style={{ background: item.color }}>
                <LetterAvatar letter={item.name} color={item.color} />
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt="" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }} />
                ) : null}
              </div>
              <div className={styles.track}>
                <div className={styles.fill} style={{ height: `${heightPct}%`, backgroundColor: item.color }} />
              </div>
              <div className={styles.value}>{item.wins}</div>
              <div className={styles.label}>{item.name}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default LeaderboardBarChart



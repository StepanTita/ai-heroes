"use client"

import type { Character } from "../../data/characters"
import { computeTotalWins } from "../../data/matchups"
import type { Matchup } from "../../data/matchups"
import { colorForId } from "../../utils/colors"
import styles from "./LeaderboardBarChart.module.css"
import LetterAvatar from "./LetterAvatar"

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
      <div className={styles.header}>
        <h2 className={styles.title}>Battle Leaderboard</h2>
        <p className={styles.subtitle}>Total wins across all matchups</p>
      </div>

      <div className={styles.bars}>
        {items.map((item, index) => {
          const heightPct = maxWins > 0 ? Math.round((item.wins / maxWins) * 100) : 0
          return (
            <div
              key={item.id}
              className={`${styles.bar} ${index < 3 ? styles.topThree : ""}`}
              title={`${item.name}: ${item.wins} wins`}
              role="button"
              tabIndex={0}
              onClick={() => onPickA?.(item.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault()
                  onPickA?.(item.id)
                }
              }}
            >
              {index < 3 && <div className={`${styles.rank} ${styles[`rank${index + 1}`]}`}>{index + 1}</div>}

              <div className={styles.avatar} style={{ background: item.color }}>
                <LetterAvatar letter={item.name} color={item.color} />
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl || "/placeholder.svg"}
                    alt=""
                    onError={(e) => {
                      ;(e.currentTarget as HTMLImageElement).style.display = "none"
                    }}
                  />
                ) : null}
              </div>

              <div className={styles.track}>
                <div className={styles.trackBg} />
                <div
                  className={styles.fill}
                  style={{
                    height: `${heightPct}%`,
                    background: `linear-gradient(180deg, ${item.color} 0%, ${item.color}CC 100%)`,
                  }}
                />
                {index < 3 && (
                  <div
                    className={styles.glow}
                    style={{
                      background: `linear-gradient(180deg, ${item.color}40 0%, transparent 100%)`,
                      height: `${heightPct}%`,
                    }}
                  />
                )}
              </div>

              <div className={styles.value}>
                <span className={styles.winsNumber}>{item.wins}</span>
                <span className={styles.winsLabel}>wins</span>
              </div>

              <div className={styles.label}>{item.name}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default LeaderboardBarChart

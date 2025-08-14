import type { Character } from "../../data/characters"
import type { Matchup } from "../../data/matchups"
import LetterAvatar from "../LeaderboardBarChart/LetterAvatar"
import styles from "./MatchupProbabilityCard.module.css"

type Props = {
  characters: Character[]
  matchups: Matchup[]
  a: string | null
  b: string | null
}

function findMatchup(a: string, b: string, matchups: Matchup[]) {
  const direct = matchups.find((m) => m.a === a && m.b === b)
  if (direct) return { m: direct, flipped: false }
  const reverse = matchups.find((m) => m.a === b && m.b === a)
  if (reverse) return { m: reverse, flipped: true }
  return null
}

function MatchupProbabilityCard({ characters, matchups, a, b }: Props) {
  const charA = characters.find((c) => c.id === a) || null
  const charB = characters.find((c) => c.id === b) || null

  if (!charA || !charB) {
    return <section className={styles.root}>Pick two characters to compare.</section>
  }

  const found = findMatchup(charA.id, charB.id, matchups)
  if (!found) {
    return (
      <section className={styles.root}>
        No matchup data for {charA.name} vs {charB.name}.
      </section>
    )
  }

  const { m, flipped } = found
  const winsForA = flipped ? m.winsB : m.winsA
  const winsForB = flipped ? m.winsA : m.winsB
  const computed = winsForA + winsForB
  const total = m.runs && m.runs > 0 ? m.runs : computed > 0 ? computed : 1
  const pctA = Math.round((winsForA / total) * 100)
  const pctB = 100 - pctA

  return (
    <section className={styles.root} aria-label="Head to head probability">
      <div className={styles.container}>
        <div className={styles.leftAvatar}>
          <LetterAvatar
            letter={charA.name}
            color={charA.color || "hsl(210 70% 50%)"}
            size={40}
            id={`left-${charA.id}`}
          />
          {charA.imageUrl && (
            <img
              src={charA.imageUrl || "/placeholder.svg"}
              alt=""
              className={styles.avatarImage}
              onError={(e) => {
                e.currentTarget.style.opacity = "0"
              }}
            />
          )}
        </div>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFillA}
            style={{
              width: `${pctA}%`,
              backgroundColor: charA.color || "hsl(210 70% 50%)",
            }}
          />
          <div
            className={styles.progressFillB}
            style={{
              width: `${pctB}%`,
              backgroundColor: charB.color || "hsl(10 70% 50%)",
            }}
          />
        </div>

        <div className={styles.rightAvatar}>
          <LetterAvatar
            letter={charB.name}
            color={charB.color || "hsl(10 70% 50%)"}
            size={40}
            id={`right-${charB.id}`}
          />
          {charB.imageUrl && (
            <img
              src={charB.imageUrl || "/placeholder.svg"}
              alt=""
              className={styles.avatarImage}
              onError={(e) => {
                e.currentTarget.style.opacity = "0"
              }}
            />
          )}
        </div>
      </div>

      <div className={styles.legend}>
        <span>
          {charA.name}: {winsForA}/{total} ({pctA}%)
        </span>
        <span>
          {charB.name}: {winsForB}/{total} ({pctB}%)
        </span>
      </div>
    </section>
  )
}

export default MatchupProbabilityCard

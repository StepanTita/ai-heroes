import { useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import LeaderboardBarChart from './components/LeaderboardBarChart/LeaderboardBarChart'
import CharacterSelectPair from './components/CharacterSelectPair/CharacterSelectPair'
import MatchupProbabilityCard from './components/MatchupProbabilityCard/MatchupProbabilityCard'
import ModelSelect from './components/ModelSelect/ModelSelect'
import { fetchCharacters, type Character } from './data/characters'
import { fetchMatchups, type Matchup, filterByModel } from './data/matchups'
import { readSelectedFromUrl, writeSelectedToUrl } from './utils/url'

function App() {
  const [characters, setCharacters] = useState<Character[] | null>(null)
  const [matchups, setMatchups] = useState<Matchup[] | null>(null)
  const [selectedA, setSelectedA] = useState<string | null>(null)
  const [selectedB, setSelectedB] = useState<string | null>(null)
  const [model, setModel] = useState<'all' | string>('all')

  useEffect(() => {
    fetchCharacters().then(setCharacters)
    fetchMatchups().then(setMatchups)
  }, [])

  useEffect(() => {
    const { a, b } = readSelectedFromUrl()
    setSelectedA(a)
    setSelectedB(b)
  }, [])

  useEffect(() => {
    writeSelectedToUrl(selectedA, selectedB, true)
  }, [selectedA, selectedB])

  const ready = Boolean(characters && matchups)
  const scopedMatchups = matchups ? filterByModel(matchups, model) : null

  return (
    <main>
      <Header />
      {!ready ? (
        <section style={{ padding: '0 24px 24px' }}>Loading…</section>
      ) : (
        <>
          <ModelSelect matchups={matchups!} selected={model} onChange={setModel} />
          <LeaderboardBarChart
            characters={characters!}
            matchups={scopedMatchups!}
            onPickA={(id) => setSelectedA(id)}
          />
          <CharacterSelectPair
            characters={characters!}
            selectedA={selectedA}
            selectedB={selectedB}
            onChange={(a, b) => {
              setSelectedA(a)
              setSelectedB(b)
            }}
          />
          <MatchupProbabilityCard
            characters={characters!}
            matchups={scopedMatchups!}
            a={selectedA}
            b={selectedB}
          />
          <section style={{ maxWidth: 900, margin: '24px auto', padding: '0 24px', color: 'var(--muted)' }}>
            <h2 style={{ margin: '8px 0' }}>How it works</h2>
            <p style={{ margin: 0 }}>
              We run multiple LLM models offline for each pair of characters (10 runs per pair). The leaderboard sums
              total wins across all matchups; the head-to-head bar shows the win ratio for a chosen pair.
            </p>
          </section>
        </>
      )}
    </main>
  )
}

export default App

"use client"

import { useMemo } from "react"
import type { Character } from "../../data/characters"
import type { Matchup } from "../../data/matchups"
import { computeTotalWins } from "../../data/matchups"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Badge } from "../../../components/ui/badge"
import { Progress } from "../../../components/ui/progress"

type Props = {
  characters: Character[]
  matchups: Matchup[]
}

type CharacterStats = {
  id: string
  name: string
  universe: string
  totalWins: number
  totalLosses: number
  totalMatches: number
  winRate: number
  strongestAgainst: string[]
  weakestAgainst: string[]
}

function AnalyticsDashboard({ characters, matchups }: Props) {
  const analytics = useMemo(() => {
    const totalWins = computeTotalWins(matchups)
    const characterStats: CharacterStats[] = []

    characters.forEach((char) => {
      const wins = totalWins[char.id] || 0
      const charMatchups = matchups.filter((m) => m.a === char.id || m.b === char.id)

      let losses = 0
      const strongAgainst: { opponent: string; winRate: number }[] = []
      const weakAgainst: { opponent: string; winRate: number }[] = []

      charMatchups.forEach((matchup) => {
        if (matchup.a === char.id) {
          losses += matchup.winsB
          const winRate = matchup.winsA / (matchup.winsA + matchup.winsB)
          const opponent = characters.find((c) => c.id === matchup.b)?.name || matchup.b

          if (winRate > 0.6) {
            strongAgainst.push({ opponent, winRate })
          } else if (winRate < 0.4) {
            weakAgainst.push({ opponent, winRate })
          }
        } else {
          losses += matchup.winsA
          const winRate = matchup.winsB / (matchup.winsA + matchup.winsB)
          const opponent = characters.find((c) => c.id === matchup.a)?.name || matchup.a

          if (winRate > 0.6) {
            strongAgainst.push({ opponent, winRate })
          } else if (winRate < 0.4) {
            weakAgainst.push({ opponent, winRate })
          }
        }
      })

      const totalMatches = wins + losses
      const winRate = totalMatches > 0 ? (wins / totalMatches) * 100 : 0

      characterStats.push({
        id: char.id,
        name: char.name,
        universe: char.universe,
        totalWins: wins,
        totalLosses: losses,
        totalMatches,
        winRate,
        strongestAgainst: strongAgainst
          .sort((a, b) => b.winRate - a.winRate)
          .slice(0, 3)
          .map((s) => s.opponent),
        weakestAgainst: weakAgainst
          .sort((a, b) => a.winRate - b.winRate)
          .slice(0, 3)
          .map((w) => w.opponent),
      })
    })

    return characterStats.sort((a, b) => b.winRate - a.winRate)
  }, [characters, matchups])

  const topPerformers = analytics.slice(0, 5)
  const universeStats = useMemo(() => {
    const universes: Record<string, { wins: number; matches: number }> = {}

    analytics.forEach((char) => {
      if (!universes[char.universe]) {
        universes[char.universe] = { wins: 0, matches: 0 }
      }
      universes[char.universe].wins += char.totalWins
      universes[char.universe].matches += char.totalMatches
    })

    return Object.entries(universes)
      .map(([universe, stats]) => ({
        universe,
        winRate: stats.matches > 0 ? (stats.wins / stats.matches) * 100 : 0,
        totalMatches: stats.matches,
      }))
      .sort((a, b) => b.winRate - a.winRate)
  }, [analytics])

  return (
    <div className="space-y-8">
      {/* Battle Stats Overview */}
      <section className="space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-foreground">Battle Stats Overview</h2>
          <p className="text-muted-foreground">Comprehensive analysis of character performance across all matchups</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Battles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{matchups.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-chart-2/10 to-chart-2/5 border-chart-2/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Heroes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-2">{characters.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-chart-3/10 to-chart-3/5 border-chart-3/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Universes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-3">{universeStats.length}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-chart-4/10 to-chart-4/5 border-chart-4/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Win Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-4">
                {analytics.length > 0
                  ? Math.round(analytics.reduce((sum, char) => sum + char.winRate, 0) / analytics.length)
                  : 0}
                %
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Top Performers */}
      <section className="space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Top Performers</h2>
          <p className="text-muted-foreground">Heroes with the highest win rates across all battles</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topPerformers.map((char, index) => (
            <Card key={char.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{char.name}</CardTitle>
                  <Badge variant={index === 0 ? "default" : "secondary"}>#{index + 1}</Badge>
                </div>
                <CardDescription>{char.universe}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Win Rate</span>
                  <span className="font-semibold text-accent">{Math.round(char.winRate)}%</span>
                </div>
                <Progress value={char.winRate} className="h-2" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-muted-foreground">Wins</div>
                    <div className="font-semibold text-chart-3">{char.totalWins}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Losses</div>
                    <div className="font-semibold text-chart-5">{char.totalLosses}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Universe Performance */}
      <section className="space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Universe Rankings</h2>
          <p className="text-muted-foreground">Performance comparison across different fictional universes</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {universeStats.map((universe, index) => (
            <Card key={universe.universe} className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{universe.universe}</CardTitle>
                  <Badge variant="outline">#{index + 1}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Average Win Rate</span>
                  <span className="font-semibold text-accent">{Math.round(universe.winRate)}%</span>
                </div>
                <Progress value={universe.winRate} className="h-2" />
                <div className="text-sm text-muted-foreground">{universe.totalMatches} total battles</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Character Strengths & Weaknesses */}
      <section className="space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">Character Analysis</h2>
          <p className="text-muted-foreground">Detailed breakdown of each hero's performance and matchup tendencies</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {analytics.slice(0, 8).map((char) => (
            <Card key={char.id} className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{char.name}</CardTitle>
                    <CardDescription>{char.universe}</CardDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-accent">{Math.round(char.winRate)}%</div>
                    <div className="text-xs text-muted-foreground">Win Rate</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-chart-3">{char.totalWins}</div>
                    <div className="text-xs text-muted-foreground">Wins</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-chart-5">{char.totalLosses}</div>
                    <div className="text-xs text-muted-foreground">Losses</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-muted-foreground">{char.totalMatches}</div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                </div>

                {char.strongestAgainst.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-chart-3 mb-2">Strong Against</div>
                    <div className="flex flex-wrap gap-1">
                      {char.strongestAgainst.map((opponent) => (
                        <Badge key={opponent} variant="secondary" className="text-xs bg-chart-3/10 text-chart-3">
                          {opponent}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {char.weakestAgainst.length > 0 && (
                  <div>
                    <div className="text-sm font-medium text-chart-5 mb-2">Struggles Against</div>
                    <div className="flex flex-wrap gap-1">
                      {char.weakestAgainst.map((opponent) => (
                        <Badge key={opponent} variant="secondary" className="text-xs bg-chart-5/10 text-chart-5">
                          {opponent}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

export default AnalyticsDashboard

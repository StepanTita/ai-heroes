"use client"

import { useEffect, useState } from "react"
import Header from "../src/components/Header/Header"
import LeaderboardBarChart from "../src/components/LeaderboardBarChart/LeaderboardBarChart"
import CharacterSelectPair from "../src/components/CharacterSelectPair/CharacterSelectPair"
import MatchupProbabilityCard from "../src/components/MatchupProbabilityCard/MatchupProbabilityCard"
import ModelSelect from "../src/components/ModelSelect/ModelSelect"
import AnalyticsDashboard from "../src/components/AnalyticsDashboard/AnalyticsDashboard"
import { fetchCharacters, type Character } from "../src/data/characters"
import { fetchMatchups, type Matchup, filterByModel } from "../src/data/matchups"
import { readSelectedFromUrl, writeSelectedToUrl } from "../src/utils/url"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Separator } from "../components/ui/separator"
import { Brain, Zap, Shield, Target, Users, TrendingUp } from "lucide-react"

export default function HomePage() {
  const [characters, setCharacters] = useState<Character[] | null>(null)
  const [matchups, setMatchups] = useState<Matchup[] | null>(null)
  const [selectedA, setSelectedA] = useState<string | null>(null)
  const [selectedB, setSelectedB] = useState<string | null>(null)
  const [model, setModel] = useState<"all" | string>("all")

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

  // Calculate some stats for the info sections
  const universeCount = characters ? new Set(characters.map((c) => c.universe)).size : 0
  const totalBattles = matchups ? matchups.reduce((sum, m) => sum + (m.runs || m.winsA + m.winsB), 0) : 0

  return (
    <main className="max-w-screen-xl mx-auto p-4 md:p-8">
      <Header />
      {!ready ? (
        <section className="px-6 pb-6 text-center">
          <div className="animate-pulse">Loading battle data...</div>
        </section>
      ) : (
        <Tabs defaultValue="matchups" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="matchups" className="text-sm md:text-base">
              Battle Matchups
            </TabsTrigger>
            <TabsTrigger value="analytics" className="text-sm md:text-base">
              Analytics Dashboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matchups" className="space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Unleash the Power of Your Heroes
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Delve into detailed analytics and matchup insights powered by advanced AI analysis
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <Badge variant="secondary" className="flex items-center gap-2">
                  <Users className="h-3 w-3" />
                  {characters.length} Heroes
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-2">
                  <Shield className="h-3 w-3" />
                  {universeCount} Universes
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-2">
                  <Target className="h-3 w-3" />
                  {matchups.length} Matchups
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-2">
                  <TrendingUp className="h-3 w-3" />
                  {totalBattles.toLocaleString()} Battles
                </Badge>
              </div>
            </div>

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
            <MatchupProbabilityCard characters={characters!} matchups={scopedMatchups!} a={selectedA} b={selectedB} />

            <section className="space-y-12">
              {/* How It Works Section */}
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-foreground">How Our AI Analysis Works</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Our advanced AI system analyzes character abilities, storylines, and canonical power levels to
                    determine battle outcomes with unprecedented accuracy.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="text-center hover:shadow-lg transition-shadow duration-200">
                    <CardHeader>
                      <Brain className="h-8 w-8 mx-auto text-accent mb-2" />
                      <CardTitle className="text-lg">Multi-Model Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        We run multiple LLM models (10 runs per matchup) to ensure statistical reliability and reduce
                        bias in battle predictions.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center hover:shadow-lg transition-shadow duration-200">
                    <CardHeader>
                      <Zap className="h-8 w-8 mx-auto text-chart-4 mb-2" />
                      <CardTitle className="text-lg">Power Level Assessment</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Characters are evaluated based on canonical abilities, feats, and power scaling from their
                        respective universes.
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="text-center hover:shadow-lg transition-shadow duration-200">
                    <CardHeader>
                      <Target className="h-8 w-8 mx-auto text-chart-3 mb-2" />
                      <CardTitle className="text-lg">Contextual Battles</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Each battle considers character motivations, fighting styles, and environmental factors for
                        realistic outcomes.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Separator />

              {/* Universe Spotlight */}
              <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold text-foreground">Universe Spotlight</h2>
                  <p className="text-muted-foreground">
                    Explore the diverse worlds and power systems that shape our character roster
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from(new Set(characters.map((c) => c.universe)))
                    .slice(0, 6)
                    .map((universe) => {
                      const universeChars = characters.filter((c) => c.universe === universe)
                      const universeMatchups =
                        scopedMatchups?.filter(
                          (m) =>
                            characters.find((c) => c.id === m.a)?.universe === universe ||
                            characters.find((c) => c.id === m.b)?.universe === universe,
                        ) || []

                      return (
                        <Card key={universe} className="hover:shadow-lg transition-shadow duration-200">
                          <CardHeader>
                            <CardTitle className="text-lg">{universe}</CardTitle>
                            <CardDescription>
                              {universeChars.length} character{universeChars.length !== 1 ? "s" : ""}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex flex-wrap gap-1">
                              {universeChars.slice(0, 4).map((char) => (
                                <Badge key={char.id} variant="outline" className="text-xs">
                                  {char.name}
                                </Badge>
                              ))}
                              {universeChars.length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +{universeChars.length - 4} more
                                </Badge>
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {universeMatchups.length} active matchups
                            </div>
                          </CardContent>
                        </Card>
                      )
                    })}
                </div>
              </div>

              <Separator />

              {/* FAQ Section */}
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                  <h2 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h2>
                  <p className="text-muted-foreground">
                    Everything you need to know about our AI-powered battle analysis
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">How accurate are the predictions?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Our multi-model approach with 10 runs per matchup provides statistical reliability. Results
                        reflect canonical power levels and abilities from source material.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">What factors influence battles?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        We consider raw power, fighting experience, special abilities, intelligence, and tactical
                        advantages based on established lore.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">How often is data updated?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        Battle data is continuously updated as we add new characters and refine our AI models for more
                        accurate predictions.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Can I suggest new characters?</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        We're always expanding our roster! Popular characters from various universes are regularly added
                        based on community interest.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <Separator />

              {/* About Section */}
              <div className="max-w-4xl mx-auto text-center space-y-6">
                <h2 className="text-3xl font-bold text-foreground">About AI Heroes</h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    AI Heroes represents the cutting edge of character analysis, combining advanced artificial
                    intelligence with deep knowledge of fictional universes to create the most comprehensive battle
                    prediction system ever built.
                  </p>
                  <p>
                    Our platform serves fans, writers, and creators who want data-driven insights into character
                    matchups, power scaling, and universe comparisons. Whether you're settling debates or exploring
                    creative scenarios, AI Heroes provides the analytical foundation you need.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <Badge className="bg-accent/10 text-accent hover:bg-accent/20">Powered by Advanced AI</Badge>
                    <Badge className="bg-chart-3/10 text-chart-3 hover:bg-chart-3/20">Continuously Updated</Badge>
                    <Badge className="bg-chart-2/10 text-chart-2 hover:bg-chart-2/20">Community Driven</Badge>
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            <AnalyticsDashboard characters={characters!} matchups={scopedMatchups!} />
          </TabsContent>
        </Tabs>
      )}
    </main>
  )
}

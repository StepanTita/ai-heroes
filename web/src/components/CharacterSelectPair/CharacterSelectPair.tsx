"use client"

import type { Character } from "../../data/characters"
import { Button } from "../../../components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { ArrowLeftRight } from "lucide-react"

type Props = {
  characters: Character[]
  selectedA: string | null
  selectedB: string | null
  onChange: (a: string | null, b: string | null) => void
}

function CharacterSelectPair({ characters, selectedA, selectedB, onChange }: Props) {
  const onSelectA = (value: string) => {
    const newValue = value === "none" ? null : value
    if (newValue === selectedB) {
      onChange(selectedB, selectedA)
    } else {
      onChange(newValue, selectedB)
    }
  }

  const onSelectB = (value: string) => {
    const newValue = value === "none" ? null : value
    if (newValue === selectedA) {
      onChange(selectedB, selectedA)
    } else {
      onChange(selectedA, newValue)
    }
  }

  const swap = () => {
    onChange(selectedB, selectedA)
  }

  const selectedCharA = characters.find((c) => c.id === selectedA)
  const selectedCharB = characters.find((c) => c.id === selectedB)

  return (
    <section
      className="flex flex-col sm:flex-row items-center gap-4 p-6 bg-card rounded-lg border max-w-2xl mx-auto"
      aria-label="Select two characters"
    >
      <div className="flex-1 w-full">
        <label className="text-sm font-medium text-muted-foreground mb-2 block">Character A</label>
        <Select value={selectedA || "none"} onValueChange={onSelectA}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pick Character A..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Pick Character A...</SelectItem>
            {characters.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                <div className="flex items-center gap-2">
                  <span>{c.name}</span>
                  <span className="text-xs text-muted-foreground">({c.universe})</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-shrink-0">
        <Button
          variant="outline"
          size="sm"
          onClick={swap}
          aria-label="Swap characters"
          className="h-10 w-10 p-0 rounded-full bg-transparent"
          disabled={!selectedA && !selectedB}
        >
          <ArrowLeftRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 w-full">
        <label className="text-sm font-medium text-muted-foreground mb-2 block">Character B</label>
        <Select value={selectedB || "none"} onValueChange={onSelectB}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Pick Character B..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">Pick Character B...</SelectItem>
            {characters.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                <div className="flex items-center gap-2">
                  <span>{c.name}</span>
                  <span className="text-xs text-muted-foreground">({c.universe})</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </section>
  )
}

export default CharacterSelectPair

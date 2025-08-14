"use client"

import type { Matchup } from "../../data/matchups"
import { getModelDisplayName } from "../../utils/colors"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { Badge } from "../../../components/ui/badge"

type Props = {
  matchups: Matchup[]
  selected: string | "all"
  onChange: (model: string | "all") => void
}

function ModelSelect({ matchups, selected, onChange }: Props) {
  const models = Array.from(new Set(matchups.map((m) => m.model).filter(Boolean))) as string[]
  const options = ["all", ...models]

  // Count matchups per model
  const modelCounts = models.reduce(
    (acc, model) => {
      acc[model] = matchups.filter((m) => m.model === model).length
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-4 bg-muted/30 rounded-lg max-w-md mx-auto">
      <label htmlFor="model" className="text-sm font-medium text-foreground whitespace-nowrap">
        AI Model:
      </label>
      <div className="flex-1 w-full sm:w-auto">
        <Select value={selected} onValueChange={onChange}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue>
              {selected === 'all' ? 'All Models' : getModelDisplayName(selected)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              <div className="flex items-center justify-between w-full">
                <span>All Models</span>
                <Badge variant="secondary" className="ml-2 text-xs">
                  {matchups.length}
                </Badge>
              </div>
            </SelectItem>
            {models.map((model) => (
              <SelectItem key={model} value={model}>
                <div className="flex items-center justify-between w-full">
                  <span>{getModelDisplayName(model)}</span>
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {modelCounts[model]}
                  </Badge>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default ModelSelect

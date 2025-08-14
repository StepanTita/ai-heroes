export function colorForId(id: string, provided?: string): string {
  if (provided) return provided
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i)
    hash |= 0
  }
  const hue = Math.abs(hash) % 360
  const saturation = 65
  const lightness = 50
  return `hsl(${hue} ${saturation}% ${lightness}%)`
}

export function getModelDisplayName(model: string): string {
  const modelMap: Record<string, string> = {
    'gpt-4o': 'GPT-4o',
    'gpt-4o-mini': 'GPT-4o Mini',
    'gpt-5': 'GPT-5',
    'gpt-5-mini': 'GPT-5 Mini',
    'claude-3.5-sonnet': 'Claude 3.5 Sonnet',
    'claude-3.7': 'Claude 3.7',
    'gemini/gemini-2.5-flash': 'Gemini 2.5 Flash',
    'meta_llama/Llama-4-Maverick-17B-128E-Instruct-FP8': 'Llama 4 Maverick',
    'xai/grok-3-mini': 'Grok 3 Mini',
  }
  
  return modelMap[model] || model
}

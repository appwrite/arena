import { OPENROUTER_MODELS_URL } from './config'
import type { ModelConfig } from './types'

interface OpenRouterModel {
  id: string
  pricing: {
    prompt: string
    completion: string
  }
}

interface OpenRouterModelsResponse {
  data: OpenRouterModel[]
}

export async function fetchPricing(
  models: ModelConfig[],
): Promise<Record<string, number>> {
  console.log('Fetching live pricing from OpenRouter...')

  const response = await fetch(OPENROUTER_MODELS_URL)
  if (!response.ok) {
    throw new Error(`Failed to fetch OpenRouter models: ${response.status}`)
  }

  const { data } = (await response.json()) as OpenRouterModelsResponse

  const pricingMap = new Map<string, number>()
  for (const model of data) {
    const perToken = parseFloat(model.pricing?.prompt ?? '0')
    pricingMap.set(model.id, perToken * 1_000_000)
  }

  const result: Record<string, number> = {}
  for (const model of models) {
    const cost = pricingMap.get(model.openRouterId)
    if (cost !== undefined) {
      result[model.id] = Math.round(cost * 100) / 100
      console.log(`  ${model.name}: $${result[model.id]}/1M input tokens`)
    } else {
      console.warn(`  ${model.name}: pricing not found for ${model.openRouterId}, using $0`)
      result[model.id] = 0
    }
  }

  return result
}

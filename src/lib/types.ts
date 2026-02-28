export interface BenchmarkResults {
  version: string
  runDate: string
  mode: 'with-guidelines' | 'without-guidelines'
  models: ModelResult[]
}

export interface ModelResult {
  modelId: string
  modelName: string
  provider: string
  costPerMillionTokens: number
  scores: {
    fundamental: number
    auth: number
    databases: number
    functions: number
    storage: number
    sites: number
    messaging: number
  }
  overall: number
  totalQuestions: number
  totalCorrect: number
  runDate: string
}

export const CATEGORY_LABELS: Record<string, string> = {
  fundamental: 'Fundamental',
  auth: 'Auth',
  databases: 'Databases',
  functions: 'Functions',
  storage: 'Storage',
  sites: 'Sites',
  messaging: 'Messaging',
}

export type CategoryKey = keyof ModelResult['scores']
export type SortField = CategoryKey | 'overall' | 'modelName' | 'costPerMillionTokens'

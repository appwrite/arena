export interface Question {
  id: string
  category: string
  type: 'mcq' | 'free-form'
  question: string
  choices?: string[]
  correctAnswer: string
  rubric?: string
  reference?: string
}

export interface QuestionResult {
  questionId: string
  category: string
  type: 'mcq' | 'free-form'
  modelAnswer: string
  correct: boolean
  score: number
  judgeReasoning?: string
}

export interface ModelConfig {
  id: string
  name: string
  provider: string
  openRouterId: string
  costPerMillionTokens: number
}

export interface ModelBenchmarkRun {
  modelId: string
  modelName: string
  provider: string
  costPerMillionTokens: number
  results: QuestionResult[]
  scores: Record<string, number>
  overall: number
  totalQuestions: number
  totalCorrect: number
  runDate: string
}

export interface BenchmarkResults {
  version: string
  runDate: string
  mode: 'with-guidelines' | 'without-guidelines'
  models: Array<{
    modelId: string
    modelName: string
    provider: string
    costPerMillionTokens: number
    scores: Record<string, number>
    overall: number
    totalQuestions: number
    totalCorrect: number
    runDate: string
  }>
}

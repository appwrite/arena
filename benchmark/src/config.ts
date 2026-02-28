import type { ModelConfig } from './types'

export const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'

export const MODELS: ModelConfig[] = [
  /*
  Too expensive
  {
    id: 'claude-opus-4-6',
    name: 'Claude Opus 4.6',
    provider: 'Anthropic',
    openRouterId: 'anthropic/claude-opus-4-6',
    costPerMillionTokens: 15.0,
  },
   */
  {
    id: 'gemini-3-1-pro-preview',
    name: 'Gemini 3.1 Pro (Preview)',
    provider: 'Google',
    openRouterId: 'google/gemini-3.1-pro-preview',
    costPerMillionTokens: 1.25,
  },
  {
    id: 'codex-gpt-5-3',
    name: 'GPT 5.3 (Codex)',
    provider: 'OpenAI',
    openRouterId: 'openai/codex-gpt-5.3',
    costPerMillionTokens: 2.0,
  },
  {
    id: 'glm-5',
    name: 'GLM 5',
    provider: 'Zhipu',
    openRouterId: 'zhipu/glm-5',
    costPerMillionTokens: 0.5,
  },
]

export const JUDGE_MODEL = 'anthropic/claude-sonnet-4-6'
export const RATE_LIMIT_DELAY_MS = 500
export const TEMPERATURE = 0

import type { ModelResult, CategoryKey } from '#/lib/types'
import ScoreCell from './ScoreCell'

const CATEGORIES: CategoryKey[] = [
  'fundamental',
  'auth',
  'databases',
  'functions',
  'storage',
  'sites',
  'messaging',
]

interface ModelRowProps {
  model: ModelResult
  rank: number
}

export default function ModelRow({ model, rank }: ModelRowProps) {
  return (
    <tr className="border-b border-[var(--line)] transition hover:bg-[var(--link-bg-hover)]">
      <td className="px-3 py-3 text-center text-sm font-semibold text-[var(--text-secondary)]">
        {rank}
      </td>
      <td className="px-3 py-3 text-left">
        <div className="text-sm font-semibold text-[var(--text-primary)]">{model.modelName}</div>
        <div className="text-xs text-[var(--text-secondary)]">{model.provider}</div>
      </td>
      <td className="px-3 py-3 text-right text-sm text-[var(--text-secondary)]">
        ${model.costPerMillionTokens.toFixed(2)}
      </td>
      {CATEGORIES.map((cat) => (
        <ScoreCell key={cat} score={model.scores[cat]} />
      ))}
      <ScoreCell score={model.overall} />
    </tr>
  )
}

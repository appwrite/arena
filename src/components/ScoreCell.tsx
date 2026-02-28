import { getScoreColor } from '#/lib/colors'

interface ScoreCellProps {
  score: number | undefined
}

export default function ScoreCell({ score }: ScoreCellProps) {
  if (score === undefined || score === null) {
    return (
      <td className="px-3 py-3 text-right text-sm text-[var(--text-secondary)]">
        -
      </td>
    )
  }

  return (
    <td className="px-3 py-3 text-right text-sm font-semibold" style={{ color: getScoreColor(score) }}>
      {score % 1 === 0 ? score : score.toFixed(1)}%
    </td>
  )
}

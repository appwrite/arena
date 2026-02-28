import type { ScoringMode } from '#/lib/types'

interface ScoringModeToggleProps {
  active: ScoringMode
  onChange: (mode: ScoringMode) => void
  totalQuestions: number
  totalMcq: number
  totalFreeform: number
}

export default function ScoringModeToggle({ active, onChange, totalQuestions, totalMcq, totalFreeform }: ScoringModeToggleProps) {
  const modes: { value: ScoringMode; label: string; count: number }[] = [
    { value: 'all', label: 'All', count: totalQuestions },
    { value: 'mcq', label: 'Deterministic', count: totalMcq },
    { value: 'freeform', label: 'AI-Judged (Freeform)', count: totalFreeform },
  ]

  return (
    <div className="flex gap-1 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-1">
      {modes.map(({ value, label, count }) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value)}
          className={`rounded-md px-3 py-1 text-xs font-semibold transition ${
            active === value
              ? 'bg-[var(--accent-pink)] text-white'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          {label}
          <span className={`ml-1.5 ${active === value ? 'opacity-70' : 'opacity-50'}`}>
            {count}
          </span>
        </button>
      ))}
    </div>
  )
}

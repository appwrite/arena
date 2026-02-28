interface LeaderboardTabsProps {
  activeTab: 'with-guidelines' | 'without-guidelines'
  onTabChange: (tab: 'with-guidelines' | 'without-guidelines') => void
}

export default function LeaderboardTabs({ activeTab, onTabChange }: LeaderboardTabsProps) {
  return (
    <div className="flex gap-2 justify-center w-full">
      <button
        type="button"
        onClick={() => onTabChange('with-guidelines')}
        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
          activeTab === 'with-guidelines'
            ? 'bg-[var(--accent-pink)] text-white'
            : 'border border-[var(--line)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
        }`}
      >
        With Guidelines
      </button>
      <button
        type="button"
        onClick={() => onTabChange('without-guidelines')}
        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
          activeTab === 'without-guidelines'
            ? 'bg-[var(--accent-pink)] text-white'
            : 'border border-[var(--line)] bg-[var(--surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
        }`}
      >
        Without Guidelines
      </button>
    </div>
  )
}

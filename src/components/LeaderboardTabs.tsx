interface LeaderboardTabsProps {
	activeTab: "with-skills" | "without-skills";
	onTabChange: (tab: "with-skills" | "without-skills") => void;
}

const TABS: {
	value: "with-skills" | "without-skills";
	label: string;
}[] = [
	{ value: "with-skills", label: "With skills.md" },
	{ value: "without-skills", label: "Without skills.md" },
];

export default function LeaderboardTabs({
	activeTab,
	onTabChange,
}: LeaderboardTabsProps) {
	return (
		<div className="flex gap-1 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-1">
			{TABS.map(({ value, label }) => (
				<button
					key={value}
					type="button"
					onClick={() => onTabChange(value)}
					className={`rounded-md px-3 py-1 text-xs font-semibold transition ${
						activeTab === value
							? "bg-[var(--accent-pink)] text-white"
							: "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
					}`}
				>
					{label}
				</button>
			))}
		</div>
	);
}

interface LeaderboardTabsProps {
	activeTab: "with-guidelines" | "without-guidelines";
	onTabChange: (tab: "with-guidelines" | "without-guidelines") => void;
}

const TABS: {
	value: "with-guidelines" | "without-guidelines";
	label: string;
}[] = [
	{ value: "with-guidelines", label: "With Guidelines" },
	{ value: "without-guidelines", label: "Without Guidelines" },
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

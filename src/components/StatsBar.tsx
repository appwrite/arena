interface StatsBarProps {
	modelCount: number;
	questionCount: number;
	categoryCount: number;
}

export default function StatsBar({
	modelCount,
	questionCount,
	categoryCount,
}: StatsBarProps) {
	const stats: { value: number | string; label: string }[] = [
		{ value: modelCount, label: "Models tested" },
		{ value: categoryCount, label: "Appwrite services" },
		{ value: questionCount, label: "Questions asked" },
		{ value: "100%", label: "Open source" },
	];

	return (
		<section className="rise-in border-b border-[var(--line)] px-4 py-10">
			<div className="arena-container flex flex-col items-center gap-6 md:flex-row md:justify-center md:gap-0 md:divide-x md:divide-[var(--line)]">
				{stats.map((stat) => (
					<div
						key={stat.label}
						className="flex flex-col items-center gap-1 md:px-12"
					>
						<span className="font-heading text-3xl font-semibold text-[var(--accent)]">
							{stat.value}
						</span>
						<span className="text-sm text-[var(--text-secondary)]">
							{stat.label}
						</span>
					</div>
				))}
			</div>
		</section>
	);
}

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
		<section className="rise-in px-4 py-10">
			<div className="arena-container grid grid-cols-4 gap-3">
				{stats.map((stat) => (
					<div
						key={stat.label}
						className="arena-card flex flex-col items-center gap-1 rounded-xl px-4 py-5"
					>
						<span className="font-heading text-2xl font-normal tracking-[-2.2%] text-[var(--text-primary)]">
							{stat.value}
						</span>
						<span className="text-xs text-[var(--text-secondary)]">
							{stat.label}
						</span>
					</div>
				))}
			</div>
		</section>
	);
}

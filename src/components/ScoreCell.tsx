interface ScoreCellProps {
	score: number | undefined;
	isOverall?: boolean;
	divider?: boolean;
}

export default function ScoreCell({
	score,
	isOverall,
	divider,
}: ScoreCellProps) {
	const borderClass = divider ? "border-l border-[var(--line-subtle)]" : "";

	if (score === undefined || score === null) {
		return (
			<td
				className={`px-3 text-left text-xs text-[var(--text-secondary)] opacity-50 ${borderClass}`}
			>
				-
			</td>
		);
	}

	const display = score % 1 === 0 ? score : score.toFixed(1);

	const overallColor =
		score >= 70 ? "#85DBD8" : score >= 40 ? "#FE9567" : "#FF453A";

	if (isOverall) {
		return (
			<td
				className={`px-3 text-left text-sm font-semibold ${borderClass}`}
				style={{ color: overallColor }}
			>
				{display}%
			</td>
		);
	}

	const scoreClass =
		score >= 70 ? "score-high" : score >= 40 ? "score-mid" : "score-low";

	return (
		<td className={`px-3 text-left ${borderClass}`}>
			<span
				className={`${scoreClass} inline-block rounded-md px-2 py-0.5 text-xs`}
			>
				{display}%
			</span>
		</td>
	);
}

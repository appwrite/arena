import { getOverallColor, getScoreClass } from "#/lib/colors";

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
				className={`px-3 text-left text-xs whitespace-nowrap text-[var(--text-secondary)] opacity-50 ${borderClass}`}
			>
				-
			</td>
		);
	}

	const display = score % 1 === 0 ? score : score.toFixed(1);

	if (isOverall) {
		return (
			<td
				className={`px-3 text-left text-sm whitespace-nowrap font-semibold ${borderClass}`}
				style={{ color: getOverallColor(score) }}
			>
				{display}%
			</td>
		);
	}

	return (
		<td className={`px-3 text-left whitespace-nowrap ${borderClass}`}>
			<span
				className={`${getScoreClass(score)} inline-block rounded-md px-2 py-0.5 text-xs`}
			>
				{display}%
			</span>
		</td>
	);
}

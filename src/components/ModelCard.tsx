import { Link } from "@tanstack/react-router";
import { Info } from "lucide-react";
import { getOverallColor, getScoreClass } from "#/lib/colors";
import type { CategoryKey, ModelResult, ScoringMode } from "#/lib/types";
import { CATEGORY_LABELS } from "#/lib/types";
import ProviderLogo from "./ProviderLogo";

const CATEGORIES: CategoryKey[] = [
	"foundation",
	"auth",
	"databases",
	"functions",
	"storage",
	"sites",
	"messaging",
	"realtime",
	"cli",
];

interface ModelCardProps {
	model: ModelResult;
	scoringMode: ScoringMode;
}

function formatScore(score: number | undefined) {
	if (score === undefined || score === null) return "-";
	return score % 1 === 0 ? `${score}%` : `${score.toFixed(1)}%`;
}

export default function ModelCard({ model, scoringMode }: ModelCardProps) {
	const scores =
		scoringMode === "mcq"
			? model.mcqScores
			: scoringMode === "freeform"
				? model.freeformScores
				: model.scores;
	const overall =
		scoringMode === "mcq"
			? model.mcqOverall
			: scoringMode === "freeform"
				? model.freeformOverall
				: model.overall;

	const overallColor = getOverallColor(overall);

	return (
		<Link
			to="/model/$modelId"
			params={{ modelId: model.modelId }}
			className="group arena-card flex flex-col p-5"
		>
			<div className="mb-4 flex items-center gap-3">
				<ProviderLogo provider={model.provider} size={20} />
				<span className="text-sm font-semibold text-[var(--text-primary)]">
					{model.modelName}
				</span>
				<span className="group/cost relative ml-auto inline-flex items-center gap-1 text-xs text-[var(--text-secondary)]">
					${model.promptCostPerMillionTokens.toFixed(2)}/1M
					<Info size={12} className="opacity-40 group-hover/cost:opacity-70 transition-opacity" />
					<span className="pointer-events-none absolute bottom-full right-0 z-50 mb-1.5 whitespace-nowrap rounded-md bg-[#1e1e22] px-2.5 py-1.5 text-xs text-[#EDEDF0] opacity-0 shadow-lg ring-1 ring-white/10 transition-opacity group-hover/cost:opacity-100">
						Input: ${model.promptCostPerMillionTokens.toFixed(2)}/1M tokens
						<br />
						Output: ${model.completionCostPerMillionTokens.toFixed(2)}/1M tokens
					</span>
				</span>
			</div>

			<div className="mb-4 flex items-baseline gap-1.5">
				<span
					className="text-2xl font-semibold"
					style={{ color: overallColor }}
				>
					{formatScore(overall)}
				</span>
				<span className="text-xs text-[var(--text-secondary)]">overall</span>
			</div>

			<div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
				{CATEGORIES.map((cat) => {
					const score = scores?.[cat];
					const scoreClass = score !== undefined ? getScoreClass(score) : "";

					return (
						<div key={cat} className="flex items-center justify-between">
							<span className="text-xs text-[var(--text-secondary)]">
								{CATEGORY_LABELS[cat]}
							</span>
							<span
								className={`${scoreClass} rounded-md px-1.5 py-0.5 text-xs`}
							>
								{formatScore(score)}
							</span>
						</div>
					);
				})}
			</div>
		</Link>
	);
}

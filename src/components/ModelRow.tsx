import { Link, useNavigate } from "@tanstack/react-router";
import type { CategoryKey, ModelResult, ScoringMode } from "#/lib/types";
import { withViewTransition } from "#/lib/viewTransition";
import ProviderLogo from "./ProviderLogo";
import ScoreCell from "./ScoreCell";

const CATEGORIES: CategoryKey[] = [
	"fundamental",
	"auth",
	"databases",
	"functions",
	"storage",
	"sites",
	"messaging",
];

interface ModelRowProps {
	model: ModelResult;
	scoringMode: ScoringMode;
}

export default function ModelRow({ model, scoringMode }: ModelRowProps) {
	const navigate = useNavigate();
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

	return (
		<tr
			className="group h-[52px] cursor-pointer border-b border-[var(--line-subtle)] last:border-b-0 transition hover:bg-[var(--link-bg-hover)]"
			onClick={() =>
				withViewTransition(() =>
					navigate({
						to: "/model/$modelId",
						params: { modelId: model.modelId },
					}),
				)
			}
		>
			<td className="w-12 px-0 text-[var(--text-secondary)]">
				<div className="flex h-full items-center justify-center">
					<ProviderLogo provider={model.provider} size={16} />
				</div>
			</td>
			<td className="px-3 text-left text-sm font-semibold text-[var(--text-primary)]">
				<Link
					to="/model/$modelId"
					params={{ modelId: model.modelId }}
					className="hover:underline"
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						withViewTransition(() =>
							navigate({
								to: "/model/$modelId",
								params: { modelId: model.modelId },
							}),
						);
					}}
				>
					{model.modelName}
				</Link>
			</td>
			<td className="px-3 text-left text-sm text-[var(--text-secondary)]">
				${model.costPerMillionTokens.toFixed(2)}
			</td>
			<ScoreCell score={overall} isOverall />
			{CATEGORIES.map((cat, i) => (
				<ScoreCell key={cat} score={scores?.[cat]} divider={i === 0} />
			))}
		</tr>
	);
}

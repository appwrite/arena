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
	"realtime",
	"cli",
];

interface ModelRowProps {
	model: ModelResult;
	scoringMode: ScoringMode;
	disableLink?: boolean;
}

export default function ModelRow({ model, scoringMode, disableLink }: ModelRowProps) {
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
			className={`group h-[52px] border-b border-[var(--line-subtle)] last:border-b-0 transition ${disableLink ? "" : "cursor-pointer hover:bg-[var(--link-bg-hover)]"}`}
			onClick={disableLink ? undefined : () =>
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
				{disableLink ? (
					model.modelName
				) : (
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
				)}
			</td>
			<td className="px-3 text-left text-sm whitespace-nowrap text-[var(--text-secondary)]">
				${model.costPerMillionTokens.toFixed(2)}
			</td>
			<ScoreCell score={overall} isOverall />
			{CATEGORIES.map((cat, i) => (
				<ScoreCell key={cat} score={scores?.[cat]} divider={i === 0} />
			))}
		</tr>
	);
}

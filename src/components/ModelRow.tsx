import { Link, useNavigate } from "@tanstack/react-router";
import type { CategoryKey, ModelResult, ScoringMode } from "#/lib/types";
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
	disableLink?: boolean;
	hideModel?: boolean;
	visibleCategories?: CategoryKey[];
}

export default function ModelRow({
	model,
	scoringMode,
	disableLink,
	hideModel,
	visibleCategories,
}: ModelRowProps) {
	const categories = visibleCategories ?? CATEGORIES;
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
			onClick={
				disableLink
					? undefined
					: () =>
							navigate({
								to: "/model/$modelId",
								params: { modelId: model.modelId },
							})
			}
		>
			{!hideModel && (
				<td className="w-12 px-0 text-[var(--text-secondary)]">
					<div className="flex h-full items-center justify-center">
						<ProviderLogo provider={model.provider} size={16} />
					</div>
				</td>
			)}
			{!hideModel && (
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
								navigate({
									to: "/model/$modelId",
									params: { modelId: model.modelId },
								});
							}}
						>
							{model.modelName}
						</Link>
					)}
				</td>
			)}
			<td
				className={`px-3 text-left text-sm text-[var(--text-secondary)] ${hideModel ? "pl-5" : ""}`}
			>
				${model.costPerMillionTokens.toFixed(2)}
			</td>
			<ScoreCell score={overall} isOverall />
			{categories.map((cat, i) => (
				<ScoreCell key={cat} score={scores?.[cat]} divider={i === 0} />
			))}
		</tr>
	);
}

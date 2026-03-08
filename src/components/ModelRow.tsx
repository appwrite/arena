import { Link, useNavigate } from "@tanstack/react-router";
import { Info } from "lucide-react";
import type { CategoryKey, ModelResult, ScoringMode } from "#/lib/types";
import ProviderLogo from "./ProviderLogo";
import ScoreCell from "./ScoreCell";

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
				<td className="w-11 pl-3 pr-0 text-[var(--text-secondary)]">
					<div className="flex h-full items-center justify-center">
						<ProviderLogo provider={model.provider} size={16} />
					</div>
				</td>
			)}
			{!hideModel && (
				<td
					className="min-w-0 px-2 text-left text-xs font-semibold text-[var(--text-primary)]"
					title={model.modelName}
				>
					{disableLink ? (
						<span className="block truncate">{model.modelName}</span>
					) : (
						<Link
							to="/model/$modelId"
							params={{ modelId: model.modelId }}
							className="block truncate hover:underline"
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
				className={`text-left text-sm text-[var(--text-secondary)] ${hideModel ? "pl-4 pr-2" : "px-2"}`}
			>
				<span className="group/cost relative inline-flex items-center gap-1">
					${model.promptCostPerMillionTokens.toFixed(2)}
					<Info
						size={12}
						className="opacity-40 group-hover/cost:opacity-70 transition-opacity"
					/>
					<span className="pointer-events-none absolute bottom-full left-0 z-50 mb-1.5 whitespace-nowrap rounded-md bg-[#1e1e22] px-2.5 py-1.5 text-xs text-[#EDEDF0] opacity-0 shadow-lg ring-1 ring-white/10 transition-opacity group-hover/cost:opacity-100">
						Input: ${model.promptCostPerMillionTokens.toFixed(2)}/1M tokens
						<br />
						Output: ${model.completionCostPerMillionTokens.toFixed(2)}/1M tokens
					</span>
				</span>
			</td>
			<ScoreCell score={overall} isOverall />
			{categories.map((cat, i) => (
				<ScoreCell key={cat} score={scores?.[cat]} divider={i === 0} />
			))}
		</tr>
	);
}

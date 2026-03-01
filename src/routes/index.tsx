import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useMemo, useState } from "react";
import FilterChip from "#/components/FilterChip";
import LeaderboardTable from "#/components/LeaderboardTable";
import ModelCard from "#/components/ModelCard";
import ScoringInfo from "#/components/ScoringInfo";
import ViewToggle from "#/components/ViewToggle";
import withSkillsData from "#/data/results-with-skills.json";
import withoutSkillsData from "#/data/results-without-skills.json";
import type {
	BenchmarkResults,
	CategoryKey,
	ModelResult,
	ScoringMode,
	SortField,
} from "#/lib/types";

const withSkills = withSkillsData as BenchmarkResults;
const withoutSkills = withoutSkillsData as BenchmarkResults;

const SORT_OPTIONS: { field: SortField; label: string }[] = [
	{ field: "overall", label: "Overall" },
	{ field: "costPerMillionTokens", label: "Cost" },
	{ field: "modelName", label: "Model" },
];

function useSortedModels(
	models: ModelResult[],
	scoringMode: ScoringMode,
	sortField: SortField,
	sortDirection: "asc" | "desc",
) {
	return useMemo(() => {
		const sorted = [...models];
		sorted.sort((a, b) => {
			let aVal: number | string;
			let bVal: number | string;

			const aScores =
				scoringMode === "mcq"
					? a.mcqScores
					: scoringMode === "freeform"
						? a.freeformScores
						: a.scores;
			const bScores =
				scoringMode === "mcq"
					? b.mcqScores
					: scoringMode === "freeform"
						? b.freeformScores
						: b.scores;
			const aOverall =
				scoringMode === "mcq"
					? a.mcqOverall
					: scoringMode === "freeform"
						? a.freeformOverall
						: a.overall;
			const bOverall =
				scoringMode === "mcq"
					? b.mcqOverall
					: scoringMode === "freeform"
						? b.freeformOverall
						: b.overall;

			if (sortField === "modelName") {
				aVal = a.modelName.toLowerCase();
				bVal = b.modelName.toLowerCase();
			} else if (sortField === "costPerMillionTokens") {
				aVal = a.costPerMillionTokens;
				bVal = b.costPerMillionTokens;
			} else if (sortField === "overall") {
				aVal = aOverall;
				bVal = bOverall;
			} else {
				aVal = aScores?.[sortField as CategoryKey] ?? 0;
				bVal = bScores?.[sortField as CategoryKey] ?? 0;
			}

			if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
			if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
			return 0;
		});
		return sorted;
	}, [models, sortField, sortDirection, scoringMode]);
}

export const Route = createFileRoute("/")({ component: App });

function App() {
	const [activeTab, setActiveTab] = useState<"with-skills" | "without-skills">(
		"with-skills",
	);
	const [scoringMode, setScoringMode] = useState<ScoringMode>("all");
	const [sortField, setSortField] = useState<SortField>("overall");
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
	const [viewMode, setViewMode] = useState<"list" | "grid">("list");
	const activeData = activeTab === "with-skills" ? withSkills : withoutSkills;

	const sortedModels = useSortedModels(
		activeData.models,
		scoringMode,
		sortField,
		sortDirection,
	);

	const currentSortLabel =
		SORT_OPTIONS.find((o) => o.field === sortField)?.label ?? "Overall";

	function handleSortClick() {
		const currentIndex = SORT_OPTIONS.findIndex((o) => o.field === sortField);
		const nextIndex = (currentIndex + 1) % SORT_OPTIONS.length;
		setSortField(SORT_OPTIONS[nextIndex].field);
	}

	function handleDirectionClick() {
		setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
	}

	return (
		<main className="flex-1 arena-container px-2 pb-0 pt-8 md:px-4 md:pt-14">
			<section className="rise-in mb-6 md:mb-10">
				<h1 className="mb-4 font-heading text-3xl font-medium tracking-tight text-[var(--text-primary)] md:text-4xl">
					Appwrite Arena
				</h1>
				<p className="max-w-[400px] text-base text-[var(--text-secondary)] md:text-lg">
					Benchmark AI models on their understanding of Appwrite services
				</p>
			</section>

			<section className="rise-in" style={{ animationDelay: "100ms" }}>
				<div className="mb-4 flex flex-wrap items-center gap-2">
					<FilterChip
						label="Dataset"
						value={activeTab}
						options={[
							{ value: "with-skills", label: "With skills.md" },
							{ value: "without-skills", label: "Without skills.md" },
						]}
						onChange={(v) =>
							setActiveTab(v as "with-skills" | "without-skills")
						}
					/>
					<FilterChip
						label="Scoring"
						value={scoringMode}
						options={[
							{ value: "all", label: "All" },
							{ value: "mcq", label: "Deterministic" },
							{ value: "freeform", label: "AI-Judged" },
						]}
						onChange={(v) => setScoringMode(v as ScoringMode)}
					/>
					<span className="ml-auto inline-flex items-center gap-2">
						<span className="inline-flex items-center gap-1 text-xs text-[var(--text-secondary)]">
							Sorted by
							<button
								type="button"
								onClick={handleSortClick}
								className="cursor-pointer border-none bg-transparent font-medium text-[var(--text-primary)] transition hover:opacity-70"
							>
								{currentSortLabel}
							</button>
							<button
								type="button"
								onClick={handleDirectionClick}
								className="cursor-pointer border-none bg-transparent text-[var(--text-primary)] transition hover:opacity-70"
							>
								{sortDirection === "desc" ? (
									<ArrowDown size={12} />
								) : (
									<ArrowUp size={12} />
								)}
							</button>
						</span>
						<ViewToggle view={viewMode} onChange={setViewMode} />
					</span>
				</div>

				{viewMode === "list" ? (
					<LeaderboardTable models={sortedModels} scoringMode={scoringMode} />
				) : (
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{sortedModels.map((model) => (
							<ModelCard
								key={model.modelId}
								model={model}
								scoringMode={scoringMode}
							/>
						))}
					</div>
				)}

				<ScoringInfo runDate={activeData.runDate} />
			</section>
		</main>
	);
}

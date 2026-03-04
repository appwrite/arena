import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useCallback, useMemo } from "react";
import CategoriesGrid from "#/components/CategoriesGrid";
import FilterChip from "#/components/FilterChip";
import HeroSection from "#/components/HeroSection";
import HowItWorks from "#/components/HowItWorks";
import LeaderboardTable from "#/components/LeaderboardTable";
import ModelCard from "#/components/ModelCard";
import OpenSourceCTA from "#/components/OpenSourceCTA";
import ScoringApproach from "#/components/ScoringApproach";
import ScoringInfo from "#/components/ScoringInfo";
import TwoModes from "#/components/TwoModes";
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
import { CATEGORY_LABELS } from "#/lib/types";

const withSkills = withSkillsData as BenchmarkResults;
const withoutSkills = withoutSkillsData as BenchmarkResults;

const SORT_OPTIONS: { field: SortField; label: string }[] = [
	{ field: "overall", label: "Overall" },
	{ field: "costPerMillionTokens", label: "Cost" },
	{ field: "modelName", label: "Model" },
];

const VALID_SORT_FIELDS = new Set(SORT_OPTIONS.map((o) => o.field));

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

interface SearchParams {
	dataset?: "with-skills" | "without-skills";
	scoring?: ScoringMode;
	sort?: SortField;
	dir?: "asc" | "desc";
	view?: "list" | "grid";
}

export const Route = createFileRoute("/")({
	validateSearch: (search: Record<string, unknown>): SearchParams => {
		const result: SearchParams = {};
		if (search.dataset === "without-skills") {
			result.dataset = "without-skills";
		}
		if (search.scoring === "mcq" || search.scoring === "freeform") {
			result.scoring = search.scoring as ScoringMode;
		}
		if (
			typeof search.sort === "string" &&
			VALID_SORT_FIELDS.has(search.sort as SortField) &&
			search.sort !== "overall"
		) {
			result.sort = search.sort as SortField;
		}
		if (search.dir === "asc") {
			result.dir = "asc";
		}
		if (search.view === "grid") {
			result.view = "grid";
		}
		return result;
	},
	component: App,
});

function App() {
	const search = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });

	const dataset = search.dataset ?? "with-skills";
	const scoringMode = search.scoring ?? "all";
	const sortField = search.sort ?? "overall";
	const sortDirection = search.dir ?? "desc";
	const viewMode = search.view ?? "list";

	const activeData = dataset === "with-skills" ? withSkills : withoutSkills;

	const sortedModels = useSortedModels(
		activeData.models,
		scoringMode,
		sortField,
		sortDirection,
	);

	const setFilter = useCallback(
		(updates: {
			dataset?: "with-skills" | "without-skills";
			scoring?: ScoringMode;
			sort?: SortField;
			dir?: "asc" | "desc";
			view?: "list" | "grid";
		}) => {
			navigate({
				search: (prev: SearchParams) => {
					const d = updates.dataset ?? prev.dataset ?? "with-skills";
					const s = updates.scoring ?? prev.scoring ?? "all";
					const sf = updates.sort ?? prev.sort ?? "overall";
					const sd = updates.dir ?? prev.dir ?? "desc";
					const v = updates.view ?? prev.view ?? "list";

					const result: SearchParams = {};
					if (d !== "with-skills") result.dataset = d;
					if (s !== "all") result.scoring = s;
					if (sf !== "overall") result.sort = sf;
					if (sd !== "desc") result.dir = sd;
					if (v !== "list") result.view = v;
					return result;
				},
				replace: true,
			});
		},
		[navigate],
	);

	const currentSortLabel =
		SORT_OPTIONS.find((o) => o.field === sortField)?.label ?? "Overall";

	function handleSortClick() {
		const currentIndex = SORT_OPTIONS.findIndex((o) => o.field === sortField);
		const nextIndex = (currentIndex + 1) % SORT_OPTIONS.length;
		setFilter({ sort: SORT_OPTIONS[nextIndex].field });
	}

	function handleDirectionClick() {
		setFilter({ dir: sortDirection === "desc" ? "asc" : "desc" });
	}

	return (
		<main className="flex flex-1 flex-col">
			<HeroSection>
				<div className="mb-4 flex flex-wrap items-center gap-2">
					<FilterChip
						label="Dataset"
						value={dataset}
						options={[
							{ value: "with-skills", label: "With skills" },
							{ value: "without-skills", label: "Without skills" },
						]}
						onChange={(v) =>
							setFilter({ dataset: v as "with-skills" | "without-skills" })
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
						onChange={(v) => setFilter({ scoring: v as ScoringMode })}
					/>
					<span className="ml-auto inline-flex items-center gap-2">
						<span className="inline-flex items-center gap-1 text-xs text-[var(--text-secondary)]">
							Sorted by
							<button
								type="button"
								onClick={handleSortClick}
								className="cursor-pointer border-none bg-transparent font-medium text-[var(--text-primary)] transition hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--line)]"
							>
								{currentSortLabel}
							</button>
							<button
								type="button"
								onClick={handleDirectionClick}
								className="cursor-pointer border-none bg-transparent text-[var(--text-primary)] transition hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--line)]"
							>
								{sortDirection === "desc" ? (
									<ArrowDown size={12} />
								) : (
									<ArrowUp size={12} />
								)}
							</button>
						</span>
						<ViewToggle
							view={viewMode}
							onChange={(v) => setFilter({ view: v })}
						/>
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
			</HeroSection>

			<HowItWorks
				modelCount={withSkills.models.length}
				questionCount={withSkills.totalQuestions}
				categoryCount={Object.keys(CATEGORY_LABELS).length}
			/>

			<TwoModes />

			<CategoriesGrid />

			<ScoringApproach
				mcqCount={withSkills.totalMcq}
				freeformCount={withSkills.totalFreeform}
			/>

			<OpenSourceCTA />
		</main>
	);
}

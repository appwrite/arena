import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, ChevronDown } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import CategoriesGrid from "#/components/CategoriesGrid";
import ChartsSection from "#/components/charts/ChartsSection";
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
import { SITE_URL } from "#/lib/site";
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

/** Model IDs to hide from the homepage. */
const HIDDEN_MODEL_IDS: string[] = [];

const VALID_SORT_FIELDS = new Set<SortField>([
	"overall",
	"costPerMillionTokens",
	"modelName",
	"foundation",
	"auth",
	"databases",
	"functions",
	"storage",
	"sites",
	"messaging",
	"realtime",
	"cli",
]);

/** Sort options shown in the grid-view popover (Overall, Cost, Model first; then categories). */
const GRID_SORT_OPTIONS: { field: SortField; label: string }[] = [
	{ field: "overall", label: "Overall" },
	{ field: "costPerMillionTokens", label: "Cost" },
	{ field: "modelName", label: "Model" },
	...(
		[
			"foundation",
			"auth",
			"databases",
			"functions",
			"storage",
			"sites",
			"messaging",
			"realtime",
			"cli",
		] as const
	).map((cat) => ({ field: cat as SortField, label: CATEGORY_LABELS[cat] })),
];

function SortByPopover({
	sortField,
	sortDirection,
	onSort,
}: {
	sortField: SortField;
	sortDirection: "asc" | "desc";
	onSort: (field: SortField, dir: "asc" | "desc") => void;
}) {
	const [open, setOpen] = useState(false);
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!open) return;
		function handleClick(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, [open]);

	const currentLabel =
		GRID_SORT_OPTIONS.find((o) => o.field === sortField)?.label ?? "Overall";

	return (
		<div ref={ref} className="relative inline-flex items-center gap-1">
			<button
				type="button"
				onClick={() => setOpen((o) => !o)}
				className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1 text-xs transition hover:border-[var(--line)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--line)]"
			>
				<span className="text-[var(--text-secondary)]">Sort by</span>
				<span className="font-medium text-[var(--text-primary)]">
					{currentLabel}
				</span>
				<ChevronDown
					size={12}
					className={`text-[var(--text-secondary)] transition-transform ${open ? "rotate-180" : ""}`}
				/>
			</button>
			<button
				type="button"
				onClick={() =>
					onSort(sortField, sortDirection === "desc" ? "asc" : "desc")
				}
				className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] p-1 text-[var(--text-primary)] transition hover:border-[var(--line)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--line)]"
				title={sortDirection === "desc" ? "Descending" : "Ascending"}
			>
				{sortDirection === "desc" ? (
					<ArrowDown size={12} aria-hidden />
				) : (
					<ArrowUp size={12} aria-hidden />
				)}
			</button>
			{open && (
				<div className="absolute left-0 top-full z-50 mt-1 min-w-[120px] overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--bg-base)] py-1 shadow-lg">
					{GRID_SORT_OPTIONS.map((option) => (
						<button
							key={option.field}
							type="button"
							onClick={() => {
								onSort(
									option.field,
									option.field === "modelName" ? "asc" : "desc",
								);
								setOpen(false);
							}}
							className={`block w-full cursor-pointer border-none bg-transparent px-3 py-1.5 text-left text-xs transition hover:bg-[var(--link-bg-hover)] ${
								sortField === option.field
									? "font-medium text-[var(--text-primary)]"
									: "text-[var(--text-secondary)]"
							}`}
						>
							{option.label}
						</button>
					))}
				</div>
			)}
		</div>
	);
}

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
	head: () => ({
		links: [{ rel: "canonical", href: SITE_URL }],
	}),
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

	const visibleModels = useMemo(
		() =>
			HIDDEN_MODEL_IDS.length > 0
				? activeData.models.filter(
						(m) => !HIDDEN_MODEL_IDS.includes(m.modelId),
					)
				: activeData.models,
		[activeData.models],
	);

	const sortedModels = useSortedModels(
		visibleModels,
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

	const handleSort = useCallback(
		(field: SortField, dir: "asc" | "desc") => {
			setFilter({ sort: field, dir });
		},
		[setFilter],
	);

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
						{viewMode === "grid" && (
							<SortByPopover
								sortField={sortField}
								sortDirection={sortDirection}
								onSort={handleSort}
							/>
						)}
						<ViewToggle
							view={viewMode}
							onChange={(v) => setFilter({ view: v })}
						/>
					</span>
				</div>

				{viewMode === "list" ? (
					<LeaderboardTable
						models={sortedModels}
						scoringMode={scoringMode}
						sortField={sortField}
						sortDirection={sortDirection}
						onSort={handleSort}
					/>
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

			<ChartsSection
				models={visibleModels}
				withSkillsModels={withSkills.models.filter(
					(m) => !HIDDEN_MODEL_IDS.includes(m.modelId),
				)}
				withoutSkillsModels={withoutSkills.models.filter(
					(m) => !HIDDEN_MODEL_IDS.includes(m.modelId),
				)}
			/>

			<HowItWorks
				modelCount={visibleModels.length}
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

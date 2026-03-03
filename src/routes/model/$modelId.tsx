import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useCallback, useEffect, useMemo } from "react";
import FilterChip from "#/components/FilterChip";
import LeaderboardTable from "#/components/LeaderboardTable";
import ProviderLogo from "#/components/ProviderLogo";
import QuestionSection from "#/components/QuestionSection";
import withSkillsData from "#/data/results-with-skills.json";
import withoutSkillsData from "#/data/results-without-skills.json";
import { SITE_URL } from "#/lib/site";
import type { BenchmarkResults, ModelResult, ScoringMode } from "#/lib/types";
import { CATEGORY_LABELS } from "#/lib/types";
import { withViewTransition } from "#/lib/viewTransition";

const withSkills = withSkillsData as BenchmarkResults;
const withoutSkills = withoutSkillsData as BenchmarkResults;

const CATEGORY_ORDER = Object.keys(CATEGORY_LABELS);

function findModel(
	modelId: string,
	tab: "with-skills" | "without-skills",
): ModelResult | undefined {
	const data = tab === "with-skills" ? withSkills : withoutSkills;
	return data.models.find((m) => m.modelId === modelId);
}

interface SearchParams {
	dataset?: "with-skills" | "without-skills";
	scoring?: ScoringMode;
	categories?: string;
}

export const Route = createFileRoute("/model/$modelId")({
	validateSearch: (search: Record<string, unknown>): SearchParams => {
		const result: SearchParams = {};
		if (search.dataset === "without-skills") {
			result.dataset = "without-skills";
		}
		if (search.scoring === "mcq" || search.scoring === "freeform") {
			result.scoring = search.scoring as ScoringMode;
		}
		if (typeof search.categories === "string") {
			result.categories = search.categories;
		}
		return result;
	},
	head: ({ params }) => {
		const model = findModel(params.modelId, "with-skills");
		const name = model?.modelName ?? params.modelId;
		const title = `${name} - Appwrite Arena`;
		const description = `Detailed benchmark results for ${name} on Appwrite Arena.`;
		return {
			meta: [
				{ title },
				{ name: "description", content: description },
				{ property: "og:title", content: title },
				{ property: "og:description", content: description },
				{ property: "og:url", content: `${SITE_URL}/model/${params.modelId}` },
			],
		};
	},
	component: ModelDetailPage,
});

function parseCategories(raw: string | undefined): string[] {
	if (raw === undefined) return CATEGORY_ORDER;
	if (raw === "") return [];
	return raw.split(",").filter((c) => CATEGORY_ORDER.includes(c));
}

function ModelDetailPage() {
	const { modelId } = Route.useParams();
	const search = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });

	const dataset = search.dataset ?? "with-skills";
	const scoring = search.scoring ?? "all";
	const categories = useMemo(
		() => parseCategories(search.categories),
		[search.categories],
	);

	const setFilter = useCallback(
		(updates: {
			dataset?: "with-skills" | "without-skills";
			scoring?: ScoringMode;
			categories?: string[];
		}) => {
			withViewTransition(() =>
				navigate({
					search: (prev: SearchParams) => {
						const curDataset = prev.dataset ?? "with-skills";
						const curScoring = prev.scoring ?? "all";
						const curCategories = parseCategories(prev.categories);

						const newDataset = updates.dataset ?? curDataset;
						const newScoring = updates.scoring ?? curScoring;
						const newCategories = updates.categories ?? curCategories;

						const isAllCats =
							newCategories.length === CATEGORY_ORDER.length &&
							CATEGORY_ORDER.every((c) => newCategories.includes(c));

						const result: SearchParams = {};
						if (newDataset !== "with-skills")
							result.dataset = newDataset as "without-skills";
						if (newScoring !== "all")
							result.scoring = newScoring as ScoringMode;
						if (!isAllCats) result.categories = newCategories.join(",");
						return result;
					},
					replace: true,
				}),
			);
		},
		[navigate],
	);

	const model = findModel(modelId, dataset);

	const filteredQuestions = useMemo(() => {
		if (!model?.questionDetails) return [];
		let questions = model.questionDetails;
		if (scoring === "mcq")
			questions = questions.filter((q) => q.type === "mcq");
		else if (scoring === "freeform")
			questions = questions.filter((q) => q.type === "free-form");
		if (categories.length < CATEGORY_ORDER.length)
			questions = questions.filter((q) => categories.includes(q.category));
		return questions;
	}, [model?.questionDetails, scoring, categories]);

	const groupedByCategory = useMemo(() => {
		const groups: Record<string, typeof filteredQuestions> = {};
		for (const cat of CATEGORY_ORDER) {
			const catQuestions = filteredQuestions.filter((q) => q.category === cat);
			if (catQuestions.length > 0) {
				groups[cat] = catQuestions;
			}
		}
		return groups;
	}, [filteredQuestions]);

	useEffect(() => {
		const hash = window.location.hash.slice(1);
		if (hash) {
			const el = document.getElementById(hash);
			el?.scrollIntoView({ behavior: "smooth" });
		}
	}, []);

	if (!model) {
		return (
			<main className="flex-1 arena-container px-2 pb-0 pt-8 md:px-4 md:pt-14">
				<div className="rise-in">
					<Link
						to="/"
						className="mb-6 inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
						onClick={(e) => {
							e.preventDefault();
							withViewTransition(() => navigate({ to: "/" }));
						}}
					>
						<ArrowLeft size={14} />
						Back to leaderboard
					</Link>
					<div className="arena-card p-8 text-center">
						<p className="text-[var(--text-secondary)]">Model not found.</p>
						<Link
							to="/"
							className="mt-2 inline-block text-sm text-[var(--text-primary)] underline"
							onClick={(e) => {
								e.preventDefault();
								withViewTransition(() => navigate({ to: "/" }));
							}}
						>
							Return to leaderboard
						</Link>
					</div>
				</div>
			</main>
		);
	}

	return (
		<main className="flex-1 arena-container px-2 pb-0 pt-8 md:px-4 md:pt-14">
			<div
				className="rise-in relative z-10"
				style={{ viewTransitionName: "header-area" }}
			>
				<Link
					to="/"
					className="mb-6 inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
					onClick={(e) => {
						e.preventDefault();
						withViewTransition(() => navigate({ to: "/" }));
					}}
				>
					<ArrowLeft size={14} />
					Back to leaderboard
				</Link>

				<div className="mb-6 flex items-center gap-3">
					<ProviderLogo provider={model.provider} size={28} colorful />
					<div>
						<h1 className="font-heading text-2xl font-normal tracking-[-2.2%] text-[var(--text-primary)] md:text-3xl">
							{model.modelName}
						</h1>
					</div>
				</div>

				<div className="mb-6">
					<LeaderboardTable
						models={[model]}
						scoringMode={scoring}
						disableLink
					/>
				</div>

				<div className="mb-6 flex flex-wrap items-center gap-2">
					<FilterChip
						label="Dataset"
						value={dataset}
						options={[
							{ value: "with-skills", label: "With skills.md" },
							{ value: "without-skills", label: "Without skills.md" },
						]}
						onChange={(v) =>
							setFilter({
								dataset: v as "with-skills" | "without-skills",
							})
						}
					/>
					<FilterChip
						label="Scoring"
						value={scoring}
						options={[
							{ value: "all", label: "All" },
							{ value: "mcq", label: "Deterministic" },
							{ value: "freeform", label: "AI-Judged" },
						]}
						onChange={(v) => setFilter({ scoring: v as ScoringMode })}
					/>
					<FilterChip
						label="Category"
						multi
						multiValue={categories}
						options={CATEGORY_ORDER.map((cat) => ({
							value: cat,
							label: CATEGORY_LABELS[cat],
						}))}
						onMultiChange={(v) => setFilter({ categories: v })}
					/>
				</div>
			</div>

			<div
				className="rise-in bg-[var(--bg-base)]"
				style={{ animationDelay: "100ms", viewTransitionName: "questions" }}
			>
				{filteredQuestions.length === 0 ? (
					<div className="arena-card p-8 text-center">
						<p className="text-sm text-[var(--text-secondary)]">
							No questions match the current filters.
						</p>
						<button
							type="button"
							onClick={() =>
								setFilter({
									scoring: "all",
									categories: CATEGORY_ORDER,
								})
							}
							className="mt-3 cursor-pointer rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-4 py-1.5 text-xs font-medium text-[var(--text-primary)] transition hover:border-[var(--line)]"
						>
							Reset filters
						</button>
					</div>
				) : (
					Object.entries(groupedByCategory).map(([cat, questions]) => (
						<QuestionSection key={cat} category={cat} questions={questions} />
					))
				)}
			</div>
		</main>
	);
}

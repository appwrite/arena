import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useCallback, useEffect, useMemo } from "react";
import CategoryTabs from "#/components/CategoryTabs";
import FilterChip from "#/components/FilterChip";
import JsonLd from "#/components/JsonLd";
import LeaderboardTable from "#/components/LeaderboardTable";
import ProviderLogo from "#/components/ProviderLogo";
import QuestionSection from "#/components/QuestionSection";
import withSkillsData from "#/data/results-with-skills.json";
import withoutSkillsData from "#/data/results-without-skills.json";
import {
	getModelCountry,
	getProviderWebsite,
} from "../../../benchmark/src/config";
import { OG_IMAGE, SITE_URL } from "#/lib/site";
import type { BenchmarkResults, ModelResult, ScoringMode } from "#/lib/types";
import { CATEGORY_LABELS } from "#/lib/types";

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

const MODEL_PAGE_UTM = {
	utm_source: "appwrite-arena",
	utm_medium: "model_page",
	utm_campaign: "benchmark",
} as const;

function formatRunDate(iso: string): string {
	const d = new Date(iso);
	return d.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

interface SearchParams {
	dataset?: "with-skills" | "without-skills";
	scoring?: ScoringMode;
	category?: string;
	utm_source?: string;
	utm_medium?: string;
	utm_campaign?: string;
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
		if (
			typeof search.category === "string" &&
			CATEGORY_ORDER.includes(search.category) &&
			search.category !== CATEGORY_ORDER[0]
		) {
			result.category = search.category;
		}
		if (typeof search.utm_source === "string") result.utm_source = search.utm_source;
		if (typeof search.utm_medium === "string") result.utm_medium = search.utm_medium;
		if (typeof search.utm_campaign === "string")
			result.utm_campaign = search.utm_campaign;
		return result;
	},
	head: ({ params }) => {
		const model = findModel(params.modelId, "with-skills");
		const name = model?.modelName ?? params.modelId;
		const title = `${name} - Appwrite Arena`;
		const description = `Detailed benchmark results for ${name} on Appwrite Arena.`;
		const url = `${SITE_URL}/model/${params.modelId}`;
		return {
			meta: [
				{ title },
				{ name: "description", content: description },
				{ property: "og:type", content: "website" },
				{ property: "og:title", content: title },
				{ property: "og:description", content: description },
				{ property: "og:url", content: url },
				{ property: "og:image", content: OG_IMAGE },
				{ property: "og:site_name", content: "Appwrite Arena" },
				{ name: "twitter:card", content: "summary_large_image" },
				{ name: "twitter:title", content: title },
				{ name: "twitter:description", content: description },
				{ name: "twitter:image", content: OG_IMAGE },
			],
			links: [{ rel: "canonical", href: url }],
		};
	},
	component: ModelDetailPage,
});

function ModelDetailPage() {
	const { modelId } = Route.useParams();
	const search = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });

	const dataset = search.dataset ?? "with-skills";
	const scoring = search.scoring ?? "all";
	const activeCategory = search.category ?? CATEGORY_ORDER[0];

	const setFilter = useCallback(
		(updates: {
			dataset?: "with-skills" | "without-skills";
			scoring?: ScoringMode;
			category?: string;
		}) => {
			navigate({
				search: (prev: SearchParams) => {
					const newDataset = updates.dataset ?? prev.dataset ?? "with-skills";
					const newScoring = updates.scoring ?? prev.scoring ?? "all";
					const newCategory =
						updates.category ?? prev.category ?? CATEGORY_ORDER[0];

					const result: SearchParams = {};
					if (newDataset !== "with-skills")
						result.dataset = newDataset as "without-skills";
					if (newScoring !== "all") result.scoring = newScoring as ScoringMode;
					if (newCategory !== CATEGORY_ORDER[0]) result.category = newCategory;
					return result;
				},
				replace: true,
				resetScroll: false,
			});
		},
		[navigate],
	);

	const model = findModel(modelId, dataset);

	const ranking = useMemo(() => {
		if (!model) return null;
		const data = dataset === "with-skills" ? withSkills : withoutSkills;
		const sorted = [...data.models].sort((a, b) => b.overall - a.overall);
		const rank = sorted.findIndex((m) => m.modelId === modelId) + 1;
		return rank > 0 ? { rank, total: sorted.length } : null;
	}, [model, modelId, dataset]);

	const categoryCounts = useMemo(() => {
		if (!model?.questionDetails) return {};
		let questions = model.questionDetails;
		if (scoring === "mcq")
			questions = questions.filter((q) => q.type === "mcq");
		else if (scoring === "freeform")
			questions = questions.filter((q) => q.type === "free-form");
		const counts: Record<string, number> = {};
		for (const cat of CATEGORY_ORDER) {
			counts[cat] = questions.filter((q) => q.category === cat).length;
		}
		return counts;
	}, [model?.questionDetails, scoring]);

	const filteredQuestions = useMemo(() => {
		if (!model?.questionDetails) return [];
		let questions = model.questionDetails;
		if (scoring === "mcq")
			questions = questions.filter((q) => q.type === "mcq");
		else if (scoring === "freeform")
			questions = questions.filter((q) => q.type === "free-form");
		return questions.filter((q) => q.category === activeCategory);
	}, [model?.questionDetails, scoring, activeCategory]);

	useEffect(() => {
		const hash = window.location.hash.slice(1);
		if (hash && CATEGORY_ORDER.includes(hash)) {
			setFilter({ category: hash });
		}
	}, [setFilter]);

	if (!model) {
		return (
			<main className="flex-1 arena-container px-2 pb-0 pt-8 md:px-4 md:pt-14">
				<div className="rise-in">
					<Link
						to="/"
						className="mb-6 inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
					>
						<ArrowLeft size={14} />
						Back
					</Link>
					<div className="arena-card p-8 text-center">
						<p className="text-[var(--text-secondary)]">Model not found.</p>
						<Link
							to="/"
							className="mt-2 inline-block text-sm text-[var(--text-primary)] underline"
						>
							Return to leaderboard
						</Link>
					</div>
				</div>
			</main>
		);
	}

	const breadcrumbJsonLd = {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: [
			{ "@type": "ListItem", position: 1, name: "Appwrite Arena", item: SITE_URL },
			{
				"@type": "ListItem",
				position: 2,
				name: model.modelName,
				item: `${SITE_URL}/model/${modelId}`,
			},
		],
	} as const;

	return (
		<main className="flex-1 arena-container px-2 pb-0 pt-8 md:px-4 md:pt-14">
			<JsonLd data={breadcrumbJsonLd} />
			<div className="rise-in relative z-10">
				<Link
					to="/"
					className="mb-8 inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] md:mb-10"
				>
					<ArrowLeft size={14} />
					Back
				</Link>

				<div className="mb-6 flex flex-wrap items-start gap-3">
					<span className="mt-1 inline-block">
						<ProviderLogo provider={model.provider} size={28} colorful />
					</span>
					<div className="flex min-w-0 flex-1 flex-col gap-1">
						<h1 className="font-heading text-2xl font-normal tracking-[-2.2%] text-[var(--text-primary)] md:text-3xl">
							{model.modelName}
						</h1>
						<p className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-sm text-[var(--text-secondary)]">
							<span>
								{model.provider}
								{(() => {
									const country = getModelCountry(model.modelId);
									return country ? `, ${country}` : "";
								})()}
							</span>
							<span aria-hidden> - </span>
							<span>
								{model.totalCorrect}/{model.totalQuestions} correct
							</span>
							<span aria-hidden> - </span>
							<span>Last updated {formatRunDate(model.runDate)}</span>
							{(() => {
								const website = getProviderWebsite(model.provider);
								return website ? (
									<>
										<span aria-hidden> - </span>
										<a
											href={`${website}${website.includes("?") ? "&" : "?"}utm_source=${MODEL_PAGE_UTM.utm_source}&utm_medium=${MODEL_PAGE_UTM.utm_medium}&utm_campaign=${MODEL_PAGE_UTM.utm_campaign}`}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-1 text-[var(--text-secondary)] underline decoration-[var(--line)] underline-offset-2 transition hover:text-[var(--text-primary)] hover:decoration-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--line)]"
									>
										Website
										<ExternalLink size={12} aria-hidden />
									</a>
								</>
								) : null;
							})()}
						</p>
					</div>
				</div>

				<div
					className="mb-8 max-w-2xl pl-0 text-sm leading-relaxed text-[var(--text-secondary)]"
					aria-label="About this result"
				>
					<p>
						<strong className="font-medium text-[var(--text-primary)]">
							{model.modelName}
						</strong>{" "}
						by {model.provider} achieved an overall score of{" "}
						<strong className="font-medium text-[var(--text-primary)]">
							{model.overall.toFixed(1)}%
						</strong>{" "}
						on Appwrite Arena
						{ranking &&
							`, ranking #${ranking.rank} of ${ranking.total} benchmarked models`}
						. The benchmark tests how well AI models understand Appwrite - the
						open-source backend platform for authentication, databases, storage,
						functions, and more. This model answered {model.totalCorrect} of{" "}
						{model.totalQuestions} questions correctly across categories
						including Auth, Databases, Functions, Storage, and CLI. Compare{" "}
						{model.modelName} with other LLMs on the Appwrite Arena leaderboard.
					</p>
				</div>

				<div className="mb-4 flex flex-wrap items-center gap-2">
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
				</div>
			</div>

			<div className="rise-in mb-10" style={{ animationDelay: "50ms" }}>
				<LeaderboardTable
					models={[model]}
					scoringMode={scoring}
					disableLink
					hideModel
				/>
			</div>

			<div
				className="rise-in bg-[var(--bg-base)]"
				style={{ animationDelay: "100ms" }}
			>
				<CategoryTabs
					categories={CATEGORY_ORDER}
					activeCategory={activeCategory}
					categoryCounts={categoryCounts}
					onCategoryChange={(cat) => setFilter({ category: cat })}
				/>

				{filteredQuestions.length === 0 ? (
					<div className="arena-card p-8 text-center">
						<p className="text-sm text-[var(--text-secondary)]">
							No questions match the current filters.
						</p>
						<button
							type="button"
							onClick={() => setFilter({ scoring: "all" })}
							className="mt-3 cursor-pointer rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-4 py-1.5 text-xs font-medium text-[var(--text-primary)] transition hover:border-[var(--line)]"
						>
							Reset filters
						</button>
					</div>
				) : (
					<QuestionSection
						category={activeCategory}
						questions={filteredQuestions}
					/>
				)}
			</div>
		</main>
	);
}

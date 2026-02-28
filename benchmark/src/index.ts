import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { MODELS } from "./config";
import { fetchPricing } from "./pricing";
import { allQuestions } from "./questions/index";
import { runBenchmark } from "./runner";
import type { BenchmarkResults, Question, QuestionResult } from "./types";

function parseArgs(): { mode: "with-guidelines" | "without-guidelines" } {
	const args = process.argv.slice(2);
	const modeIndex = args.indexOf("--mode");
	if (modeIndex !== -1 && args[modeIndex + 1]) {
		const mode = args[modeIndex + 1];
		if (mode === "with-guidelines" || mode === "without-guidelines") {
			return { mode };
		}
	}
	return { mode: "without-guidelines" };
}

function loadGuidelines(): string {
	const guidelinesDir = resolve(import.meta.dir, "guidelines");
	const indexPath = join(guidelinesDir, "llms.txt");

	try {
		const index = readFileSync(indexPath, "utf-8");
		const files = index
			.split("\n")
			.map((line) => line.trim())
			.filter((line) => line.endsWith(".md"));

		let combined = "";
		for (const file of files) {
			try {
				const content = readFileSync(join(guidelinesDir, file), "utf-8");
				combined += `${content}\n\n`;
			} catch {
				console.warn(`  Warning: Could not read guideline file: ${file}`);
			}
		}

		return combined.trim();
	} catch {
		console.warn("Warning: Could not read guidelines index (llms.txt)");
		return "";
	}
}

function aggregateScores(
	results: QuestionResult[],
	questions: Question[],
	typeFilter?: "mcq" | "free-form",
): Record<string, number> {
	const categories = [...new Set(questions.map((q) => q.category))];
	const scores: Record<string, number> = {};

	for (const category of categories) {
		let categoryResults = results.filter((r) => r.category === category);
		if (typeFilter) {
			categoryResults = categoryResults.filter((r) => r.type === typeFilter);
		}
		if (categoryResults.length > 0) {
			const avg =
				categoryResults.reduce((sum, r) => sum + r.score, 0) /
				categoryResults.length;
			scores[category] = Math.round(avg * 1000) / 10;
		}
	}

	return scores;
}

function computeOverall(
	results: QuestionResult[],
	typeFilter?: "mcq" | "free-form",
): number {
	const filtered = typeFilter
		? results.filter((r) => r.type === typeFilter)
		: results;
	if (filtered.length === 0) return 0;
	return (
		Math.round(
			(filtered.reduce((sum, r) => sum + r.score, 0) / filtered.length) * 1000,
		) / 10
	);
}

interface ProgressData {
	mode: string;
	models: Record<
		string,
		{
			modelId: string;
			modelName: string;
			provider: string;
			costPerMillionTokens: number;
			results: QuestionResult[];
		}
	>;
}

function getProgressPath(mode: string): string {
	return resolve(import.meta.dir, `../progress-${mode}.json`);
}

function getOutputPath(mode: string): string {
	return resolve(import.meta.dir, `../../src/data/results-${mode}.json`);
}

function loadProgress(mode: string): ProgressData {
	const path = getProgressPath(mode);
	if (existsSync(path)) {
		try {
			const raw = readFileSync(path, "utf-8");
			return JSON.parse(raw) as ProgressData;
		} catch {
			console.warn("Warning: Could not parse progress file, starting fresh");
		}
	}
	return { mode, models: {} };
}

function saveProgress(progress: ProgressData): void {
	const path = getProgressPath(progress.mode);
	writeFileSync(path, JSON.stringify(progress, null, 2));
}

function saveOutput(
	progress: ProgressData,
	mode: "with-guidelines" | "without-guidelines",
): void {
	const models = Object.values(progress.models).map((m) => {
		const scores = aggregateScores(m.results, allQuestions);
		const mcqScores = aggregateScores(m.results, allQuestions, "mcq");
		const freeformScores = aggregateScores(
			m.results,
			allQuestions,
			"free-form",
		);
		const totalCorrect = m.results.filter((r) => r.correct).length;
		const overall = computeOverall(m.results);
		const mcqOverall = computeOverall(m.results, "mcq");
		const freeformOverall = computeOverall(m.results, "free-form");

		return {
			modelId: m.modelId,
			modelName: m.modelName,
			provider: m.provider,
			costPerMillionTokens: m.costPerMillionTokens,
			scores,
			mcqScores,
			freeformScores,
			overall,
			mcqOverall,
			freeformOverall,
			totalQuestions: allQuestions.length,
			totalCorrect,
			runDate: new Date().toISOString(),
		};
	});

	const totalMcq = allQuestions.filter((q) => q.type === "mcq").length;
	const totalFreeform = allQuestions.filter(
		(q) => q.type === "free-form",
	).length;

	const output: BenchmarkResults = {
		version: "1.0.0",
		runDate: new Date().toISOString(),
		mode,
		totalQuestions: allQuestions.length,
		totalMcq,
		totalFreeform,
		models,
	};

	const path = getOutputPath(mode);
	writeFileSync(path, JSON.stringify(output, null, 2));
}

async function main() {
	const { mode } = parseArgs();
	console.log(`\nAppwrite Arena Benchmark`);
	console.log(`Mode: ${mode}`);
	console.log(`Models: ${MODELS.length}`);
	console.log(`Questions: ${allQuestions.length}`);

	const progress = loadProgress(mode);
	const existingModels = Object.keys(progress.models).length;
	if (existingModels > 0) {
		const totalExistingResults = Object.values(progress.models).reduce(
			(sum, m) => sum + m.results.length,
			0,
		);
		console.log(
			`Resuming: ${existingModels} models with ${totalExistingResults} results found`,
		);
	}

	let guidelines = "";
	if (mode === "with-guidelines") {
		guidelines = loadGuidelines();
		if (guidelines) {
			console.log(`Loaded guidelines (${guidelines.length} chars)`);
		} else {
			console.log("Warning: No guidelines loaded");
		}
	}

	const systemPrompt = guidelines
		? `You are an expert on Appwrite, the open-source backend-as-a-service platform. Use the following documentation to answer questions accurately.\n\n${guidelines}`
		: "You are an expert on Appwrite, the open-source backend-as-a-service platform. Answer questions about Appwrite services accurately and concisely.";

	const pricing = await fetchPricing(MODELS);

	for (const model of MODELS) {
		console.log(`\nRunning: ${model.name} (${model.provider})`);

		const costPerMillionTokens = pricing[model.id] ?? 0;

		if (!progress.models[model.id]) {
			progress.models[model.id] = {
				modelId: model.id,
				modelName: model.name,
				provider: model.provider,
				costPerMillionTokens,
				results: [],
			};
		} else {
			// Always update pricing to latest
			progress.models[model.id].costPerMillionTokens = costPerMillionTokens;
		}

		const existingResults = progress.models[model.id].results;

		const results = await runBenchmark({
			model,
			questions: allQuestions,
			systemPrompt,
			existingResults,
			onQuestionComplete: (result: QuestionResult) => {
				progress.models[model.id].results.push(result);
				saveProgress(progress);
				saveOutput(progress, mode);
			},
		});

		// Ensure final state is saved for this model
		progress.models[model.id].results = results;
		saveProgress(progress);
		saveOutput(progress, mode);

		const totalCorrect = results.filter((r) => r.correct).length;
		const overall =
			results.length > 0
				? Math.round(
						(results.reduce((sum, r) => sum + r.score, 0) / results.length) *
							1000,
					) / 10
				: 0;
		console.log(
			`  Score: ${overall}% (${totalCorrect}/${allQuestions.length})`,
		);
	}

	console.log(`\nDone. Results at: ${getOutputPath(mode)}`);
	console.log(`Progress saved at: ${getProgressPath(mode)}`);
}

main().catch((err) => {
	console.error("Benchmark failed:", err);
	process.exit(1);
});

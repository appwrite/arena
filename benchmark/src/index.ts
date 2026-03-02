import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { MODELS } from "./config";
import { fetchPricing } from "./pricing";
import { allQuestions } from "./questions/index";
import { runBenchmark } from "./runner";
import type {
	BenchmarkResults,
	Question,
	QuestionDetail,
	QuestionResult,
} from "./types";

function parseArgs(): { mode: "with-skills" | "without-skills" } {
	const args = process.argv.slice(2);
	const modeIndex = args.indexOf("--mode");
	if (modeIndex !== -1 && args[modeIndex + 1]) {
		const mode = args[modeIndex + 1];
		if (mode === "with-skills" || mode === "without-skills") {
			return { mode };
		}
	}
	return { mode: "without-skills" };
}

function loadSkills(): string {
	const skillsDir = resolve(import.meta.dir, "skills");
	const indexPath = join(skillsDir, "llms.txt");

	try {
		const index = readFileSync(indexPath, "utf-8");
		const files = index
			.split("\n")
			.map((line) => line.trim())
			.filter((line) => line.endsWith(".md"));

		let combined = "";
		for (const file of files) {
			try {
				const content = readFileSync(join(skillsDir, file), "utf-8");
				combined += `${content}\n\n`;
			} catch {
				console.warn(`  Warning: Could not read skill file: ${file}`);
			}
		}

		return combined.trim();
	} catch {
		console.warn("Warning: Could not read skills index (llms.txt)");
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

interface ModelProgress {
	modelId: string;
	modelName: string;
	provider: string;
	costPerMillionTokens: number;
	results: QuestionResult[];
}

function getResultsPath(mode: string): string {
	return resolve(import.meta.dir, `../../src/data/results-${mode}.json`);
}

function loadExistingResults(mode: string): Record<string, ModelProgress> {
	const path = getResultsPath(mode);
	if (existsSync(path)) {
		try {
			const raw = readFileSync(path, "utf-8");
			const data = JSON.parse(raw) as BenchmarkResults;
			const models: Record<string, ModelProgress> = {};
			for (const m of data.models) {
				models[m.modelId] = {
					modelId: m.modelId,
					modelName: m.modelName,
					provider: m.provider,
					costPerMillionTokens: m.costPerMillionTokens,
					results: m.questionDetails.map((d) => ({
						questionId: d.questionId,
						category: d.category,
						type: d.type,
						modelAnswer: d.modelAnswer,
						correct: d.correct,
						score: d.score,
						judgeReasoning: d.judgeReasoning,
					})),
				};
			}
			return models;
		} catch {
			console.warn("Warning: Could not parse results file, starting fresh");
		}
	}
	return {};
}

function saveResults(
	models: Record<string, ModelProgress>,
	mode: "with-skills" | "without-skills",
): void {
	const modelEntries = Object.values(models).map((m) => {
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

		const questionDetails: QuestionDetail[] = m.results.map((r) => {
			const q = allQuestions.find((q) => q.id === r.questionId);
			return {
				questionId: r.questionId,
				category: r.category,
				type: r.type,
				question: q?.question ?? "",
				choices: q?.choices,
				correctAnswer: q?.correctAnswer ?? "",
				rubric: q?.rubric,
				modelAnswer: r.modelAnswer,
				correct: r.correct,
				score: r.score,
				judgeReasoning: r.judgeReasoning,
			};
		});

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
			questionDetails,
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
		models: modelEntries,
	};

	const path = getResultsPath(mode);
	writeFileSync(path, JSON.stringify(output, null, 2));
}

async function main() {
	const { mode } = parseArgs();
	console.log(`\nAppwrite Arena Benchmark`);
	console.log(`Mode: ${mode}`);
	console.log(`Models: ${MODELS.length}`);
	console.log(`Questions: ${allQuestions.length}`);

	const models = loadExistingResults(mode);
	const existingModelCount = Object.keys(models).length;
	if (existingModelCount > 0) {
		const totalExistingResults = Object.values(models).reduce(
			(sum, m) => sum + m.results.length,
			0,
		);
		console.log(
			`Resuming: ${existingModelCount} models with ${totalExistingResults} results found`,
		);
	}

	let skills = "";
	if (mode === "with-skills") {
		skills = loadSkills();
		if (skills) {
			console.log(`Loaded skills (${skills.length} chars)`);
		} else {
			console.log("Warning: No skills loaded");
		}
	}

	const systemPrompt = skills
		? `You are an expert on Appwrite, the open-source backend-as-a-service platform. Use the following documentation to answer questions accurately.\n\n${skills}`
		: "You are an expert on Appwrite, the open-source backend-as-a-service platform. Answer questions about Appwrite services accurately and concisely.";

	const pricing = await fetchPricing(MODELS);

	for (const model of MODELS) {
		console.log(`\nRunning: ${model.name} (${model.provider})`);

		const costPerMillionTokens = pricing[model.id] ?? 0;

		if (!models[model.id]) {
			models[model.id] = {
				modelId: model.id,
				modelName: model.name,
				provider: model.provider,
				costPerMillionTokens,
				results: [],
			};
		} else {
			// Always update pricing to latest
			models[model.id].costPerMillionTokens = costPerMillionTokens;
		}

		const existingResults = models[model.id].results;

		const results = await runBenchmark({
			model,
			questions: allQuestions,
			systemPrompt,
			existingResults,
			onQuestionComplete: (result: QuestionResult) => {
				models[model.id].results.push(result);
				saveResults(models, mode);
			},
		});

		// Ensure final state is saved for this model
		models[model.id].results = results;
		saveResults(models, mode);

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

	console.log(`\nDone. Results at: ${getResultsPath(mode)}`);
}

main().catch((err) => {
	console.error("Benchmark failed:", err);
	process.exit(1);
});

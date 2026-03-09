/**
 * Generates static JSON for SSG: summary.json (simplified homepage payload) and
 * leaderboard*.json for embedding/API. Run as part of prebuild; output ends up in dist.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, "..");
const withSkillsPath = path.join(rootDir, "src/data/results-with-skills.json");
const withoutSkillsPath = path.join(rootDir, "src/data/results-without-skills.json");
const publicDir = path.join(rootDir, "public");

interface ModelSummary {
	modelId: string;
	modelName: string;
	provider: string;
	promptCostPerMillionTokens: number;
	completionCostPerMillionTokens: number;
	overall: number;
	mcqOverall: number;
	freeformOverall: number;
	scores: Record<string, number>;
}

function toSummary(models: unknown[]): ModelSummary[] {
	return (models as ModelSummary[]).map((m) => ({
		modelId: m.modelId,
		modelName: m.modelName,
		provider: m.provider,
		promptCostPerMillionTokens: m.promptCostPerMillionTokens,
		completionCostPerMillionTokens: m.completionCostPerMillionTokens,
		overall: m.overall,
		mcqOverall: m.mcqOverall,
		freeformOverall: m.freeformOverall,
		scores: m.scores ?? {},
	}));
}

async function generate(mode: "with-skills" | "without-skills") {
	const dataPath = mode === "with-skills" ? withSkillsPath : withoutSkillsPath;
	const data = await Bun.file(dataPath).json() as {
		models: Array<{ overall?: number }>;
		runDate: string;
	};
	const sorted = [...data.models].sort(
		(a, b) => (b.overall ?? 0) - (a.overall ?? 0),
	);
	const payload = {
		runDate: data.runDate,
		mode,
		models: toSummary(sorted),
	};
	const outPath = path.join(publicDir, `summary-${mode === "with-skills" ? "with-skills" : "without-skills"}.json`);
	await Bun.write(outPath, JSON.stringify(payload, null, 0));
	console.log(`Generated /${path.relative(rootDir, outPath)} with ${sorted.length} models`);
}

await generate("with-skills");
await generate("without-skills");

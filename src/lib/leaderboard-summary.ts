import { createServerFn } from "@tanstack/react-start";
import withSkillsData from "../data/results-with-skills.json";
import withoutSkillsData from "../data/results-without-skills.json";

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

function buildSummary(mode: "with-skills" | "without-skills") {
	const data = mode === "with-skills" ? withSkillsData : withoutSkillsData;
	const sorted = [...(data as { models: Array<{ overall?: number }>; runDate: string }).models].sort(
		(a, b) => (b.overall ?? 0) - (a.overall ?? 0),
	);
	return {
		runDate: (data as { runDate: string }).runDate,
		mode,
		models: toSummary(sorted),
	};
}

export const fetchLeaderboardSummary = createServerFn()
	.validator((mode: "with-skills" | "without-skills") => mode)
	.handler(async ({ data: mode }) => {
		return buildSummary(mode);
	});

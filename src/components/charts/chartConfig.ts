import type { CSSProperties } from "react";
import type { CategoryKey, ModelResult } from "#/lib/types";
import { CATEGORY_LABELS } from "#/lib/types";

export const tooltipContentStyle: CSSProperties = {
	background: "#1e1e22",
	border: "1px solid rgba(237,237,240,0.12)",
	borderRadius: 8,
	fontSize: 13,
	boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
};

export const tooltipLabelStyle: CSSProperties = {
	color: "#EDEDF0",
	fontWeight: 500,
	marginBottom: 4,
};

export const tooltipItemStyle: CSSProperties = {
	color: "#9ca3af",
	padding: "1px 0",
};

export const MODEL_COLORS: Record<string, string> = {
	Anthropic: "#FE9567",
	OpenAI: "#10B981",
	Google: "#68A3FE",
	MoonshotAI: "#7C67FE",
	Zhipu: "#3B82F6",
	Alibaba: "#6366F1",
	DeepSeek: "#4D6BFE",
	MiniMax: "#E85C2B",
};

export function getModelColor(provider: string): string {
	return MODEL_COLORS[provider] ?? "#888888";
}

export function getShortName(modelName: string): string {
	if (modelName.includes("Claude")) return "Claude";
	if (modelName.includes("GPT")) {
		const match = modelName.match(/GPT\s*([\d.]+)/);
		return match ? `GPT ${match[1]}` : "GPT";
	}
	if (modelName.includes("Gemini")) return "Gemini";
	if (modelName.includes("Kimi")) return "Kimi";
	if (modelName.includes("GLM")) return "GLM";
	if (modelName.includes("Qwen")) return "Qwen";
	if (modelName.includes("DeepSeek")) return "DeepSeek";
	if (modelName.includes("MiniMax")) return "MiniMax";
	return modelName.split(" ")[0];
}

/** Round to at most 2 decimal places, stripping trailing zeroes. */
export function round2(n: number): number {
	return Math.round(n * 100) / 100;
}

const CATEGORY_KEYS = Object.keys(CATEGORY_LABELS) as CategoryKey[];

export interface RadarDataPoint {
	category: string;
	fullCategory: string;
	[modelName: string]: number | string;
}

export function buildRadarData(models: ModelResult[]): RadarDataPoint[] {
	return CATEGORY_KEYS.map((key) => {
		const point: RadarDataPoint = {
			category: CATEGORY_LABELS[key],
			fullCategory: CATEGORY_LABELS[key],
		};
		for (const m of models) {
			point[getShortName(m.modelName)] = round2(Math.max(m.scores[key], 80));
		}
		return point;
	});
}

export interface McqFreeformDataPoint {
	name: string;
	mcq: number;
	freeform: number;
	color: string;
}

export function buildMcqFreeformData(
	models: ModelResult[],
): McqFreeformDataPoint[] {
	return models.map((m) => ({
		name: getShortName(m.modelName),
		mcq: round2(m.mcqOverall),
		freeform: round2(m.freeformOverall),
		color: getModelColor(m.provider),
	}));
}

export interface SkillsComparisonDataPoint {
	name: string;
	base: number;
	boost: number;
	color: string;
}

export function buildSkillsComparisonData(
	withSkills: ModelResult[],
	withoutSkills: ModelResult[],
): SkillsComparisonDataPoint[] {
	return withSkills.map((ws) => {
		const wo = withoutSkills.find((m) => m.modelId === ws.modelId);
		const baseScore = wo?.overall ?? 0;
		return {
			name: getShortName(ws.modelName),
			base: round2(Math.max(baseScore - 75, 0)),
			boost: round2(Math.max(ws.overall - baseScore, 0)),
			color: getModelColor(ws.provider),
		};
	});
}

export interface OverallValueDataPoint {
	name: string;
	value: number;
	score: number;
	costScore: number;
	cost: number;
	color: string;
}

export function buildOverallValueData(
	models: ModelResult[],
	category?: CategoryKey,
): OverallValueDataPoint[] {
	const minCost = Math.min(...models.map((m) => m.costPerMillionTokens));
	return models
		.map((m) => {
			const score = category ? m.scores[category] : m.overall;
			const costScore = round2((minCost / m.costPerMillionTokens) * 100);
			return {
				name: getShortName(m.modelName),
				value: round2((score + costScore) / 2),
				score: round2(score),
				costScore,
				cost: m.costPerMillionTokens,
				color: getModelColor(m.provider),
			};
		})
		.sort((a, b) => b.value - a.value);
}

export interface CostEfficiencyDataPoint {
	name: string;
	cost: number;
	score: number;
	color: string;
}

export function buildCostEfficiencyData(
	models: ModelResult[],
): CostEfficiencyDataPoint[] {
	return models
		.map((m) => ({
			name: getShortName(m.modelName),
			cost: m.costPerMillionTokens,
			score: round2(m.overall),
			color: getModelColor(m.provider),
		}))
		.sort((a, b) => a.cost - b.cost);
}

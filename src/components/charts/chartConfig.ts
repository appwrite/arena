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
	Anthropic: "#D4A27F",
	OpenAI: "#10A37F",
	Google: "#4285F4",
	MoonshotAI: "#A855F7",
};

export function getModelColor(provider: string): string {
	return MODEL_COLORS[provider] ?? "#888888";
}

export function getShortName(modelName: string): string {
	if (modelName.includes("Claude")) return "Claude";
	if (modelName.includes("GPT")) return "GPT";
	if (modelName.includes("Gemini")) return "Gemini";
	if (modelName.includes("Kimi")) return "Kimi";
	return modelName.split(" ")[0];
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
			point[getShortName(m.modelName)] = m.scores[key];
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
		mcq: m.mcqOverall,
		freeform: m.freeformOverall,
		color: getModelColor(m.provider),
	}));
}

export interface CostEfficiencyDataPoint {
	name: string;
	efficiency: number;
	cost: number;
	color: string;
}

export function buildCostEfficiencyData(
	models: ModelResult[],
): CostEfficiencyDataPoint[] {
	return models
		.map((m) => ({
			name: getShortName(m.modelName),
			efficiency: Math.round((m.overall / m.costPerMillionTokens) * 10) / 10,
			cost: m.costPerMillionTokens,
			color: getModelColor(m.provider),
		}))
		.sort((a, b) => b.efficiency - a.efficiency);
}

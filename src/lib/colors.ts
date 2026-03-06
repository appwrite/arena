export type ScoreTier = "high" | "mid" | "low";

export const SCORE_THRESHOLD_HIGH = 95;
export const SCORE_THRESHOLD_LOW = 85;

export function getScoreTier(score: number): ScoreTier {
	if (score >= SCORE_THRESHOLD_HIGH) return "high";
	if (score >= SCORE_THRESHOLD_LOW) return "mid";
	return "low";
}

export function getScoreColor(score: number): string {
	const tier = getScoreTier(score);
	if (tier === "low") return "var(--score-low)";
	if (tier === "mid") return "var(--score-mid)";
	return "var(--score-high)";
}

export function getScoreClass(score: number): string {
	return `score-${getScoreTier(score)}`;
}

export function getOverallColor(score: number): string {
	const tier = getScoreTier(score);
	if (tier === "high") return "#85DBD8";
	if (tier === "mid") return "#FE9567";
	return "#FF453A";
}

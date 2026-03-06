export type ScoreTier = "high" | "mid" | "low";

export function getScoreTier(score: number): ScoreTier {
	if (score >= 95) return "high";
	if (score >= 85) return "mid";
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

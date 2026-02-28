export interface BenchmarkResults {
	version: string;
	runDate: string;
	mode: "with-guidelines" | "without-guidelines";
	totalQuestions: number;
	totalMcq: number;
	totalFreeform: number;
	models: ModelResult[];
}

export interface CategoryScores {
	fundamental: number;
	auth: number;
	databases: number;
	functions: number;
	storage: number;
	sites: number;
	messaging: number;
}

export interface ModelResult {
	modelId: string;
	modelName: string;
	provider: string;
	costPerMillionTokens: number;
	scores: CategoryScores;
	mcqScores: CategoryScores;
	freeformScores: CategoryScores;
	overall: number;
	mcqOverall: number;
	freeformOverall: number;
	totalQuestions: number;
	totalCorrect: number;
	runDate: string;
}

export type ScoringMode = "all" | "mcq" | "freeform";

export const CATEGORY_LABELS: Record<string, string> = {
	fundamental: "Fundamental",
	auth: "Auth",
	databases: "Databases",
	functions: "Functions",
	storage: "Storage",
	sites: "Sites",
	messaging: "Messaging",
};

export type CategoryKey = keyof ModelResult["scores"];
export type SortField =
	| CategoryKey
	| "overall"
	| "modelName"
	| "costPerMillionTokens";

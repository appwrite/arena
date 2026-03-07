export interface QuestionDetail {
	questionId: string;
	category: string;
	type: "mcq" | "free-form";
	question: string;
	choices?: string[];
	correctAnswer: string;
	rubric?: string;
	modelAnswer: string;
	correct: boolean;
	score: number;
	judgeReasoning?: string;
	modComment?: string;
	promptTokens?: number;
	completionTokens?: number;
	totalTokens?: number;
	cost?: number;
	durationMs?: number;
	tokensPerSecond?: number;
}

export interface BenchmarkResults {
	version: string;
	runDate: string;
	mode: "with-skills" | "without-skills";
	totalQuestions: number;
	totalMcq: number;
	totalPromptTokens: number;
	totalCompletionTokens: number;
	totalTokens: number;
	totalCost: number;
	totalDurationMs: number;
	totalFreeform: number;
	models: ModelResult[];
}

export interface CategoryScores {
	foundation: number;
	auth: number;
	databases: number;
	functions: number;
	storage: number;
	sites: number;
	messaging: number;
	realtime: number;
	cli: number;
}

export interface ModelResult {
	modelId: string;
	modelName: string;
	provider: string;
	promptCostPerMillionTokens: number;
	completionCostPerMillionTokens: number;
	scores: CategoryScores;
	mcqScores: CategoryScores;
	freeformScores: CategoryScores;
	overall: number;
	mcqOverall: number;
	freeformOverall: number;
	totalQuestions: number;
	totalCorrect: number;
	totalPromptTokens: number;
	totalCompletionTokens: number;
	totalTokens: number;
	totalCost: number;
	totalDurationMs: number;
	averageTokensPerSecond: number;
	runDate: string;
	questionDetails: QuestionDetail[];
}

export type ScoringMode = "all" | "mcq" | "freeform";

export const CATEGORY_LABELS: Record<string, string> = {
	foundation: "Foundation",
	auth: "Auth",
	databases: "Databases",
	functions: "Functions",
	storage: "Storage",
	sites: "Sites",
	messaging: "Messaging",
	realtime: "Realtime",
	cli: "CLI",
};

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
	foundation: "Core concepts, SDKs, permissions, and platform basics",
	auth: "Authentication methods, user management, and sessions",
	databases: "Collections, documents, queries, and relationships",
	functions: "Serverless functions, runtimes, and execution",
	storage: "File uploads, buckets, and file management",
	sites: "Static site hosting, domains, and deployments",
	messaging: "Push notifications, SMS, email, and providers",
	realtime: "WebSocket subscriptions, channels, and live events",
	cli: "CLI installation, configuration, and deployment workflows",
};

export type CategoryKey = keyof ModelResult["scores"];
export type SortField =
	| CategoryKey
	| "overall"
	| "modelName"
	| "promptCostPerMillionTokens";

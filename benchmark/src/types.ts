export interface Question {
	id: string;
	category: string;
	type: "mcq" | "free-form";
	question: string;
	choices?: string[];
	correctAnswer: string;
	rubric?: string;
}

export interface QuestionResult {
	questionId: string;
	category: string;
	type: "mcq" | "free-form";
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

export interface ModelConfig {
	id: string;
	name: string;
	provider: string;
	openRouterId: string;
	openRouterProviderOrder?: string[];
	/** Provider website for the UI (e.g. model page link). */
	providerWebsite?: string;
	/** Brand color for logo. */
	providerBrandColor?: string;
	/** Color used in charts. Falls back to providerBrandColor. */
	providerChartColor?: string;
	/** Model/provider origin country for display (e.g. "United States", "China"). */
	country?: string;
}

export interface SkillInfo {
	description: string;
	content: string;
}

export interface ToolFunction {
	name: string;
	description: string;
	parameters: {
		type: string;
		required: string[];
		properties: Record<string, unknown>;
	};
}

export interface Tool {
	type: "function";
	function: ToolFunction;
}

export interface ToolCall {
	id: string;
	type: "function";
	function: {
		name: string;
		arguments: string;
	};
}

export interface ChatMessage {
	role: "system" | "user" | "assistant" | "tool";
	content?: string;
	toolCalls?: ToolCall[];
	toolCallId?: string;
}

export interface BenchmarkResults {
	version: string;
	runDate: string;
	mode: "with-skills" | "without-skills";
	totalQuestions: number;
	totalMcq: number;
	totalFreeform: number;
	totalPromptTokens: number;
	totalCompletionTokens: number;
	totalTokens: number;
	totalCost: number;
	totalDurationMs: number;
	models: Array<{
		modelId: string;
		modelName: string;
		provider: string;
		promptCostPerMillionTokens: number;
		completionCostPerMillionTokens: number;
		scores: Record<string, number>;
		mcqScores: Record<string, number>;
		freeformScores: Record<string, number>;
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
	}>;
}

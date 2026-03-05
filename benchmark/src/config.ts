import type { ModelConfig } from "./types";

export const OPENROUTER_API_URL =
	"https://openrouter.ai/api/v1/chat/completions";
export const OPENROUTER_MODELS_URL = "https://openrouter.ai/api/v1/models";

export const MODELS: ModelConfig[] = [
	{
		id: "gemini-3-1-pro-preview",
		name: "Gemini 3.1 Pro (Preview)",
		provider: "Google",
		openRouterId: "google/gemini-3.1-pro-preview",
		openRouterProviderOrder: ["google-ai-studio"],
	},
	{
		id: "gpt-5-3-codex",
		name: "GPT 5.3 Codex",
		provider: "OpenAI",
		openRouterId: "openai/gpt-5.3-codex",
	},
	{
		id: "claude-opus-4-6",
		name: "Claude Opus 4.6",
		provider: "Anthropic",
		openRouterId: "anthropic/claude-opus-4.6",
	},
	{
		id: "kimi-k-2-5",
		name: "Kimi K2.5",
		provider: "MoonshotAI",
		openRouterId: "moonshotai/kimi-k2.5",
	},
];

export const JUDGE_MODEL = "anthropic/claude-sonnet-4.6";
export const RATE_LIMIT_DELAY_MS = 500;
export const TEMPERATURE = 0;

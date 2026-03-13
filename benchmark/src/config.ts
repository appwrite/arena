import type { ModelConfig } from "./types";

export const OPENROUTER_API_URL =
	"https://openrouter.ai/api/v1/chat/completions";
export const OPENROUTER_MODELS_URL = "https://openrouter.ai/api/v1/models";

// Try to keep order from cheapest, to most expensive
export const MODELS: ModelConfig[] = [
  
  {
		id: "grok-4-1-fast", // ~0.2$
		name: "Grok 4.1 Fast",
		provider: "xAI",
		openRouterId: "x-ai/grok-4.1-fast",
		providerWebsite: "https://x.ai",
		providerBrandColor: "#FFFFFF",
		providerChartColor: "#F97316",
		country: "United States",
  },
  {
		id: "minimax-m2-5", // ~0.3$
		name: "MiniMax M2.5",
		provider: "MiniMax",
		openRouterId: "minimax/minimax-m2.5",
		providerWebsite: "https://www.minimax.chat",
		providerBrandColor: "#E85C2B",
		providerChartColor: "#E85C2B",
		country: "China",
	},
  {
		id: "deepseek-v3-2", // ~0.3$
		name: "DeepSeek V3.2",
		provider: "DeepSeek",
		openRouterId: "deepseek/deepseek-v3.2",
		providerWebsite: "https://deepseek.com",
		providerBrandColor: "#4D6BFE",
		providerChartColor: "#4D6BFE",
		country: "China",
	},
  {
		id: "qwen3-5-397b-a17b", // ~0.4$
		name: "Qwen 3.5 397B A17B",
		provider: "Alibaba",
		openRouterId: "qwen/qwen3.5-397b-a17b",
		providerWebsite: "https://tongyi.aliyun.com",
		providerBrandColor: "#6366F1",
		providerChartColor: "#6366F1",
		country: "China",
	},
  {
		id: "kimi-k-2-5", // ~0.5$
		name: "Kimi K2.5",
		provider: "MoonshotAI",
		openRouterId: "moonshotai/kimi-k2.5",
		providerWebsite: "https://www.moonshot.cn",
		providerBrandColor: "#0071e3",
		providerChartColor: "#7C67FE",
		country: "China",
	},
	{
		id: "glm-5", // ~0.7$
		name: "GLM 5",
		provider: "Zhipu",
		openRouterId: "z-ai/glm-5",
		providerWebsite: "https://open.bigmodel.cn",
		providerBrandColor: "#3B82F6",
		providerChartColor: "#3B82F6",
		country: "China",
	},
	{
		id: "gpt-5-3-codex", // ~1.75$
		name: "GPT 5.3 Codex",
		provider: "OpenAI",
		openRouterId: "openai/gpt-5.3-codex",
		providerWebsite: "https://openai.com",
		providerBrandColor: "#ffffff",
		providerChartColor: "#10B981",
		country: "United States",
	},
	{
		id: "gemini-3-1-pro-preview", // ~2$
		name: "Gemini 3.1 Pro (Preview)",
		provider: "Google",
		openRouterId: "google/gemini-3.1-pro-preview",
		openRouterProviderOrder: ["google-ai-studio"],
		providerWebsite: "https://ai.google.dev",
		providerBrandColor: "#4285F4",
		providerChartColor: "#68A3FE",
		country: "United States",
	},
	{
		id: "gpt-5-4", // ~2.5$
		name: "GPT 5.4",
		provider: "OpenAI",
		openRouterId: "openai/gpt-5.4",
		providerWebsite: "https://openai.com",
		providerBrandColor: "#ffffff",
		providerChartColor: "#10B981",
		country: "United States",
	},
	{
		id: "claude-opus-4-6", // ~5$
		name: "Claude Opus 4.6",
		provider: "Anthropic",
		openRouterId: "anthropic/claude-opus-4.6",
		providerWebsite: "https://anthropic.com",
		providerBrandColor: "#D4A27F",
		providerChartColor: "#FE9567",
		country: "United States",
	},
];

export function getModelCountry(modelId: string): string | undefined {
	return MODELS.find((m) => m.id === modelId)?.country;
}

export function getProviderWebsite(provider: string): string | undefined {
	return MODELS.find((m) => m.provider === provider)?.providerWebsite;
}

export function getModelColor(provider: string): string {
	const model = MODELS.find((m) => m.provider === provider);
	return model?.providerChartColor ?? model?.providerBrandColor ?? "#888888";
}

export function getProviderBrandColor(provider: string): string | undefined {
	return MODELS.find((m) => m.provider === provider)?.providerBrandColor;
}

export const JUDGE_MODEL = "anthropic/claude-sonnet-4.6";
export const RATE_LIMIT_DELAY_MS = 500;
export const TEMPERATURE = 0;

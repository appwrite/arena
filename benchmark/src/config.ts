import type { ModelConfig } from "./types";

export const OPENROUTER_API_URL =
	"https://openrouter.ai/api/v1/chat/completions";
export const OPENROUTER_MODELS_URL = "https://openrouter.ai/api/v1/models";

// Try to keep order from cheapest, to most expensive
export const MODELS: ModelConfig[] = [
	{
		id: "deepseek-v4-flash", // ~$0.1
		name: "DeepSeek V4 Flash",
		provider: "DeepSeek",
		openRouterId: "deepseek/deepseek-v4-flash",
		providerWebsite: "https://deepseek.com",
		providerBrandColor: "#4D6BFE",
		providerChartColor: "#4D6BFE",
		country: "China",
	},
	{
		id: "gemini-3-1-flash-lite-preview", // ~$0.2
		name: "Gemini 3.1 Flash Lite (Preview)",
		provider: "Google",
		openRouterId: "google/gemini-3.1-flash-lite-preview",
		openRouterProviderOrder: ["google-ai-studio"],
		providerWebsite: "https://ai.google.dev",
		providerBrandColor: "#4285F4",
		providerChartColor: "#68A3FE",
		country: "United States",
	},
	{
		id: "qwen3-6-plus", // ~$0.3
		name: "Qwen 3.6 Plus",
		provider: "Alibaba",
		openRouterId: "qwen/qwen3.6-plus",
		providerWebsite: "https://tongyi.aliyun.com",
		providerBrandColor: "#6366F1",
		providerChartColor: "#6366F1",
		country: "China",
	},
	{
		id: "minimax-m2-7", // ~$0.3
		name: "MiniMax M2.7",
		provider: "MiniMax",
		openRouterId: "minimax/minimax-m2.7",
		providerWebsite: "https://www.minimax.chat",
		providerBrandColor: "#E85C2B",
		providerChartColor: "#E85C2B",
		country: "China",
	},
	{
		id: "minimax-m3", // ~$0.30/$1.20
		name: "MiniMax M3",
		provider: "MiniMax",
		openRouterId: "minimax/minimax-m3",
		providerWebsite: "https://www.minimax.chat",
		providerBrandColor: "#E85C2B",
		providerChartColor: "#E85C2B",
		country: "China",
	},
	{
		id: "mistral-large-2512", // ~$0.50/$1.50
		name: "Mistral Large 3 2512",
		provider: "Mistral",
		openRouterId: "mistralai/mistral-large-2512",
		providerWebsite: "https://mistral.ai",
		providerBrandColor: "#FF7000",
		providerChartColor: "#FF7000",
		country: "France",
	},
	{
		id: "kimi-k2-6", // ~$0.75/$3.50
		name: "Kimi K2.6",
		provider: "MoonshotAI",
		openRouterId: "moonshotai/kimi-k2.6",
		providerWebsite: "https://www.moonshot.ai",
		providerBrandColor: "#00D2FF",
		providerChartColor: "#00A3FF",
		country: "China",
	},
	{
		id: "glm-5-1", // ~$1.0
		name: "GLM 5.1",
		provider: "Zhipu",
		openRouterId: "z-ai/glm-5.1",
		providerWebsite: "https://open.bigmodel.cn",
		providerBrandColor: "#3B82F6",
		providerChartColor: "#3B82F6",
		country: "China",
	},
	{
		id: "grok-build-0-1", // ~$1/$2
		name: "Grok Build 0.1",
		provider: "xAI",
		openRouterId: "x-ai/grok-build-0.1",
		providerWebsite: "https://x.ai",
		providerBrandColor: "#FFFFFF",
		providerChartColor: "#F97316",
		country: "United States",
	},
	{
		id: "grok-4-3", // ~$1.3
		name: "Grok 4.3",
		provider: "xAI",
		openRouterId: "x-ai/grok-4.3",
		providerWebsite: "https://x.ai",
		providerBrandColor: "#FFFFFF",
		providerChartColor: "#F97316",
		country: "United States",
	},
	{
		id: "gemini-3-5-flash", // ~$1.50/$9
		name: "Gemini 3.5 Flash",
		provider: "Google",
		openRouterId: "google/gemini-3.5-flash",
		openRouterProviderOrder: ["google-ai-studio"],
		providerWebsite: "https://ai.google.dev",
		providerBrandColor: "#4285F4",
		providerChartColor: "#68A3FE",
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
		id: "gpt-5-5", // ~$5
		name: "GPT 5.5",
		provider: "OpenAI",
		openRouterId: "openai/gpt-5.5",
		providerWebsite: "https://openai.com",
		providerBrandColor: "#ffffff",
		providerChartColor: "#10B981",
		country: "United States",
	},
	{
		id: "claude-opus-4-7", // ~$5
		name: "Claude Opus 4.7",
		provider: "Anthropic",
		openRouterId: "anthropic/claude-opus-4.7",
		providerWebsite: "https://anthropic.com",
		providerBrandColor: "#D4A27F",
		providerChartColor: "#FE9567",
		country: "United States",
	},
	{
		id: "claude-opus-4-8", // ~$5
		name: "Claude Opus 4.8",
		provider: "Anthropic",
		openRouterId: "anthropic/claude-opus-4.8",
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

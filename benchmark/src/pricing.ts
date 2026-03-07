import { OPENROUTER_MODELS_URL } from "./config";
import type { TokenPricing } from "./runner";
import type { ModelConfig } from "./types";

interface OpenRouterModel {
	id: string;
	pricing: {
		prompt: string;
		completion: string;
	};
}

interface OpenRouterModelsResponse {
	data: OpenRouterModel[];
}

export async function fetchPricing(
	models: ModelConfig[],
): Promise<Record<string, TokenPricing>> {
	console.log("Fetching live pricing from OpenRouter...");

	const response = await fetch(OPENROUTER_MODELS_URL);
	if (!response.ok) {
		throw new Error(`Failed to fetch OpenRouter models: ${response.status}`);
	}

	const { data } = (await response.json()) as OpenRouterModelsResponse;

	const pricingMap = new Map<string, { prompt: number; completion: number }>();
	for (const model of data) {
		const promptPerToken = parseFloat(model.pricing?.prompt ?? "0");
		const completionPerToken = parseFloat(model.pricing?.completion ?? "0");
		pricingMap.set(model.id, { prompt: promptPerToken, completion: completionPerToken });
	}

	const tokenPricing: Record<string, TokenPricing> = {};
	for (const model of models) {
		const prices = pricingMap.get(model.openRouterId);
		if (prices !== undefined) {
			tokenPricing[model.id] = {
				promptPerToken: prices.prompt,
				completionPerToken: prices.completion,
			};
			const promptCost = Math.round(prices.prompt * 1_000_000 * 100) / 100;
			const completionCost = Math.round(prices.completion * 1_000_000 * 100) / 100;
			console.log(`  ${model.name}: $${promptCost}/$${completionCost}/1M (prompt/completion)`);
		} else {
			console.warn(
				`  ${model.name}: pricing not found for ${model.openRouterId}, using $0`,
			);
			tokenPricing[model.id] = { promptPerToken: 0, completionPerToken: 0 };
		}
	}

	return tokenPricing;
}

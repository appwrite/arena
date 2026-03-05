import { OpenRouter } from "@openrouter/sdk";
import { JUDGE_MODEL, TEMPERATURE } from "./config";
import type { Question } from "./types";

const apiKey = process.env.OPENROUTER_API_KEY;

const openrouter = new OpenRouter({ apiKey });

interface JudgeResult {
	score: number;
	reasoning: string;
}

export async function judgeAnswer(
	question: Question,
	modelAnswer: string,
): Promise<JudgeResult> {
	const systemPrompt = `You are an expert judge evaluating an AI model's answer about Appwrite.

Question: ${question.question}

Reference Answer: ${question.correctAnswer}

${question.rubric ? `Rubric: ${question.rubric}` : ""}

Score the model's answer from 0.0 to 1.0 where:
- 0.0 = completely wrong or irrelevant
- 0.5 = partially correct but missing key details
- 1.0 = fully correct and complete

Respond in this exact JSON format:
{"score": <number>, "reasoning": "<brief explanation>"}`;

	const data = await openrouter.chat.send({
		chatGenerationParams: {
			model: JUDGE_MODEL,
			temperature: TEMPERATURE,
			messages: [
				{ role: "system", content: systemPrompt },
				{ role: "user", content: modelAnswer },
			],
		},
	});
	const content = (data as { choices: Array<{ message: { content: string } }> }).choices[0]?.message?.content ?? "";

	try {
		const jsonMatch = content.match(/\{[\s\S]*\}/);
		if (jsonMatch) {
			const parsed = JSON.parse(jsonMatch[0]) as JudgeResult;
			return {
				score: Math.max(0, Math.min(1, parsed.score)),
				reasoning: parsed.reasoning,
			};
		}
	} catch {
		// Fall through to default
	}

	return { score: 0, reasoning: `Failed to parse judge response: ${content}` };
}

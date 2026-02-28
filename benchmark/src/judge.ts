import { JUDGE_MODEL, OPENROUTER_API_URL, TEMPERATURE } from "./config";
import type { Question } from "./types";

const apiKey = process.env.OPENROUTER_API_KEY;

interface JudgeResult {
	score: number;
	reasoning: string;
}

export async function judgeAnswer(
	question: Question,
	modelAnswer: string,
): Promise<JudgeResult> {
	const prompt = `You are an expert judge evaluating an AI model's answer about Appwrite.

Question: ${question.question}

Reference Answer: ${question.reference ?? question.correctAnswer}

${question.rubric ? `Rubric: ${question.rubric}` : ""}

Model's Answer:
${modelAnswer}

Score the model's answer from 0.0 to 1.0 where:
- 0.0 = completely wrong or irrelevant
- 0.5 = partially correct but missing key details
- 1.0 = fully correct and complete

Respond in this exact JSON format:
{"score": <number>, "reasoning": "<brief explanation>"}`;

	const response = await fetch(OPENROUTER_API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`,
		},
		body: JSON.stringify({
			model: JUDGE_MODEL,
			temperature: TEMPERATURE,
			messages: [{ role: "user", content: prompt }],
		}),
	});

	if (!response.ok) {
		const text = await response.text();
		throw new Error(`Judge API error (${response.status}): ${text}`);
	}

	const data = (await response.json()) as {
		choices: Array<{ message: { content: string } }>;
	};
	const content = data.choices[0]?.message?.content ?? "";

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

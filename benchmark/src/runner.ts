import { OPENROUTER_API_URL, TEMPERATURE } from "./config";
import { judgeAnswer } from "./judge";
import type { ModelConfig, Question, QuestionResult } from "./types";

const apiKey = process.env.OPENROUTER_API_KEY;
if (!apiKey) {
	throw new Error("OPENROUTER_API_KEY environment variable is required");
}

async function callModel(
	model: ModelConfig,
	systemPrompt: string,
	userPrompt: string,
): Promise<string> {
	const response = await fetch(OPENROUTER_API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`,
		},
		body: JSON.stringify({
			model: model.openRouterId,
			temperature: TEMPERATURE,
			messages: [
				...(systemPrompt ? [{ role: "system", content: systemPrompt }] : []),
				{ role: "user", content: userPrompt },
			],
		}),
	});

	if (!response.ok) {
		const text = await response.text();
		throw new Error(`OpenRouter API error (${response.status}): ${text}`);
	}

	const data = (await response.json()) as {
		choices: Array<{ message: { content: string } }>;
	};
	return data.choices[0]?.message?.content ?? "";
}

function extractMCQAnswer(response: string): string {
	const cleaned = response.trim().toUpperCase();

	const patterns = [
		/^([A-D])[.)\s]/,
		/^\(([A-D])\)/,
		/^([A-D])$/,
		/answer[:\s]+([A-D])/i,
		/\b([A-D])\b/,
	];

	for (const pattern of patterns) {
		const match = cleaned.match(pattern);
		if (match) {
			return match[1];
		}
	}

	return cleaned.charAt(0);
}

export interface RunBenchmarkOptions {
	model: ModelConfig;
	questions: Question[];
	systemPrompt: string;
	existingResults: QuestionResult[];
	onQuestionComplete: (result: QuestionResult) => void;
}

const CONCURRENCY_LIMIT = 10;

async function processQuestion(
	question: Question,
	model: ModelConfig,
	systemPrompt: string,
): Promise<QuestionResult> {
	let prompt = question.question;
	if (question.type === "mcq" && question.choices) {
		prompt +=
			"\n\nChoices:\n" +
			question.choices
				.map((c, idx) => `${String.fromCharCode(65 + idx)}. ${c}`)
				.join("\n") +
			"\n\nRespond with only the letter of the correct answer.";
	}

	try {
		const response = await callModel(model, systemPrompt, prompt);

		let correct = false;
		let score = 0;
		let judgeReasoning: string | undefined;

		if (question.type === "mcq") {
			const extracted = extractMCQAnswer(response);
			correct = extracted === question.correctAnswer.toUpperCase();
			score = correct ? 1 : 0;
		} else {
			const judgeResult = await judgeAnswer(question, response);
			score = judgeResult.score;
			correct = score >= 0.5;
			judgeReasoning = judgeResult.reasoning;
		}

		return {
			questionId: question.id,
			category: question.category,
			type: question.type,
			modelAnswer: response,
			correct,
			score,
			judgeReasoning,
		};
	} catch (error) {
		console.error(`    Error (${question.id}): ${error}`);
		return {
			questionId: question.id,
			category: question.category,
			type: question.type,
			modelAnswer: "",
			correct: false,
			score: 0,
			judgeReasoning: `Error: ${error}`,
		};
	}
}

export async function runBenchmark({
	model,
	questions,
	systemPrompt,
	existingResults,
	onQuestionComplete,
}: RunBenchmarkOptions): Promise<QuestionResult[]> {
	const completedIds = new Set(existingResults.map((r) => r.questionId));
	const alreadyDone = existingResults.length;
	const results: QuestionResult[] = [...existingResults];

	const remaining = questions.filter((q) => !completedIds.has(q.id));

	if (remaining.length === 0) {
		console.log(
			`  All ${questions.length} questions already completed, skipping.`,
		);
		return results;
	}

	console.log(
		`  ${alreadyDone}/${questions.length} already done, running ${remaining.length} remaining (concurrency: ${CONCURRENCY_LIMIT})`,
	);

	let completed = 0;
	let running = 0;
	let nextIndex = 0;

	await new Promise<void>((resolveAll) => {
		function startNext() {
			while (running < CONCURRENCY_LIMIT && nextIndex < remaining.length) {
				const idx = nextIndex++;
				const question = remaining[idx];
				running++;

				processQuestion(question, model, systemPrompt).then((result) => {
					running--;
					completed++;
					console.log(
						`  [${alreadyDone + completed}/${questions.length}] ${question.category}/${question.id} (${question.type}) ${result.correct ? "✓" : "✗"}`,
					);
					results.push(result);
					onQuestionComplete(result);

					if (completed === remaining.length) {
						resolveAll();
					} else {
						startNext();
					}
				});
			}
		}

		startNext();
	});

	return results;
}

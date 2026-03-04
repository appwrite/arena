import { OPENROUTER_API_URL, TEMPERATURE } from "./config";
import { judgeAnswer } from "./judge";
import type {
	ChatMessage,
	ModelConfig,
	Question,
	QuestionResult,
	SkillInfo,
	Tool,
	ToolCall,
} from "./types";

const apiKey = process.env.OPENROUTER_API_KEY;
if (!apiKey) {
	throw new Error("OPENROUTER_API_KEY environment variable is required");
}

const MAX_TOOL_ROUNDS = 5;

interface ApiResponse {
	choices: Array<{
		message: {
			content?: string | null;
			tool_calls?: ToolCall[];
		};
	}>;
}

async function callModelRaw(
	model: ModelConfig,
	messages: ChatMessage[],
	tools?: Tool[],
): Promise<ApiResponse> {
	const body: Record<string, unknown> = {
		model: model.openRouterId,
		temperature: TEMPERATURE,
		messages,
	};
	if (tools && tools.length > 0) {
		body.tools = tools;
	}

	const response = await fetch(OPENROUTER_API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`,
		},
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		const text = await response.text();
		throw new Error(`OpenRouter API error (${response.status}): ${text}`);
	}

	return (await response.json()) as ApiResponse;
}

function resolveToolCall(
	toolCall: ToolCall,
	skillsMap: Map<string, SkillInfo>,
): string {
	try {
		const args = JSON.parse(toolCall.function.arguments);
		const skillName = args.skill_name as string;
		const skill = skillsMap.get(skillName);
		if (skill) {
			return skill.content;
		}
		return `Error: Unknown skill "${skillName}". Available: ${[...skillsMap.keys()].join(", ")}`;
	} catch {
		return `Error: Could not parse tool arguments: ${toolCall.function.arguments}`;
	}
}

function truncate(str: string, max: number): string {
	return str.length > max ? `${str.slice(0, max)}... (${str.length} chars)` : str;
}

function debugLog(label: string, data: unknown): void {
	const sep = "─".repeat(60);
	console.log(`\n${sep}`);
	console.log(`[DEBUG] ${label}`);
	console.log(sep);
	if (typeof data === "string") {
		console.log(data);
	} else {
		console.log(JSON.stringify(data, null, 2));
	}
}

function debugMessages(messages: ChatMessage[]): void {
	for (const msg of messages) {
		if (msg.role === "system") {
			debugLog("SYSTEM PROMPT", truncate(msg.content ?? "", 200));
		} else if (msg.role === "user") {
			debugLog("USER", msg.content ?? "");
		} else if (msg.role === "tool") {
			debugLog(`TOOL RESULT (call ${msg.tool_call_id})`, truncate(msg.content ?? "", 300));
		}
	}
}

async function callModel(
	model: ModelConfig,
	systemPrompt: string,
	userPrompt: string,
	tools?: Tool[],
	skillsMap?: Map<string, SkillInfo>,
	debug?: boolean,
): Promise<string> {
	const messages: ChatMessage[] = [
		...(systemPrompt ? [{ role: "system" as const, content: systemPrompt }] : []),
		{ role: "user" as const, content: userPrompt },
	];

	if (debug) {
		debugLog("REQUEST → " + model.name, "");
		debugMessages(messages);
		if (tools) {
			debugLog("TOOLS", tools.map(t => ({
				name: t.function.name,
				description: t.function.description,
				parameters: t.function.parameters,
			})));
		}
	}

	for (let round = 0; round < MAX_TOOL_ROUNDS; round++) {
		const data = await callModelRaw(model, messages, tools);
		const msg = data.choices[0]?.message;
		if (!msg) return "";

		// If no tool calls, return the text content
		if (!msg.tool_calls || msg.tool_calls.length === 0) {
			if (debug) {
				debugLog("RESPONSE ← (final text)", truncate(msg.content ?? "", 500));
			}
			return msg.content ?? "";
		}

		if (debug) {
			debugLog(`RESPONSE ← (round ${round + 1}, ${msg.tool_calls.length} tool call(s))`, {
				content: msg.content ? truncate(msg.content, 200) : null,
				tool_calls: msg.tool_calls.map(tc => ({
					id: tc.id,
					function: tc.function.name,
					arguments: tc.function.arguments,
				})),
			});
		}

		// Model wants to call tools — need skillsMap to resolve
		if (!skillsMap) {
			return msg.content ?? "";
		}

		// Append assistant message with tool_calls
		messages.push({
			role: "assistant",
			content: msg.content ?? undefined,
			tool_calls: msg.tool_calls,
		});

		// Resolve each tool call and append results
		for (const toolCall of msg.tool_calls) {
			const result = resolveToolCall(toolCall, skillsMap);
			if (debug) {
				debugLog(`TOOL RESOLVE: ${toolCall.function.name}(${toolCall.function.arguments})`, truncate(result, 300));
			}
			messages.push({
				role: "tool",
				tool_call_id: toolCall.id,
				content: result,
			});
		}
	}

	if (debug) {
		debugLog("MAX TOOL ROUNDS REACHED", `Sending final request without tools`);
	}

	// Max rounds exceeded — make one final call without tools to force a text response
	const finalData = await callModelRaw(model, messages);
	const finalContent = finalData.choices[0]?.message?.content ?? "";
	if (debug) {
		debugLog("RESPONSE ← (forced final)", truncate(finalContent, 500));
	}
	return finalContent;
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
	tools?: Tool[];
	skillsMap?: Map<string, SkillInfo>;
	debug?: boolean;
	onQuestionComplete: (result: QuestionResult) => void;
}

const CONCURRENCY_LIMIT = 5;

async function processQuestion(
	question: Question,
	model: ModelConfig,
	systemPrompt: string,
	tools?: Tool[],
	skillsMap?: Map<string, SkillInfo>,
	debug?: boolean,
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
		const response = await callModel(model, systemPrompt, prompt, tools, skillsMap, debug);

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
	tools,
	skillsMap,
	debug,
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

				processQuestion(question, model, systemPrompt, tools, skillsMap, debug).then((result) => {
					running--;
					completed++;
					const isBadMcq = question.type === "mcq" && !/^[A-Da-d]$/.test(result.modelAnswer.trim());
					if (result.modelAnswer === "" || isBadMcq) {
						console.log(
							`  [${alreadyDone + completed}/${questions.length}] ${question.category}/${question.id} (${question.type}) ${isBadMcq ? "INVALID MCQ ANSWER" : "ERROR"} — skipping`,
						);
					} else {
						console.log(
							`  [${alreadyDone + completed}/${questions.length}] ${question.category}/${question.id} (${question.type}) ${result.correct ? "✓" : "✗"}`,
						);
						results.push(result);
						onQuestionComplete(result);
					}

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

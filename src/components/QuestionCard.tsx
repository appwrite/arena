import { Check, ChevronDown, X } from "lucide-react";
import { useState } from "react";
import { getScoreClass } from "#/lib/colors";
import type { QuestionDetail } from "#/lib/types";

interface QuestionCardProps {
	detail: QuestionDetail;
}

const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H"];

export default function QuestionCard({ detail }: QuestionCardProps) {
	const [open, setOpen] = useState(false);
	const [renderContent, setRenderContent] = useState(false);
	const isMcq = detail.type === "mcq";
	const isFail = detail.modelAnswer === "FAIL";
	const scorePercent = Math.round(detail.score * 100);
	const scoreClass = getScoreClass(scorePercent);

	function toggle() {
		if (!open) {
			if (renderContent) {
				setOpen(true);
			} else {
				setRenderContent(true);
				requestAnimationFrame(() => {
					requestAnimationFrame(() => {
						setOpen(true);
					});
				});
			}
		} else {
			setOpen(false);
		}
	}

	function handleTransitionEnd(e: React.TransitionEvent) {
		if (e.propertyName === "grid-template-rows" && !open) {
			setRenderContent(false);
		}
	}

	return (
		<div className="arena-card overflow-hidden">
			<button
				type="button"
				onClick={toggle}
				className="flex w-full cursor-pointer items-center gap-3 border-none bg-transparent p-4 text-left transition hover:bg-[var(--link-bg-hover)] md:px-5 md:py-4"
			>
				<span className="flex shrink-0 items-center">
					{isFail ? (
						<X size={14} className="text-[#FF453A]" />
					) : isMcq ? (
						detail.correct ? (
							<Check size={14} className="text-[#85DBD8]" />
						) : (
							<X size={14} className="text-[#FF453A]" />
						)
					) : (
						<span className={`${scoreClass} rounded-md px-1.5 py-0.5 text-xs`}>
							{scorePercent}%
						</span>
					)}
				</span>
				<p className="min-w-0 flex-1 truncate text-sm text-[var(--text-primary)]">
					{detail.question}
				</p>
				<ChevronDown
					size={16}
					className={`shrink-0 text-[var(--text-secondary)] transition-transform ${open ? "rotate-180" : ""}`}
				/>
			</button>

			<div
				className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
				onTransitionEnd={handleTransitionEnd}
			>
				<div className="overflow-hidden">
					{renderContent && (
						<div className="border-t border-[var(--line-subtle)] p-4 md:p-5">
							{isMcq && detail.choices ? (
								<McqChoices detail={detail} />
							) : (
								<FreeFormAnswer detail={detail} />
							)}
							{isFail && (
								<div className="mt-3 rounded-md border border-[#FF453A]/30 bg-[#FF453A]/8 px-3 py-2">
									<p className="text-xs text-[#FF453A]">
										Model failed to produce an answer.
										{detail.modComment && (
											<span>
												{" "}
												Moderator note:{" "}
												<span className="font-bold">{detail.modComment}</span>
											</span>
										)}
									</p>
								</div>
							)}
							<QuestionStats detail={detail} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

function McqChoices({ detail }: { detail: QuestionDetail }) {
	const correctIndex = detail.correctAnswer.charCodeAt(0) - 65;
	const modelIndex = detail.modelAnswer.trim().charCodeAt(0) - 65;

	return (
		<ul className="space-y-1.5">
			{detail.choices?.map((choice, i) => {
				const isCorrect = i === correctIndex;
				const isModelPick = i === modelIndex;
				const isWrongPick = isModelPick && !isCorrect;

				let cls = "border-transparent bg-transparent";
				if (isCorrect && isModelPick)
					cls = "border-[#85DBD8]/30 bg-[#85DBD8]/8";
				else if (isCorrect)
					cls = "border-[var(--line)] bg-[rgba(255,255,255,0.03)]";
				else if (isWrongPick) cls = "border-[#FF453A]/30 bg-[#FF453A]/8";

				return (
					<li
						key={LETTERS[i]}
						className={`flex items-start gap-2 rounded-md border px-3 py-2 text-sm ${cls}`}
					>
						<span className="mt-px shrink-0 font-medium text-[var(--text-secondary)]">
							{LETTERS[i]}.
						</span>
						<span className="text-[var(--text-primary)]">{choice}</span>
						{isCorrect && (
							<Check
								size={14}
								className={`ml-auto mt-0.5 shrink-0 ${isModelPick ? "text-[#85DBD8]" : "text-[var(--text-secondary)]"}`}
							/>
						)}
						{isWrongPick && (
							<X size={14} className="ml-auto mt-0.5 shrink-0 text-[#FF453A]" />
						)}
					</li>
				);
			})}
		</ul>
	);
}

function formatDuration(ms: number): string {
	if (ms < 1000) return `${ms}ms`;
	return `${(ms / 1000).toFixed(1)}s`;
}

function formatCost(cost: number): string {
	if (cost < 0.0001) return `<$0.0001`;
	return `$${cost.toFixed(4)}`;
}

function QuestionStats({ detail }: { detail: QuestionDetail }) {
	const hasStats =
		detail.promptTokens != null ||
		detail.completionTokens != null ||
		detail.durationMs != null ||
		detail.cost != null ||
		detail.toolCallCount != null;

	if (!hasStats) return null;

	const items: { label: string; value: string }[] = [];

	if (detail.promptTokens != null)
		items.push({
			label: "Input",
			value: `${detail.promptTokens.toLocaleString()} tokens`,
		});
	if (detail.completionTokens != null)
		items.push({
			label: "Output",
			value: `${detail.completionTokens.toLocaleString()} tokens`,
		});
	if (detail.durationMs != null)
		items.push({ label: "Duration", value: formatDuration(detail.durationMs) });
	if (detail.tokensPerSecond != null && detail.tokensPerSecond > 0)
		items.push({
			label: "Speed",
			value: `${detail.tokensPerSecond.toFixed(1)} tok/s`,
		});
	if (detail.cost != null)
		items.push({ label: "Cost", value: formatCost(detail.cost) });
	if (detail.toolCallCount != null)
		items.push({
			label: "Tool calls",
			value: `${detail.toolCallCount}`,
		});

	return (
		<div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 border-t border-[var(--line-subtle)] pt-3">
			{items.map((item) => (
				<span key={item.label} className="text-xs text-[var(--text-secondary)]">
					<span className="font-medium text-[var(--text-secondary)]">
						{item.label}:
					</span>{" "}
					{item.value}
				</span>
			))}
		</div>
	);
}

function FreeFormAnswer({ detail }: { detail: QuestionDetail }) {
	return (
		<div className="space-y-3">
			{detail.rubric && (
				<div>
					<span className="text-xs font-medium text-[var(--text-primary)]">
						Rubric
					</span>
					<p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
						{detail.rubric}
					</p>
				</div>
			)}

			<div>
				<span className="text-xs font-medium text-[var(--text-primary)]">
					Reference answer
				</span>
				<p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
					{detail.correctAnswer}
				</p>
			</div>

			<div>
				<span className="text-xs font-medium text-[var(--text-primary)]">
					Model answer
				</span>
				<div className="mt-2 max-h-[400px] overflow-y-auto rounded-md border border-[var(--line-subtle)] bg-[rgba(255,255,255,0.02)] p-3">
					<p className="whitespace-pre-wrap text-xs leading-relaxed text-[var(--text-primary)]">
						{detail.modelAnswer}
					</p>
				</div>
			</div>

			{detail.judgeReasoning && (
				<div>
					<span className="text-xs font-medium text-[var(--text-primary)]">
						Judge reasoning
					</span>
					<p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">
						{detail.judgeReasoning}
					</p>
				</div>
			)}
		</div>
	);
}

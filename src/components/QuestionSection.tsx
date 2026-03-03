import type { QuestionDetail } from "#/lib/types";
import QuestionCard from "./QuestionCard";

interface QuestionSectionProps {
	category: string;
	questions: QuestionDetail[];
}

export default function QuestionSection({
	category,
	questions,
}: QuestionSectionProps) {
	if (questions.length === 0) return null;

	const mcq = questions.filter((q) => q.type === "mcq");
	const freeform = questions.filter((q) => q.type === "free-form");

	return (
		<section id={category} className="mb-10">
			{mcq.length > 0 && (
				<TypeGroup
					label="Deterministic"
					subtitle={`${mcq.filter((q) => q.correct).length}/${mcq.length} correct`}
					questions={mcq}
				/>
			)}

			{freeform.length > 0 && (
				<TypeGroup
					label="AI-Judged"
					subtitle={`${Math.round((freeform.reduce((s, q) => s + q.score, 0) / freeform.length) * 100)}% average score`}
					questions={freeform}
				/>
			)}
		</section>
	);
}

function TypeGroup({
	label,
	subtitle,
	questions,
}: {
	label: string;
	subtitle: string;
	questions: QuestionDetail[];
}) {
	return (
		<div className="mb-5 last:mb-0">
			<div className="mb-2">
				<span className="text-sm font-medium text-[var(--text-primary)]">
					{label}
				</span>
				<span className="ml-2 text-xs text-[var(--text-secondary)]">
					{subtitle}
				</span>
			</div>
			<div className="grid gap-2">
				{questions.map((q) => (
					<QuestionCard key={q.questionId} detail={q} />
				))}
			</div>
		</div>
	);
}

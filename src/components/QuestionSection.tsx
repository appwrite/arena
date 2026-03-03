import type { QuestionDetail } from "#/lib/types";
import { CATEGORY_DESCRIPTIONS, CATEGORY_LABELS } from "#/lib/types";
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
		<section id={category} className="mb-10 scroll-mt-20">
			<div className="sticky top-[4.125rem] z-20 bg-[var(--bg-base)] pb-4 pt-4">
				<h3 className="group font-heading text-xl font-normal tracking-[-2.2%] text-[var(--text-primary)] md:text-2xl">
					<a href={`#${category}`} className="hover:underline">
						{CATEGORY_LABELS[category] ?? category}
						<span className="ml-2 text-[var(--text-secondary)] opacity-0 transition-opacity group-hover:opacity-100">
							#
						</span>
					</a>
				</h3>
				{CATEGORY_DESCRIPTIONS[category] && (
					<p className="mt-1 text-sm text-[var(--text-secondary)]">
						{CATEGORY_DESCRIPTIONS[category]}
					</p>
				)}
			</div>

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
			<div className="sticky top-[9.625rem] z-10 mb-2 bg-[var(--bg-base)] py-2">
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

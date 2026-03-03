import { Check, X } from "lucide-react";

interface ScoringApproachProps {
	mcqCount: number;
	freeformCount: number;
}

export default function ScoringApproach({
	mcqCount,
	freeformCount,
}: ScoringApproachProps) {
	return (
		<section className="rise-in border-b border-[var(--line)] px-4 py-14 md:py-20">
			<div className="arena-container">
				<h2 className="mb-4 text-center font-heading text-2xl font-semibold tracking-[-0.5%] text-[var(--text-primary)] md:text-3xl">
				Fair and predictable scoring
				</h2>
				<p className="mx-auto mb-12 max-w-lg text-center text-sm leading-relaxed text-[var(--text-secondary)]">
					We combine two scoring methods to measure both factual accuracy and
					the quality of open-ended explanations.
				</p>
				<div className="mx-auto max-w-4xl grid grid-cols-1 gap-5 md:grid-cols-2">
					<div className="arena-card flex flex-col gap-4 p-6">
						<h3 className="font-heading text-lg font-semibold text-[var(--text-primary)]">
							Deterministic (MCQ)
						</h3>
						<p className="text-sm leading-relaxed text-[var(--text-secondary)]">
							{mcqCount} multiple-choice questions with a single correct answer.
							The model picks A, B, C, or D — it's either right or wrong.
						</p>
						<ul className="flex flex-col gap-2 text-sm">
							<ProItem>Fully reproducible across runs</ProItem>
							<ProItem>No judge bias or variance</ProItem>
							<ConItem>Limited to factual recall</ConItem>
						</ul>
					</div>
					<div className="arena-card flex flex-col gap-4 p-6">
						<h3 className="font-heading text-lg font-semibold text-[var(--text-primary)]">
							AI-Judged (Open-ended)
						</h3>
						<p className="text-sm leading-relaxed text-[var(--text-secondary)]">
							{freeformCount} open-ended questions scored between 0 and 1 by a separate AI judge
							using a rubric and reference answer.
						</p>
						<ul className="flex flex-col gap-2 text-sm">
							<ProItem>Tests reasoning and explanation quality</ProItem>
							<ProItem>Closer to real-world usage</ProItem>
							<ConItem>Scores may vary slightly between runs</ConItem>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}

function ProItem({ children }: { children: React.ReactNode }) {
	return (
		<li className="flex items-start gap-2 text-[var(--text-secondary)]">
			<Check
				size={14}
				className="mt-0.5 shrink-0 text-[var(--score-high)]"
				aria-hidden
			/>
			{children}
		</li>
	);
}

function ConItem({ children }: { children: React.ReactNode }) {
	return (
		<li className="flex items-start gap-2 text-[var(--text-secondary)]">
			<X
				size={14}
				className="mt-0.5 shrink-0 text-[var(--score-low)]"
				aria-hidden
			/>
			{children}
		</li>
	);
}

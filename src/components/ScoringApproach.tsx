interface ScoringApproachProps {
	mcqCount: number;
	freeformCount: number;
}

export default function ScoringApproach({
	mcqCount,
	freeformCount,
}: ScoringApproachProps) {
	return (
		<section className="rise-in px-4 py-20 md:py-28">
			<div className="arena-container">
				<span className="mb-4 inline-flex mx-auto justify-center w-full">
					<span className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1 text-xs font-medium text-[var(--text-primary)]">
						Scoring methods
					</span>
				</span>
				<h2 className="mb-4 text-center font-heading text-3xl font-normal tracking-[-2%] text-[var(--text-primary)] md:text-4xl">
					Fair and predictable scoring
				</h2>
				<p className="mx-auto mb-14 max-w-lg text-center text-base font-medium leading-relaxed tracking-[-1.4%] text-[var(--text-secondary)]">
					We score every answer twice, once for accuracy, once for quality.
				</p>
				<div className="mx-auto flex flex-col md:flex-row md:items-stretch md:justify-center">
					<div className="flex flex-col items-center gap-2 px-8 py-5 text-center md:w-[450px] md:py-0">
						<h3 className="font-heading text-lg font-normal tracking-[-2%] text-[var(--text-primary)]">
							Deterministic (MCQ)
						</h3>
						<p className="text-sm leading-relaxed tracking-[-1.4%] text-[#ADADB0]">
							Each model answers{" "}
							<span className="font-medium text-[var(--text-primary)]">
								{mcqCount} multiple-choice questions
							</span>
							, one correct answer, no room for interpretation.
						</p>
						<div className="mt-2 flex flex-wrap justify-center gap-2">
							<Pill variant="pro">Fully reproducible</Pill>
							<Pill variant="pro">No judge bias</Pill>
							<Pill variant="con">Factual recall only</Pill>
						</div>
					</div>
					<div className="mx-8 h-px shrink-0 bg-gradient-to-r from-transparent via-[var(--line)] to-transparent md:mx-0 md:h-auto md:w-px md:self-stretch md:bg-gradient-to-b" />
					<div className="flex flex-col items-center gap-2 px-8 py-5 text-center md:w-[450px] md:py-0">
						<h3 className="font-heading text-lg font-normal tracking-[-2%] text-[var(--text-primary)]">
							AI-Judged (Open-ended)
						</h3>
						<p className="text-sm leading-relaxed tracking-[-1.4%] text-[#ADADB0]">
							<span className="font-medium text-[var(--text-primary)]">
								{freeformCount} open-ended questions
							</span>{" "}
							scored 0–1 by an{" "}
							<span className="font-medium text-[var(--text-primary)]">
								AI judge
							</span>{" "}
							against a rubric and reference answer.
						</p>
						<div className="mt-2 flex flex-wrap justify-center gap-2">
							<Pill variant="pro">Tests reasoning</Pill>
							<Pill variant="pro">Real-world usage</Pill>
							<Pill variant="con">Slight variance</Pill>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

function Pill({
	variant,
	children,
}: {
	variant: "pro" | "con";
	children: React.ReactNode;
}) {
	const colors =
		variant === "pro"
			? "border-[var(--score-high)]/20 text-[var(--score-high)]"
			: "border-[var(--score-low)]/20 text-[var(--score-low)]";
	return (
		<span
			className={`rounded-full border px-3 py-1 text-xs font-medium ${colors}`}
		>
			{children}
		</span>
	);
}

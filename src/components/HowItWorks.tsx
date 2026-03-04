import type { ReactNode } from "react";

interface HowItWorksProps {
	modelCount: number;
	questionCount: number;
	categoryCount: number;
}

export default function HowItWorks({
	modelCount,
	questionCount,
	categoryCount,
}: HowItWorksProps) {
	const steps: { title: string; description: ReactNode }[] = [
		{
			title: "Ask",
			description: (
				<>
					We ask each model{" "}
					<span className="font-medium text-[var(--text-primary)]">
						{questionCount} questions
					</span>{" "}
					across{" "}
					<span className="font-medium text-[var(--text-primary)]">
						{categoryCount} Appwrite services
					</span>
					, to help showcase impact AI can have on your project.
				</>
			),
		},
		{
			title: "Answer",
			description: (
				<>
					<span className="font-medium text-[var(--text-primary)]">
						{modelCount} models
					</span>{" "}
					respond with and without Appwrite docs, so we test both raw knowledge
					and assisted intelligence.
				</>
			),
		},
		{
			title: "Score",
			description: (
				<>
					Answers are scored{" "}
					<span className="font-medium text-[var(--text-primary)]">
						deterministically
					</span>{" "}
					using multi-choice and by an{" "}
					<span className="font-medium text-[var(--text-primary)]">
						AI judge
					</span>{" "}
					for open-ended questions.
				</>
			),
		},
	];

	return (
		<section
			id="how-it-works"
			className="rise-in scroll-mt-20 px-4 py-14 md:py-20"
		>
			<div className="arena-container">
				<div className="mx-auto mb-10 h-px w-full max-w-xs bg-gradient-to-r from-transparent via-[var(--line)] to-transparent md:mb-14" />
				<div className="flex flex-col gap-0 md:flex-row md:items-start md:gap-0">
					{steps.map((step, i) => (
						<div key={step.title} className="flex flex-1 flex-col md:flex-row">
							<div className="flex flex-col items-center gap-2 px-8 py-5 text-center md:py-0">
								<h3 className="font-heading text-lg font-normal tracking-[-2.2%] text-[var(--text-primary)]">
									{step.title}
								</h3>
								<p className="text-sm leading-relaxed tracking-[-1.4%] text-[#ADADB0]">
									{step.description}
								</p>
							</div>
							{i < steps.length - 1 && (
								<div className="mx-8 h-px shrink-0 bg-gradient-to-r from-transparent via-[var(--line)] to-transparent md:mx-0 md:h-auto md:w-px md:self-stretch md:bg-gradient-to-b" />
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

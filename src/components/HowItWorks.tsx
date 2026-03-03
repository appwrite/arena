import { BarChart3, Bot, MessageSquare } from "lucide-react";

interface HowItWorksProps {
	questionCount: number;
}

export default function HowItWorks({ questionCount }: HowItWorksProps) {
	const steps = [
		{
			icon: MessageSquare,
			title: "Ask",
			description: `We ask each model ${questionCount} questions across 9 Appwrite services, to help showcase impact AI can have on your project.`,
		},
		{
			icon: Bot,
			title: "Answer",
			description:
				"Models respond with and without Appwrite docs, so we test both raw knowledge and assisted intelligence.",
		},
		{
			icon: BarChart3,
			title: "Score",
			description:
				"Answers are scored deterministically using multi-choice and by an AI judge for open-ended questions.",
		},
	];
	return (
		<section
			id="how-it-works"
			className="rise-in scroll-mt-20 px-4 py-14 md:py-20"
		>
			<div className="arena-container">
				<h2 className="mb-4 text-center font-heading text-2xl font-normal tracking-[-2.2%] text-[var(--text-primary)] md:text-3xl">
					How it works
				</h2>
				<p className="mx-auto mb-12 max-w-lg text-center text-sm leading-relaxed text-[var(--text-secondary)]">
					Every model goes through the same three-step process so results are
					deterministic, and directly comparable.
				</p>
				<div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
					{steps.map((step) => (
						<div
							key={step.title}
							className="flex flex-col items-center gap-4 text-center"
						>
							<div className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--line)] bg-[var(--surface)]">
								<step.icon
									size={24}
									className="text-[var(--text-secondary)]"
									aria-hidden
								/>
							</div>
							<h3 className="font-heading text-lg font-normal tracking-[-2.2%] text-[var(--text-primary)]">
								{step.title}
							</h3>
							<p className="max-w-xs text-sm leading-relaxed text-[var(--text-secondary)]">
								{step.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

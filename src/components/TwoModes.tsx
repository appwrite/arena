import { BookOpen, Brain } from "lucide-react";

export default function TwoModes() {
	return (
		<section className="rise-in px-4 py-14 md:py-20">
			<div className="arena-container max-w-3xl">
				<h2 className="mb-4 text-center font-heading text-2xl font-normal tracking-[-2.2%] text-[var(--text-primary)] md:text-3xl">
					Two evaluation modes
				</h2>
				<p className="mx-auto mb-12 max-w-lg text-center text-sm leading-relaxed text-[var(--text-secondary)]">
					We run every model through the same questions twice — once with
					documentation, once without — so you can see how much context actually
					helps.
				</p>

				<div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
					<div className="flex flex-col gap-3">
						<div className="flex items-center gap-3">
							<BookOpen
								size={20}
								className="shrink-0 text-[var(--text-secondary)]"
								aria-hidden
							/>
							<h3 className="font-heading text-lg font-normal tracking-[-2.2%] text-[var(--text-primary)]">
								With Skills.md
							</h3>
						</div>
						<p className="text-sm leading-relaxed text-[var(--text-secondary)]">
							The model receives Appwrite documentation as context, simulating a
							developer with access to the latest docs. This is closest to how
							AI coding assistants work in practice — with RAG, tool use, or
							injected knowledge.
						</p>
						<p className="text-xs leading-relaxed text-[var(--text-secondary)]">
							<span className="font-medium text-[var(--text-primary)]">
								Use case:
							</span>{" "}
							Evaluating models for AI-powered dev tools, chatbots, or agents
							that have access to your documentation.
						</p>
					</div>

					<div className="flex flex-col gap-3">
						<div className="flex items-center gap-3">
							<Brain
								size={20}
								className="shrink-0 text-[var(--text-secondary)]"
								aria-hidden
							/>
							<h3 className="font-heading text-lg font-normal tracking-[-2.2%] text-[var(--text-primary)]">
								Without Skills.md
							</h3>
						</div>
						<p className="text-sm leading-relaxed text-[var(--text-secondary)]">
							No documentation provided — answers come purely from the model's
							training data and built-in knowledge. This tests what the model
							learned about Appwrite during pre-training.
						</p>
						<p className="text-xs leading-relaxed text-[var(--text-secondary)]">
							<span className="font-medium text-[var(--text-primary)]">
								Use case:
							</span>{" "}
							Picking a base model for general coding tasks where you won't
							always have docs available, like quick terminal questions or code
							reviews.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

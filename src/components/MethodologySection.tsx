/**
 * Methodology: copy tells a single story from setup → questions → scoring → what you see.
 */

const REPO = "https://github.com/appwrite/arena";
const BENCH = `${REPO}/tree/main/benchmark`;

const CATEGORIES: { id: string; description: string }[] = [
	{ id: "fundamental", description: "SDKs, permissions, projects" },
	{ id: "auth", description: "Users, OAuth, MFA, sessions" },
	{ id: "databases", description: "Collections, documents, queries" },
	{ id: "functions", description: "Serverless, runtimes, triggers" },
	{ id: "storage", description: "Buckets, uploads, previews" },
	{ id: "sites", description: "Static hosting, Git deploy" },
	{ id: "messaging", description: "Email, SMS, push" },
	{ id: "realtime", description: "WebSocket, channels" },
	{ id: "cli", description: "CLI, init, deploy" },
];

export default function MethodologySection() {
	return (
		<div className="methodology-sections" aria-labelledby="methodology-heading">
			<h2
				id="methodology-heading"
				className="mb-3 font-heading text-2xl font-semibold tracking-[-0.5%] text-[var(--text-primary)] md:text-3xl"
			>
				Methodology
			</h2>
			<p className="methodology-prose mb-16 max-w-[560px] text-[var(--text-secondary)] leading-relaxed">
				We wanted to know which models actually understand Appwrite - so we built a benchmark. Below is the story of how it works: how we set it up, what we ask, how we score, and what the numbers on the leaderboard mean. Everything is open source; you can explore the{" "}
				<a href={BENCH}>benchmark suite</a> or use the links to jump to the code.
			</p>

			{/* Evaluation modes */}
			<section
				className="mb-16"
				aria-labelledby="methodology-evaluation-heading"
			>
				<h3
					id="methodology-evaluation-heading"
					className="mb-4 font-heading text-base font-semibold text-[var(--text-primary)] md:text-lg"
				>
					We run each model in two modes
				</h3>
				<p className="methodology-prose mb-5 text-sm text-[var(--text-secondary)] leading-relaxed">
					First, we choose the setup. We ask the same 70 questions in both modes - through{" "}
					<a href="https://openrouter.ai">OpenRouter</a>, with temperature at zero so runs are reproducible - but we change what the model has to work with. That way you can see both “does it already know Appwrite?” and “can it use the docs we give it?”
				</p>
				<div className="grid gap-5 md:grid-cols-2">
					<div className="arena-card flex flex-col gap-2 p-5">
						<h4 className="font-heading text-sm font-semibold text-[var(--text-primary)]">
							With skills
						</h4>
						<p className="text-sm text-[var(--text-secondary)] leading-snug">
							We give the model Appwrite docs to work with - pulled from{" "}
							<a href="https://github.com/appwrite/agent-skills">agent-skills</a> - so it’s like having an assistant that’s read the latest docs.
						</p>
						<p className="methodology-prose mt-1 text-xs text-[var(--text-secondary)]">
							In the repo: how we load and inject them{" "}
							<a href={`${REPO}/blob/main/benchmark/src/index.ts`}>here</a>.
						</p>
					</div>
					<div className="arena-card flex flex-col gap-2 p-5">
						<h4 className="font-heading text-sm font-semibold text-[var(--text-primary)]">
							Without skills
						</h4>
						<p className="text-sm text-[var(--text-secondary)] leading-snug">
							No docs - just a short “you’re an Appwrite expert” style prompt. Answers come only from what the model already knows.
						</p>
					</div>
				</div>
			</section>

			{/* Question set and categories */}
			<section
				className="mb-16"
				aria-labelledby="methodology-questions-heading"
			>
				<h3
					id="methodology-questions-heading"
					className="mb-4 font-heading text-base font-semibold text-[var(--text-primary)] md:text-lg"
				>
					Then we ask 70 questions across Appwrite
				</h3>
				<p className="methodology-prose mb-6 text-sm text-[var(--text-secondary)] leading-relaxed">
					We needed something concrete to ask. So we wrote 70 questions and grouped them by the parts of Appwrite that matter when you’re building: auth, databases, functions, storage, and the rest. Each question has a clear right answer; multiple-choice ones have options, and open-ended ones have a rubric so we can score them fairly. You can{" "}
					<a href={`${REPO}/tree/main/benchmark/src/questions`}>browse them in the repo</a>.
				</p>
				<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{CATEGORIES.map(({ id, description }) => (
						<div
							key={id}
							className="flex flex-col gap-1.5 rounded-xl border border-[var(--line-subtle)] bg-[var(--surface)] px-4 py-3"
						>
							<span className="font-mono text-sm font-medium text-[var(--accent)]">
								{id}
							</span>
							<span className="text-sm text-[var(--text-secondary)] leading-snug">
								{description}
							</span>
						</div>
					))}
				</div>
			</section>

			{/* Scoring */}
			<section
				className="mb-16"
				aria-labelledby="methodology-scoring-heading"
			>
				<h3
					id="methodology-scoring-heading"
					className="mb-4 font-heading text-base font-semibold text-[var(--text-primary)] md:text-lg"
				>
					We score the answers in two ways
				</h3>
				<p className="methodology-prose mb-5 text-sm text-[var(--text-secondary)] leading-relaxed">
					Once we have answers, we need to score them. For multiple-choice it’s straightforward; for open-ended we needed a fair, consistent way - so we use a separate AI judge. Both feed into the same leaderboard.
				</p>
				<div className="grid gap-5 md:grid-cols-2">
					<div className="arena-card flex flex-col gap-2 p-5">
						<h4 className="font-heading text-sm font-semibold text-[var(--text-primary)]">
							Multiple-choice
						</h4>
						<p className="text-sm text-[var(--text-secondary)] leading-snug">
							We take the letter the model gives (A, B, C, or D) and check it against the correct answer. No judge - it’s either right or wrong, so these results are fully reproducible.
						</p>
						<p className="methodology-prose mt-1 text-xs text-[var(--text-secondary)]">
							How we parse the answer: <a href={`${REPO}/blob/main/benchmark/src/runner.ts`}>runner</a>.
						</p>
					</div>
					<div className="arena-card flex flex-col gap-2 p-5">
						<h4 className="font-heading text-sm font-semibold text-[var(--text-primary)]">
							Open-ended
						</h4>
						<p className="text-sm text-[var(--text-secondary)] leading-snug">
							We send the model’s answer to a separate AI judge, along with the reference answer and a rubric. The judge returns a score from 0 to 1; we treat 0.5 and above as “correct.”
						</p>
						<p className="methodology-prose mt-1 text-xs text-[var(--text-secondary)]">
							Judge logic and config: <a href={`${REPO}/blob/main/benchmark/src/judge.ts`}>judge</a>, <a href={`${REPO}/blob/main/benchmark/src/config.ts`}>config</a>.
						</p>
					</div>
				</div>
			</section>

			{/* Aggregation and metrics */}
			<section
				className="mb-16"
				aria-labelledby="methodology-aggregation-heading"
			>
				<h3
					id="methodology-aggregation-heading"
					className="mb-4 font-heading text-base font-semibold text-[var(--text-primary)] md:text-lg"
				>
					Those scores become the numbers you see
				</h3>
				<p className="methodology-prose mb-4 text-sm text-[var(--text-secondary)] leading-relaxed">
					We average scores per category and overall, and count how many questions each model got right. That’s what the leaderboard shows. You can filter to see only multiple-choice (“Deterministic”) or only open-ended (“AI-Judged”) if you want to compare one kind of question at a time.
				</p>
				<div className="grid gap-5 sm:grid-cols-3">
					<div className="flex flex-col gap-2 rounded-xl border border-[var(--line-subtle)] bg-[var(--surface)] px-5 py-4">
						<p className="text-sm font-medium text-[var(--text-primary)]">Per-category</p>
						<p className="text-sm text-[var(--text-secondary)] leading-relaxed">Average score in that area (respects the filter you pick)</p>
					</div>
					<div className="flex flex-col gap-2 rounded-xl border border-[var(--line-subtle)] bg-[var(--surface)] px-5 py-4">
						<p className="text-sm font-medium text-[var(--text-primary)]">Overall</p>
						<p className="text-sm text-[var(--text-secondary)] leading-relaxed">Average across all questions, or just MCQ / just open-ended</p>
					</div>
					<div className="flex flex-col gap-2 rounded-xl border border-[var(--line-subtle)] bg-[var(--surface)] px-5 py-4">
						<p className="text-sm font-medium text-[var(--text-primary)]">Total correct</p>
						<p className="text-sm text-[var(--text-secondary)] leading-relaxed">How many the model got right (MCQ: exact match; open-ended: score ≥ 0.5)</p>
					</div>
				</div>
				<p className="methodology-prose mt-5 text-sm text-[var(--text-secondary)]">
					Category names and labels live in the frontend; see the repo for where they’re defined.
				</p>
			</section>

			{/* Cost */}
			<section
				className="mb-16"
				aria-labelledby="methodology-cost-heading"
			>
				<h3
					id="methodology-cost-heading"
					className="mb-4 font-heading text-base font-semibold text-[var(--text-primary)] md:text-lg"
				>
					We also track cost
				</h3>
				<p className="methodology-prose text-sm text-[var(--text-secondary)] leading-relaxed">
					Besides accuracy, we show what each model costs per million input tokens - using OpenRouter’s latest pricing, refreshed each time we run the benchmark. Completion tokens aren’t included in that number. So you can weigh “how good is it?” against “how much will it cost?” Details in the repo: <a href={`${REPO}/blob/main/benchmark/src/pricing.ts`}>pricing</a>.
				</p>
			</section>

			{/* Reproducibility and limitations */}
			<section
				className="mb-4"
				aria-labelledby="methodology-repro-heading"
			>
				<h3
					id="methodology-repro-heading"
					className="mb-4 font-heading text-base font-semibold text-[var(--text-primary)] md:text-lg"
				>
					If you want to run it yourself or dig deeper
				</h3>
				<p className="methodology-prose mb-3 text-sm text-[var(--text-secondary)] leading-relaxed">
					Multiple-choice results are reproducible: same model, same questions, same scores. Open-ended scores can vary a bit between runs because of the judge. We store results in JSON files; to re-run from scratch, clear those files first and run the benchmark again (see the README).
				</p>
				<p className="text-sm text-[var(--text-secondary)]">
					For full question text, reference answers, rubrics, and every model answer, open the result JSON (look for <code>questionDetails</code>) or a model’s detail page on the leaderboard.
				</p>
			</section>
		</div>
	);
}

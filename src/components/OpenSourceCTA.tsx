import { Github } from "lucide-react";
import githubStars from "#/data/github-stars.json";

function formatStars(count: number): string {
	if (count >= 1000) {
		const k = count / 1000;
		return k % 1 === 0 ? `${k}K` : `${k.toFixed(1)}K`;
	}
	return String(count);
}

export default function OpenSourceCTA() {
	return (
		<section className="rise-in px-4 py-14 md:py-20">
			<div className="arena-container flex flex-col items-center text-center">
				<h2 className="mb-4 font-heading text-2xl font-semibold tracking-[-0.5%] text-[var(--text-primary)] md:text-3xl">
					Fully open source
				</h2>
				<p className="mx-auto mb-12 max-w-lg text-sm leading-relaxed text-[var(--text-secondary)]">
					Every question, answer, rubric, and score is public. Run the benchmark yourself, add models, or contribute new questions.
				</p>
				<a
					href="https://github.com/appwrite/arena"
					target="_blank"
					rel="noreferrer"
					className="inline-flex items-center gap-2.5 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-white no-underline transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
				>
					<Github size={18} aria-hidden />
					Star on GitHub
					<span
						className="rounded-md bg-white/20 px-2 py-0.5 text-xs font-semibold"
					>
						{formatStars(githubStars.stars)}
					</span>
				</a>
			</div>
		</section>
	);
}

import { Github } from "lucide-react";
import type { ReactNode } from "react";

interface HeroSectionProps {
	children?: ReactNode;
}

export default function HeroSection({ children }: HeroSectionProps) {
	return (
		<section
			id="leaderboard"
			className="rise-in scroll-mt-20 border-b border-[var(--line)] px-4 py-16 md:py-24"
		>
			<div className="arena-container flex flex-col items-center gap-10 text-center">
				<div className="flex flex-col items-center gap-5">
					<h1 className="font-heading text-4xl font-semibold tracking-[-1%] leading-tight text-[var(--text-primary)] md:text-5xl md:leading-tight">
						Which AI model knows
						<br />
						<span className="text-[var(--accent)]">Appwrite</span> best?
					</h1>
					<p className="max-w-[520px] text-lg leading-relaxed text-[var(--text-secondary)]">
						An open-source benchmark that tests AI models on real Appwrite
						questions — with and without documentation.
					</p>
					<a
						href="https://github.com/appwrite/arena"
						target="_blank"
						rel="noreferrer"
						className="inline-flex items-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-sm text-[var(--text-secondary)] no-underline transition hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
					>
						<Github size={16} aria-hidden />
						View on GitHub
					</a>
				</div>

				{children && <div className="w-full text-left">{children}</div>}
			</div>
		</section>
	);
}

import { ExternalLink } from "lucide-react";

export default function OpenSourceCTA() {
	return (
		<section className="rise-in relative overflow-hidden px-4 py-28 md:py-40">
			{/* Top gradient divider */}
			<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--line)] to-transparent" />
			{/* Dot grid pattern — fading from bottom */}
			<div
				className="pointer-events-none absolute inset-0"
				style={{
					backgroundImage:
						"radial-gradient(circle, rgba(228,228,231,0.12) 1.2px, transparent 1.2px)",
					backgroundSize: "22px 22px",
					maskImage:
						"linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)",
					WebkitMaskImage:
						"linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)",
				}}
			/>
			<div className="arena-container relative flex flex-col items-center text-center">
				<h2 className="mb-6 font-heading text-4xl font-normal tracking-[-2%] text-[var(--text-primary)] md:text-6xl">
					Fully open source
				</h2>
				<p className="mx-auto mb-10 max-w-md text-base font-medium leading-relaxed tracking-[-1.4%] text-[var(--text-secondary)]">
					Every question, answer, and score is public.
					<br />
					Fork it, run it, improve it.
				</p>
				<a
					href="https://github.com/appwrite/arena"
					target="_blank"
					rel="noreferrer"
					className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-primary)] underline decoration-[var(--line)] underline-offset-4 transition hover:decoration-[var(--text-primary)]"
				>
					View on GitHub
					<ExternalLink size={14} aria-hidden />
				</a>
			</div>
		</section>
	);
}

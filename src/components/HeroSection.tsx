import type { ReactNode } from "react";

interface HeroSectionProps {
	children?: ReactNode;
}

export default function HeroSection({ children }: HeroSectionProps) {
	return (
		// biome-ignore lint/correctness/useUniqueElementIds: static page landmark, only rendered once
		<section
			id="leaderboard"
			className="rise-in relative scroll-mt-20 px-4 pt-12 pb-16 md:pt-20 md:pb-20 overflow-hidden"
		>
			{/* Dot grid pattern */}
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
			<div className="arena-container relative flex flex-col items-center gap-14 text-center">
				<div className="flex flex-col items-center gap-6">
					<span className="inline-flex items-center rounded-full border border-[var(--accent-pink)]/20 bg-[var(--accent-pink)]/5 px-4 py-1.5 text-sm text-[var(--text-primary)]">
						Open-source AI benchmark
					</span>
					<h1 className="font-heading text-5xl font-normal tracking-[-2.2%] leading-[1.1] text-[var(--text-primary)] md:text-6xl">
						Which AI model knows
						<br />
						Appwrite best?
					</h1>
				</div>

				{children && <div className="w-full text-left">{children}</div>}
			</div>

			{/* Divider */}
			<div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--line)] to-transparent" />
		</section>
	);
}

import type { ReactNode } from "react";

interface HeroSectionProps {
	children?: ReactNode;
}

export default function HeroSection({ children }: HeroSectionProps) {
	return (
		<section
			id="leaderboard"
			className="rise-in scroll-mt-20 px-4 py-16 md:py-24"
		>
			<div className="arena-container flex flex-col items-center gap-10 text-center">
				<div className="flex flex-col items-center gap-5">
					<h1 className="font-heading text-4xl font-normal tracking-[-2.2%] leading-[1.15] text-[var(--text-primary)] md:text-5xl">
						Which AI model knows
						<br />
						Appwrite best?
					</h1>
					<p className="max-w-[520px] text-lg leading-[28px] tracking-[-1.4%] text-[var(--text-secondary)]">
						We test leading AI models on real Appwrite questions so you can pick
						the right one for your project.
					</p>
				</div>

				{children && <div className="w-full text-left">{children}</div>}
			</div>
		</section>
	);
}

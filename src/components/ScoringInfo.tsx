import { Info } from "lucide-react";
import { SCORE_THRESHOLD_HIGH, SCORE_THRESHOLD_LOW } from "@/lib/colors";

interface ScoringInfoProps {
	runDate?: string;
}

export default function ScoringInfo({ runDate }: ScoringInfoProps) {
	return (
		<div className="mt-4 ml-1.5 flex flex-col gap-1.5 text-xs text-[var(--text-secondary)] md:flex-row md:text-start text-center items-center">
			{runDate && (
				<div className="flex items-center gap-1.5">
					<span>
						Last update:{" "}
						{new Date(runDate).toLocaleDateString("en-US", {
							month: "short",
							day: "numeric",
							year: "numeric",
						})}
					</span>
					<span className="relative inline-flex cursor-default items-center [&:hover>span]:visible [&:hover>span]:opacity-100">
						<Info size={12} className="opacity-60" />
						<span className="invisible absolute top-full left-0 mt-1.5 whitespace-nowrap rounded-md bg-[var(--surface-strong)] border border-[var(--line)] px-2.5 py-1.5 text-xs text-[var(--text-secondary)] opacity-0 shadow-lg transition">
							Scores combine auto-scored MCQs and AI-judged free-form questions
						</span>
					</span>
				</div>
			)}

			<span className="md:ml-auto text-center md:text-right leading-relaxed">
				Above {SCORE_THRESHOLD_HIGH}% is recommended, below{" "}
				{SCORE_THRESHOLD_LOW}% is not advised
			</span>
		</div>
	);
}

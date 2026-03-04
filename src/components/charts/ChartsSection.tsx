import { useEffect, useState } from "react";
import type { ModelResult } from "#/lib/types";
import CostEfficiencyChart from "./CostEfficiencyChart";
import McqVsFreeformChart from "./McqVsFreeformChart";
import OverallValueChart from "./OverallValueChart";
import RadarPerformance from "./RadarPerformance";
import SkillsComparisonChart from "./SkillsComparisonChart";

interface Props {
	models: ModelResult[];
	withSkillsModels: ModelResult[];
	withoutSkillsModels: ModelResult[];
}

export default function ChartsSection({
	models,
	withSkillsModels,
	withoutSkillsModels,
}: Props) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<section className="rise-in px-4 py-14 md:py-20">
			<div className="arena-container">
				<h2 className="mb-4 text-center font-heading text-2xl font-normal tracking-[-2.2%] text-[var(--text-primary)] md:text-3xl">
					Performance Insights
				</h2>
				<p className="mx-auto mb-12 max-w-lg text-center text-sm leading-relaxed text-[var(--text-secondary)]">
					Visual breakdown of how each model performs across categories, scoring
					types, and cost efficiency.
				</p>

				{mounted ? (
					<>
						<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
							<div className="arena-card p-3 md:p-5">
								<h3 className="mb-4 text-center text-sm font-medium text-[var(--text-secondary)]">
									Category Performance
								</h3>
								<RadarPerformance models={models} />
							</div>
							<div className="arena-card flex flex-col p-3 md:p-5">
								<h3 className="mb-4 text-center text-sm font-medium text-[var(--text-secondary)]">
									Skills Impact on Performance
								</h3>
								<div className="min-h-[300px] flex-1">
									<SkillsComparisonChart
										withSkills={withSkillsModels}
										withoutSkills={withoutSkillsModels}
									/>
								</div>
							</div>
							<div className="arena-card p-3 md:p-5">
								<h3 className="mb-4 text-center text-sm font-medium text-[var(--text-secondary)]">
									Deterministic vs AI-Judged
								</h3>
								<McqVsFreeformChart models={models} />
							</div>
							<div className="arena-card p-3 md:p-5">
								<h3 className="mb-4 text-center text-sm font-medium text-[var(--text-secondary)]">
									Cost per Million Tokens
								</h3>
								<CostEfficiencyChart models={models} />
							</div>
						</div>
						<div className="arena-card mt-5 p-3 md:p-5">
							<h3 className="mb-4 text-center text-sm font-medium text-[var(--text-secondary)]">
								Overall (Cost vs Value)
							</h3>
							<OverallValueChart models={withSkillsModels} />
						</div>
					</>
				) : (
					<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
						<div className="arena-card flex h-[464px] items-center justify-center">
							<span className="text-sm text-[var(--text-secondary)]">
								Loading charts...
							</span>
						</div>
						<div className="arena-card flex h-[364px] items-center justify-center">
							<span className="text-sm text-[var(--text-secondary)]">
								Loading charts...
							</span>
						</div>
						<div className="arena-card flex h-[364px] items-center justify-center">
							<span className="text-sm text-[var(--text-secondary)]">
								Loading charts...
							</span>
						</div>
						<div className="arena-card flex h-[314px] items-center justify-center">
							<span className="text-sm text-[var(--text-secondary)]">
								Loading charts...
							</span>
						</div>
					</div>
				)}
			</div>
		</section>
	);
}

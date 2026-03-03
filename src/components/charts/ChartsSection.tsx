import { useEffect, useState } from "react";
import type { ModelResult } from "#/lib/types";
import CostEfficiencyChart from "./CostEfficiencyChart";
import McqVsFreeformChart from "./McqVsFreeformChart";
import RadarPerformance from "./RadarPerformance";

interface Props {
	models: ModelResult[];
}

export default function ChartsSection({ models }: Props) {
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
						<div className="arena-card mb-5 p-5 md:p-8">
							<h3 className="mb-4 text-center text-sm font-medium text-[var(--text-secondary)]">
								Category Performance
							</h3>
							<RadarPerformance models={models} />
						</div>

						<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
							<div className="arena-card p-5 md:p-8">
								<h3 className="mb-4 text-center text-sm font-medium text-[var(--text-secondary)]">
									Deterministic vs AI-Judged
								</h3>
								<McqVsFreeformChart models={models} />
							</div>
							<div className="arena-card p-5 md:p-8">
								<h3 className="mb-4 text-center text-sm font-medium text-[var(--text-secondary)]">
									Cost Efficiency (Score per $)
								</h3>
								<CostEfficiencyChart models={models} />
							</div>
						</div>
					</>
				) : (
					<>
						<div className="arena-card mb-5 flex h-[464px] items-center justify-center">
							<span className="text-sm text-[var(--text-secondary)]">
								Loading charts...
							</span>
						</div>
						<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
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
					</>
				)}
			</div>
		</section>
	);
}

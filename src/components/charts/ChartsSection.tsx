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

const TABS = [
	"Category performance",
	"Skills impact",
	"Cost vs Value",
	"MCQ vs Freeform",
	"Cost efficiency",
] as const;

type Tab = (typeof TABS)[number];

export default function ChartsSection({
	models,
	withSkillsModels,
	withoutSkillsModels,
}: Props) {
	const [mounted, setMounted] = useState(false);
	const [activeTab, setActiveTab] = useState<Tab>("Category performance");

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<section className="rise-in px-4 pt-20 md:pt-28">
			<div className="arena-container">
				<h2 className="mb-4 text-center font-heading text-3xl font-normal tracking-[-2%] text-[var(--text-primary)] md:text-4xl">
					Beyond the leaderboard
				</h2>
				<p className="mx-auto mb-10 max-w-sm text-center text-base font-medium leading-relaxed tracking-[-1.4%] text-[var(--text-secondary)]">
					A closer look at how each model performs across every dimension we
					test.
				</p>

				<div className="scrollbar-hide mb-8 overflow-x-auto">
					<div className="flex flex-wrap items-center justify-center gap-2">
						{TABS.map((tab) => (
							<button
								key={tab}
								type="button"
								onClick={() => setActiveTab(tab)}
								className={`inline-flex shrink-0 cursor-pointer items-center whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition ${
									activeTab === tab
										? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-base)]"
										: "border-[var(--chip-line)] bg-[var(--chip-bg)] text-[var(--text-secondary)] hover:border-[var(--line)] hover:text-[var(--text-primary)]"
								}`}
							>
								{tab}
							</button>
						))}
					</div>
				</div>

				{mounted ? (
					<div className="min-h-[400px]">
						{activeTab === "Category performance" && (
							<RadarPerformance models={models} />
						)}
						{activeTab === "Skills impact" && (
							<SkillsComparisonChart
								withSkills={withSkillsModels}
								withoutSkills={withoutSkillsModels}
							/>
						)}
						{activeTab === "MCQ vs Freeform" && (
							<McqVsFreeformChart models={models} />
						)}
						{activeTab === "Cost efficiency" && (
							<CostEfficiencyChart models={models} />
						)}
						{activeTab === "Cost vs Value" && (
							<OverallValueChart models={withSkillsModels} />
						)}
					</div>
				) : (
					<div className="flex h-[464px] items-center justify-center">
						<span className="text-sm text-[var(--text-secondary)]">
							Loading charts...
						</span>
					</div>
				)}
			</div>
		</section>
	);
}

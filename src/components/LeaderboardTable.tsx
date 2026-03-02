import type { CategoryKey, ModelResult, ScoringMode } from "#/lib/types";
import { CATEGORY_LABELS } from "#/lib/types";
import ModelRow from "./ModelRow";

const CATEGORIES: CategoryKey[] = [
	"fundamental",
	"auth",
	"databases",
	"functions",
	"storage",
	"sites",
	"messaging",
];

interface LeaderboardTableProps {
	models: ModelResult[];
	scoringMode: ScoringMode;
}

export default function LeaderboardTable({
	models,
	scoringMode,
}: LeaderboardTableProps) {
	if (models.length === 0) {
		return (
			<div className="arena-card p-8 text-center text-[var(--text-secondary)]">
				No benchmark results available.
			</div>
		);
	}

	return (
		<div className="arena-card max-w-full overflow-x-auto">
			<table className="w-full min-w-[960px] border-collapse table-fixed font-inter">
				<colgroup>
					<col style={{ width: "48px" }} />
					<col style={{ width: "20%" }} />
					<col style={{ width: "8.4%" }} />
					<col style={{ width: "8.4%" }} />
					{CATEGORIES.map((cat) => (
						<col key={cat} style={{ width: "8.4%" }} />
					))}
				</colgroup>
				<thead>
					<tr className="h-10 border-b border-[var(--line-subtle)] bg-[rgba(255,255,255,0.02)]">
						<th className="w-12" />
						<th className="whitespace-nowrap px-3 text-left text-xs font-medium tracking-normal text-[var(--text-secondary)]">
							Model
						</th>
						<th className="whitespace-nowrap px-3 text-left text-xs font-medium tracking-normal text-[var(--text-secondary)]">
							Cost/1M
						</th>
						<th className="whitespace-nowrap px-3 text-left text-xs font-medium tracking-normal text-[var(--text-secondary)]">
							Overall
						</th>
						{CATEGORIES.map((cat, i) => (
							<th
								key={cat}
								className={`whitespace-nowrap px-3 text-left text-xs font-medium tracking-normal text-[var(--text-secondary)] ${i === 0 ? "border-l border-[var(--line-subtle)]" : ""}`}
							>
								{CATEGORY_LABELS[cat]}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{models.map((model) => (
						<ModelRow
							key={model.modelId}
							model={model}
							scoringMode={scoringMode}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}

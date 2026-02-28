import { useMemo, useState } from "react";
import type {
	BenchmarkResults,
	CategoryKey,
	ScoringMode,
	SortField,
} from "#/lib/types";
import { CATEGORY_LABELS } from "#/lib/types";
import ModelRow from "./ModelRow";
import SortableHeader from "./SortableHeader";

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
	data: BenchmarkResults;
	scoringMode: ScoringMode;
}

export default function LeaderboardTable({
	data,
	scoringMode,
}: LeaderboardTableProps) {
	const [sortField, setSortField] = useState<SortField>("overall");
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

	const sortedModels = useMemo(() => {
		const models = [...data.models];
		models.sort((a, b) => {
			let aVal: number | string;
			let bVal: number | string;

			const aScores =
				scoringMode === "mcq"
					? a.mcqScores
					: scoringMode === "freeform"
						? a.freeformScores
						: a.scores;
			const bScores =
				scoringMode === "mcq"
					? b.mcqScores
					: scoringMode === "freeform"
						? b.freeformScores
						: b.scores;
			const aOverall =
				scoringMode === "mcq"
					? a.mcqOverall
					: scoringMode === "freeform"
						? a.freeformOverall
						: a.overall;
			const bOverall =
				scoringMode === "mcq"
					? b.mcqOverall
					: scoringMode === "freeform"
						? b.freeformOverall
						: b.overall;

			if (sortField === "modelName") {
				aVal = a.modelName.toLowerCase();
				bVal = b.modelName.toLowerCase();
			} else if (sortField === "costPerMillionTokens") {
				aVal = a.costPerMillionTokens;
				bVal = b.costPerMillionTokens;
			} else if (sortField === "overall") {
				aVal = aOverall;
				bVal = bOverall;
			} else {
				aVal = aScores?.[sortField as CategoryKey] ?? 0;
				bVal = bScores?.[sortField as CategoryKey] ?? 0;
			}

			if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
			if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
			return 0;
		});
		return models;
	}, [data.models, sortField, sortDirection, scoringMode]);

	function handleSort(field: string) {
		if (field === sortField) {
			setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
		} else {
			setSortField(field as SortField);
			setSortDirection("desc");
		}
	}

	if (data.models.length === 0) {
		return (
			<div className="arena-card p-8 text-center text-[var(--text-secondary)]">
				No benchmark results available.
			</div>
		);
	}

	return (
		<div className="arena-card overflow-x-auto">
			<table className="w-full min-w-[900px] border-collapse">
				<thead>
					<tr className="border-b border-[var(--line)]">
						<th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
							#
						</th>
						<SortableHeader
							label="Model"
							field="modelName"
							currentSort={sortField}
							currentDirection={sortDirection}
							onSort={handleSort}
							align="left"
						/>
						<SortableHeader
							label="Cost/1M"
							field="costPerMillionTokens"
							currentSort={sortField}
							currentDirection={sortDirection}
							onSort={handleSort}
						/>
						{CATEGORIES.map((cat) => (
							<SortableHeader
								key={cat}
								label={CATEGORY_LABELS[cat]}
								field={cat}
								currentSort={sortField}
								currentDirection={sortDirection}
								onSort={handleSort}
							/>
						))}
						<SortableHeader
							label="Overall"
							field="overall"
							currentSort={sortField}
							currentDirection={sortDirection}
							onSort={handleSort}
						/>
					</tr>
				</thead>
				<tbody>
					{sortedModels.map((model, index) => (
						<ModelRow
							key={model.modelId}
							model={model}
							rank={index + 1}
							scoringMode={scoringMode}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}

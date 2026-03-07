import { ArrowDown, ArrowUp } from "lucide-react";
import type {
	CategoryKey,
	ModelResult,
	ScoringMode,
	SortField,
} from "#/lib/types";
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
	"realtime",
	"cli",
];

function defaultDirectionFor(field: SortField): "asc" | "desc" {
	return field === "modelName" ? "asc" : "desc";
}

interface SortableThProps {
	label: string;
	field: SortField;
	sortField: SortField | undefined;
	sortDirection: "asc" | "desc";
	onSort: ((field: SortField, dir: "asc" | "desc") => void) | undefined;
	className?: string;
	relaxedPadding?: boolean;
	firstCol?: boolean;
}

function SortableTh({
	label,
	field,
	sortField,
	sortDirection,
	onSort,
	className = "",
	relaxedPadding = false,
	firstCol = false,
}: SortableThProps) {
	const padX = firstCol ? "pl-4 pr-2" : relaxedPadding ? "px-2.5" : "px-2";
	const isActive = sortField === field;
	const handleClick = () => {
		if (!onSort) return;
		if (isActive) {
			onSort(field, sortDirection === "desc" ? "asc" : "desc");
		} else {
			onSort(field, defaultDirectionFor(field));
		}
	};
	return (
		<th
			scope="col"
			className={`text-left ${onSort ? `cursor-pointer ${className}`.trim() : className}`}
			role={onSort ? "columnheader" : undefined}
			aria-sort={
				onSort && isActive
					? sortDirection === "desc"
						? "descending"
						: "ascending"
					: undefined
			}
		>
			{onSort ? (
				<button
					type="button"
					onClick={handleClick}
					className={`flex w-full cursor-pointer items-center justify-start gap-1 ${padX} py-2 text-left text-xs font-medium tracking-normal text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--line)]`}
				>
					<span className="min-w-0 flex-1 truncate" title={label}>{label}</span>
					<span className="inline-flex w-3 shrink-0 justify-center" aria-hidden>
						{isActive &&
							(sortDirection === "desc" ? (
								<ArrowDown size={12} />
							) : (
								<ArrowUp size={12} />
							))}
					</span>
				</button>
			) : (
				<span className={`block min-w-0 truncate ${padX} py-2 text-xs font-medium tracking-normal text-[var(--text-secondary)]`} title={label}>
					{label}
				</span>
			)}
		</th>
	);
}

interface LeaderboardTableProps {
	models: ModelResult[];
	scoringMode: ScoringMode;
	disableLink?: boolean;
	hideModel?: boolean;
	visibleCategories?: CategoryKey[];
	sortField?: SortField;
	sortDirection?: "asc" | "desc";
	onSort?: (field: SortField, direction: "asc" | "desc") => void;
}

export default function LeaderboardTable({
	models,
	scoringMode,
	disableLink,
	hideModel,
	visibleCategories,
	sortField,
	sortDirection = "desc",
	onSort,
}: LeaderboardTableProps) {
	const categories = visibleCategories ?? CATEGORIES;
	if (models.length === 0) {
		return (
			<div className="arena-card p-8 text-center text-[var(--text-secondary)]">
				No benchmark results available.
			</div>
		);
	}

	return (
		<div className="arena-card max-w-full overflow-x-auto">
			<table
				className={`w-full table-fixed border-collapse text-left [&_td]:align-middle ${hideModel ? "" : "min-w-[778px]"}`}
			>
				<colgroup>
					{!hideModel && <col style={{ width: "44px", minWidth: "44px" }} />}
					{!hideModel && <col style={{ width: "100px", minWidth: "100px" }} />}
					<col style={{ width: "56px", minWidth: "56px" }} />
					<col style={{ width: "52px", minWidth: "52px" }} />
					{categories.map((cat) => (
						<col key={cat} style={{ width: "58px", minWidth: "58px" }} />
					))}
				</colgroup>
				<thead>
					<tr className="h-10 border-b border-[var(--line-subtle)] bg-[rgba(255,255,255,0.02)] [&>th]:align-middle">
						{!hideModel && <th className="w-11 text-left" scope="col" />}
						{!hideModel && (
							<SortableTh
								label="Model"
								field="modelName"
								sortField={sortField}
								sortDirection={sortDirection}
								onSort={onSort}
							/>
						)}
						<SortableTh
							label="Cost/1M"
							field="costPerMillionTokens"
							sortField={sortField}
							sortDirection={sortDirection}
							onSort={onSort}
							firstCol={hideModel}
						/>
						<SortableTh
							label="Overall"
							field="overall"
							sortField={sortField}
							sortDirection={sortDirection}
							onSort={onSort}
							relaxedPadding
						/>
						{categories.map((cat, i) => (
							<SortableTh
								key={cat}
								label={CATEGORY_LABELS[cat]}
								field={cat}
								sortField={sortField}
								sortDirection={sortDirection}
								onSort={onSort}
								relaxedPadding
								className={
									i === 0 ? "border-l border-[var(--line-subtle)]" : ""
								}
							/>
						))}
					</tr>
				</thead>
				<tbody>
					{models.map((model) => (
						<ModelRow
							key={model.modelId}
							model={model}
							scoringMode={scoringMode}
							disableLink={disableLink}
							hideModel={hideModel}
							visibleCategories={visibleCategories}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
}

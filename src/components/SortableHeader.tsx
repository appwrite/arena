import { ChevronDown, ChevronUp } from "lucide-react";

interface SortableHeaderProps {
	label: string;
	field: string;
	currentSort: string;
	currentDirection: "asc" | "desc";
	onSort: (field: string) => void;
	align?: "left" | "right";
}

export default function SortableHeader({
	label,
	field,
	currentSort,
	currentDirection,
	onSort,
	align = "right",
}: SortableHeaderProps) {
	const isActive = currentSort === field;

	return (
		<th
			onClick={() => onSort(field)}
			className={`cursor-pointer select-none whitespace-nowrap px-3 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] ${
				align === "left" ? "text-left" : "text-right"
			}`}
		>
			<span className="inline-flex items-center gap-1">
				{label}
				<span className="inline-flex flex-col">
					<ChevronUp
						size={12}
						className={
							isActive && currentDirection === "asc"
								? "text-[var(--accent-pink)]"
								: "opacity-30"
						}
					/>
					<ChevronDown
						size={12}
						className={
							isActive && currentDirection === "desc"
								? "text-[var(--accent-pink)]"
								: "opacity-30"
						}
						style={{ marginTop: "-4px" }}
					/>
				</span>
			</span>
		</th>
	);
}

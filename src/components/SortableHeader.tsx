import { ChevronDown, ChevronUp } from "lucide-react";

interface SortableHeaderProps {
	label: string;
	field: string;
	currentSort: string;
	currentDirection: "asc" | "desc";
	onSort: (field: string) => void;
	align?: "left" | "right";
	divider?: boolean;
}

export default function SortableHeader({
	label,
	field,
	currentSort,
	currentDirection,
	onSort,
	align = "left",
	divider,
}: SortableHeaderProps) {
	const isActive = currentSort === field;

	return (
		<th
			onClick={() => onSort(field)}
			className={`cursor-pointer select-none whitespace-nowrap px-3 text-xs font-medium tracking-normal text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] ${
				align === "left" ? "text-left" : "text-right"
			} ${divider ? "border-l border-[var(--line-subtle)]" : ""}`}
		>
			<span className="inline-flex items-center gap-1">
				{label}
				<span className="inline-flex flex-col">
					<ChevronUp
						size={12}
						className={
							isActive && currentDirection === "asc"
								? "text-white"
								: "opacity-30"
						}
					/>
					<ChevronDown
						size={12}
						className={
							isActive && currentDirection === "desc"
								? "text-white"
								: "opacity-30"
						}
						style={{ marginTop: "-4px" }}
					/>
				</span>
			</span>
		</th>
	);
}

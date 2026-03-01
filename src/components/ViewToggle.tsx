import { LayoutGrid, List } from "lucide-react";

interface ViewToggleProps {
	view: "list" | "grid";
	onChange: (view: "list" | "grid") => void;
}

export default function ViewToggle({ view, onChange }: ViewToggleProps) {
	return (
		<span className="inline-flex items-center gap-0.5 rounded-lg border border-[var(--line)] p-0.5">
			<button
				type="button"
				onClick={() => onChange("list")}
				className={`cursor-pointer rounded-md border-none p-1 transition ${
					view === "list"
						? "bg-[var(--line)] text-[var(--text-primary)]"
						: "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
				}`}
			>
				<List size={14} />
			</button>
			<button
				type="button"
				onClick={() => onChange("grid")}
				className={`cursor-pointer rounded-md border-none p-1 transition ${
					view === "grid"
						? "bg-[var(--line)] text-[var(--text-primary)]"
						: "bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
				}`}
			>
				<LayoutGrid size={14} />
			</button>
		</span>
	);
}

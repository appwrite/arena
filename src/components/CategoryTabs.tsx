import { CATEGORY_LABELS } from "#/lib/types";

interface CategoryTabsProps {
	categories: string[];
	activeCategory: string;
	categoryCounts: Record<string, number>;
	onCategoryChange: (category: string) => void;
}

export default function CategoryTabs({
	categories,
	activeCategory,
	categoryCounts,
	onCategoryChange,
}: CategoryTabsProps) {
	return (
		<div className="scrollbar-hide -mx-2 mb-4 overflow-x-auto px-2">
			<div className="flex items-center gap-2">
				{categories.map((cat) => {
					const isActive = cat === activeCategory;
					const count = categoryCounts[cat] ?? 0;
					return (
						<button
							key={cat}
							type="button"
							onClick={() => onCategoryChange(cat)}
							disabled={count === 0}
							className={`inline-flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition ${
								isActive
									? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-base)]"
									: count === 0
										? "cursor-not-allowed border-[var(--chip-line)] bg-[var(--chip-bg)] text-[var(--text-secondary)] opacity-40"
										: "border-[var(--chip-line)] bg-[var(--chip-bg)] text-[var(--text-secondary)] hover:border-[var(--line)] hover:text-[var(--text-primary)]"
							}`}
						>
							{CATEGORY_LABELS[cat] ?? cat}
							<span
								className={`text-[10px] ${isActive ? "opacity-70" : "opacity-50"}`}
							>
								{count}
							</span>
						</button>
					);
				})}
			</div>
		</div>
	);
}

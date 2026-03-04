import { CATEGORY_DESCRIPTIONS, CATEGORY_LABELS } from "#/lib/types";

const entries = Object.entries(CATEGORY_LABELS);

export default function CategoriesGrid() {
	return (
		<section className="rise-in px-4 py-14 md:py-20">
			<div className="arena-container">
				<h2 className="mb-4 text-center font-heading text-2xl font-normal tracking-[-2.2%] text-[var(--text-primary)] md:text-3xl">
					All Appwrite services covered
				</h2>
				<p className="mx-auto mb-12 max-w-lg text-center text-sm leading-relaxed text-[var(--text-secondary)]">
					Questions span every major Appwrite service, from authentication to
					real-time subscriptions.
				</p>

				<div className="mx-auto max-w-sm">
					<div className="py-4">
						{entries.map(([key, label], i) => (
							<div
								key={key}
								className={`flex items-center gap-4 px-4 py-3 ${i !== entries.length - 1 ? "border-b border-[var(--line-subtle)]" : ""}`}
							>
								<span className="w-28 shrink-0 font-heading text-sm font-medium text-[var(--text-primary)]">
									{label}
								</span>
								<span className="text-sm leading-snug text-[var(--text-secondary)]">
									{CATEGORY_DESCRIPTIONS[key]}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

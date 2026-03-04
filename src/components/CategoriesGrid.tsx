import { CATEGORY_DESCRIPTIONS, CATEGORY_LABELS } from "#/lib/types";

const entries = Object.entries(CATEGORY_LABELS);

const CATEGORY_ICONS: Record<string, string> = {
	fundamental: "/icons/cat-fundamental.svg",
	auth: "/icons/cat-auth.svg",
	databases: "/icons/cat-databases.svg",
	functions: "/icons/cat-functions.svg",
	storage: "/icons/cat-storage.svg",
	sites: "/icons/cat-sites.svg",
	messaging: "/icons/cat-messaging.svg",
	realtime: "/icons/cat-realtime.svg",
	cli: "/icons/cat-cli.svg",
};

export default function CategoriesGrid() {
	return (
		<section
			data-theme="light"
			className="rise-in bg-[#EDEDF0] px-4 pt-14 pb-24 md:pt-20 md:pb-32"
		>
			<div className="arena-container">
				<h2 className="mb-10 max-w-sm font-heading text-3xl font-normal tracking-[-2%] text-[#19191C] md:text-4xl">
					Benchmarking the full Appwrite platform
				</h2>
			</div>
			<div className="border-b border-dashed border-[#19191C]/12">
				<div className="arena-container">
					<div className="grid grid-cols-1 border-t border-dashed border-[#19191C]/12 sm:grid-cols-2 md:grid-cols-3">
						{entries.map(([key, label], i) => {
							const isLastRow = i >= entries.length - (entries.length % 3 || 3);
							const isLastCol = (i + 1) % 3 === 0;
							return (
								<div
									key={key}
									className={`px-6 py-6 ${!isLastRow ? "border-b border-dashed border-[#19191C]/12" : ""} ${!isLastCol ? "md:border-r md:border-dashed md:border-[#19191C]/12" : ""}`}
								>
									<img
										src={CATEGORY_ICONS[key]}
										alt=""
										width={40}
										height={40}
										className="mb-3"
									/>
									<h3 className="mb-1 font-heading text-sm font-medium text-[#19191C]">
										{label}
									</h3>
									<p className="text-sm font-medium leading-relaxed tracking-[-1.4%] text-[#56565C]">
										{CATEGORY_DESCRIPTIONS[key]}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}

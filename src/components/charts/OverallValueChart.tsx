import { useMemo, useState } from "react";
import {
	CartesianGrid,
	Label,
	ResponsiveContainer,
	Scatter,
	ScatterChart,
	Tooltip,
	XAxis,
	YAxis,
	ZAxis,
} from "recharts";
import type { CategoryKey, ModelResult } from "#/lib/types";
import { CATEGORY_LABELS } from "#/lib/types";
import {
	buildOverallValueData,
	tooltipContentStyle,
	tooltipLabelStyle,
} from "./chartConfig";

interface Props {
	models: ModelResult[];
}

const CATEGORIES = Object.keys(CATEGORY_LABELS) as CategoryKey[];

export default function OverallValueChart({ models }: Props) {
	const [activeCategory, setActiveCategory] = useState<"overall" | CategoryKey>(
		"overall",
	);

	const data = useMemo(
		() =>
			buildOverallValueData(
				models,
				activeCategory === "overall" ? undefined : activeCategory,
			),
		[models, activeCategory],
	);

	return (
		<div>
			<ResponsiveContainer width="100%" height={280}>
				<ScatterChart margin={{ top: 10, right: 20, bottom: 20, left: 10 }}>
					<CartesianGrid stroke="rgba(237,237,240,0.1)" strokeDasharray="3 3" />
					<XAxis
						type="number"
						dataKey="cost"
						tick={{ fill: "#9ca3af", fontSize: 12 }}
						axisLine={{ stroke: "rgba(237,237,240,0.1)" }}
						tickLine={false}
						tickFormatter={(v: number) => `$${v}`}
					>
						<Label
							value="Cost per M tokens"
							position="bottom"
							offset={2}
							style={{ fill: "#6b7280", fontSize: 11 }}
						/>
					</XAxis>
					<YAxis
						type="number"
						dataKey="score"
						domain={[90, 100]}
						tick={{ fill: "#9ca3af", fontSize: 12 }}
						axisLine={{ stroke: "rgba(237,237,240,0.1)" }}
						tickLine={false}
						tickFormatter={(v: number) => `${v}%`}
					>
						<Label
							value="Score"
							angle={-90}
							position="insideLeft"
							offset={10}
							style={{ fill: "#6b7280", fontSize: 11 }}
						/>
					</YAxis>
					<ZAxis range={[200, 200]} />
					<Tooltip
						cursor={{
							strokeDasharray: "3 3",
							stroke: "rgba(237,237,240,0.2)",
						}}
						content={({ active, payload }) => {
							if (!active || !payload?.length) return null;
							const d = payload[0].payload as (typeof data)[number];
							return (
								<div style={{ ...tooltipContentStyle, padding: "10px 14px" }}>
									<p style={{ ...tooltipLabelStyle, color: d.color }}>
										{d.name}
									</p>
									<p
										style={{
											color: "#EDEDF0",
											fontSize: 13,
											padding: "1px 0",
										}}
									>
										Score: {d.score}% · Cost: ${d.cost}/M tokens
									</p>
								</div>
							);
						}}
					/>
					{data.map((entry) => (
						<Scatter
							key={entry.name}
							name={entry.name}
							data={[entry]}
							fill={entry.color}
						/>
					))}
				</ScatterChart>
			</ResponsiveContainer>
			<div className="scrollbar-hide -mx-1 mt-4 overflow-x-auto px-1">
				<div className="flex flex-wrap items-center justify-center gap-2">
					<button
						type="button"
						onClick={() => setActiveCategory("overall")}
						className={`inline-flex shrink-0 cursor-pointer items-center whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition ${
							activeCategory === "overall"
								? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-base)]"
								: "border-[var(--chip-line)] bg-[var(--chip-bg)] text-[var(--text-secondary)] hover:border-[var(--line)] hover:text-[var(--text-primary)]"
						}`}
					>
						Overall
					</button>
					{CATEGORIES.map((cat) => (
						<button
							key={cat}
							type="button"
							onClick={() => setActiveCategory(cat)}
							className={`inline-flex shrink-0 cursor-pointer items-center whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition ${
								activeCategory === cat
									? "border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-base)]"
									: "border-[var(--chip-line)] bg-[var(--chip-bg)] text-[var(--text-secondary)] hover:border-[var(--line)] hover:text-[var(--text-primary)]"
							}`}
						>
							{CATEGORY_LABELS[cat]}
						</button>
					))}
				</div>
			</div>
		</div>
	);
}

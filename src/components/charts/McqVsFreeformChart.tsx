import { useMemo } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import type { ModelResult } from "#/lib/types";
import {
	buildMcqFreeformData,
	tooltipContentStyle,
	tooltipItemStyle,
	tooltipLabelStyle,
} from "./chartConfig";

interface Props {
	models: ModelResult[];
}

export default function McqVsFreeformChart({ models }: Props) {
	const data = useMemo(() => buildMcqFreeformData(models), [models]);

	return (
		<ResponsiveContainer width="100%" height={300}>
			<BarChart data={data} barGap={2} barCategoryGap="25%">
				<CartesianGrid stroke="rgba(237,237,240,0.1)" strokeDasharray="3 3" />
				<XAxis
					dataKey="name"
					tick={{ fill: "#9ca3af", fontSize: 12 }}
					axisLine={{ stroke: "rgba(237,237,240,0.1)" }}
					tickLine={false}
				/>
				<YAxis
					domain={[75, 100]}
					tick={{ fill: "#9ca3af", fontSize: 12 }}
					axisLine={{ stroke: "rgba(237,237,240,0.1)" }}
					tickLine={false}
					tickFormatter={(v: number) => `${v}%`}
				/>
				<Tooltip
					contentStyle={tooltipContentStyle}
					labelStyle={tooltipLabelStyle}
					itemStyle={tooltipItemStyle}
					cursor={{ fill: "rgba(237,237,240,0.05)" }}
					formatter={(value: number) => [`${value}%`]}
				/>
				<Legend
					wrapperStyle={{ fontSize: 13 }}
					formatter={(value: string) => (
						<span style={{ color: "#EDEDF0" }}>{value}</span>
					)}
				/>
				<Bar dataKey="mcq" name="Deterministic (MCQ)" radius={[4, 4, 0, 0]}>
					{data.map((entry) => (
						<Cell key={entry.name} fill={entry.color} fillOpacity={0.85} />
					))}
				</Bar>
				<Bar
					dataKey="freeform"
					name="AI-Judged (Freeform)"
					radius={[4, 4, 0, 0]}
				>
					{data.map((entry) => (
						<Cell key={entry.name} fill={entry.color} fillOpacity={0.45} />
					))}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
}

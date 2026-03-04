import { useMemo } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
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
		<ResponsiveContainer width="100%" height={400}>
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
					formatter={
						((value: number, name: string) => [
							`${value}%`,
							name.toLowerCase().includes("mcq")
								? "Deterministic"
								: "AI-Judged",
						]) as never
					}
				/>
				<Bar
					dataKey="mcq"
					name="Deterministic (MCQ)"
					fill="#EDEDF0"
					fillOpacity={0.85}
					radius={[4, 4, 0, 0]}
				>
					{data.map((entry) => (
						<Cell key={entry.name} fill={entry.color} fillOpacity={0.85} />
					))}
				</Bar>
				<Bar
					dataKey="freeform"
					name="AI-Judged (Freeform)"
					fill="#EDEDF0"
					fillOpacity={0.45}
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

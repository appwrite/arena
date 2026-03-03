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
	buildCostEfficiencyData,
	tooltipContentStyle,
	tooltipItemStyle,
	tooltipLabelStyle,
} from "./chartConfig";

interface Props {
	models: ModelResult[];
}

export default function CostEfficiencyChart({ models }: Props) {
	const data = useMemo(() => buildCostEfficiencyData(models), [models]);

	return (
		<ResponsiveContainer width="100%" height={250}>
			<BarChart data={data} layout="vertical" barCategoryGap="25%">
				<CartesianGrid
					stroke="rgba(237,237,240,0.1)"
					strokeDasharray="3 3"
					horizontal={false}
				/>
				<XAxis
					type="number"
					tick={{ fill: "#9ca3af", fontSize: 12 }}
					axisLine={{ stroke: "rgba(237,237,240,0.1)" }}
					tickLine={false}
				/>
				<YAxis
					type="category"
					dataKey="name"
					tick={{ fill: "#9ca3af", fontSize: 12 }}
					axisLine={{ stroke: "rgba(237,237,240,0.1)" }}
					tickLine={false}
					width={60}
				/>
				<Tooltip
					contentStyle={tooltipContentStyle}
					labelStyle={tooltipLabelStyle}
					itemStyle={tooltipItemStyle}
					cursor={{ fill: "rgba(237,237,240,0.05)" }}
					formatter={(
						value: number,
						_name: string,
						props: { payload: { cost: number } },
					) => [
						`${value} score/$ (at $${props.payload.cost}/M tokens)`,
						"Efficiency",
					]}
				/>
				<Bar dataKey="efficiency" radius={[0, 4, 4, 0]}>
					{data.map((entry) => (
						<Cell key={entry.name} fill={entry.color} />
					))}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
}

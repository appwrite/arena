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
	tooltipLabelStyle,
} from "./chartConfig";

interface Props {
	models: ModelResult[];
}

export default function CostEfficiencyChart({ models }: Props) {
	const data = useMemo(() => buildCostEfficiencyData(models), [models]);

	return (
		<ResponsiveContainer width="100%" height={350}>
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
					tickFormatter={(v: number) => `$${v}`}
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
					cursor={{ fill: "rgba(237,237,240,0.05)" }}
					content={({ active, payload, label }) => {
						if (!active || !payload?.length) return null;
						const cost = payload[0].value;
						return (
							<div style={{ ...tooltipContentStyle, padding: "10px 14px" }}>
								<p style={tooltipLabelStyle}>{label}</p>
								<p style={{ color: "#9ca3af", padding: "1px 0", fontSize: 13 }}>
									Cost: ${cost}/M tokens
								</p>
							</div>
						);
					}}
				/>
				<Bar dataKey="cost" radius={[0, 4, 4, 0]}>
					{data.map((entry) => (
						<Cell key={entry.name} fill={entry.color} fillOpacity={0.85} />
					))}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
}

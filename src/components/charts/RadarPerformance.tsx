import { useMemo } from "react";
import {
	Legend,
	PolarAngleAxis,
	PolarGrid,
	Radar,
	RadarChart,
	ResponsiveContainer,
	Tooltip,
} from "recharts";
import type { ModelResult } from "#/lib/types";
import {
	buildRadarData,
	getModelColor,
	getShortName,
	tooltipContentStyle,
	tooltipItemStyle,
	tooltipLabelStyle,
} from "./chartConfig";

interface Props {
	models: ModelResult[];
}

export default function RadarPerformance({ models }: Props) {
	const data = useMemo(() => buildRadarData(models), [models]);

	return (
		<ResponsiveContainer width="100%" height={400}>
			<RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
				<PolarGrid stroke="rgba(237,237,240,0.1)" />
				<PolarAngleAxis
					dataKey="category"
					tick={{ fill: "#9ca3af", fontSize: 12 }}
				/>
				<Tooltip
					contentStyle={tooltipContentStyle}
					labelStyle={tooltipLabelStyle}
					itemStyle={tooltipItemStyle}
				/>
				{models.map((m) => {
					const color = getModelColor(m.provider);
					const name = getShortName(m.modelName);
					return (
						<Radar
							key={m.modelId}
							name={name}
							dataKey={name}
							stroke={color}
							fill={color}
							fillOpacity={0.1}
							strokeWidth={2}
						/>
					);
				})}
				<Legend
					wrapperStyle={{ fontSize: 13, color: "#9ca3af" }}
					formatter={(value: string) => (
						<span style={{ color: "#EDEDF0" }}>{value}</span>
					)}
				/>
			</RadarChart>
		</ResponsiveContainer>
	);
}

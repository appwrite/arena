import { useCallback, useMemo, useState } from "react";
import {
	Legend,
	PolarAngleAxis,
	PolarGrid,
	PolarRadiusAxis,
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
	tooltipLabelStyle,
} from "./chartConfig";

interface Props {
	models: ModelResult[];
}

export default function RadarPerformance({ models }: Props) {
	const data = useMemo(() => buildRadarData(models), [models]);
	const [activeModel, setActiveModel] = useState<string | null>(null);

	const ordered = useMemo(() => {
		if (!activeModel) return models;
		const rest = models.filter(
			(m) => getShortName(m.modelName) !== activeModel,
		);
		const active = models.find(
			(m) => getShortName(m.modelName) === activeModel,
		);
		return active ? [...rest, active] : models;
	}, [models, activeModel]);

	const handleLegendClick = useCallback((entry: { value?: string }) => {
		if (entry.value) {
			setActiveModel((prev) =>
				prev === entry.value ? null : (entry.value ?? null),
			);
		}
	}, []);

	return (
		<ResponsiveContainer width="100%" height={400}>
			<RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
				<PolarGrid stroke="rgba(237,237,240,0.1)" />
				<PolarAngleAxis
					dataKey="category"
					tick={{ fill: "#9ca3af", fontSize: 12 }}
				/>
				<PolarRadiusAxis
					domain={[80, 100]}
					tick={{ fill: "#9ca3af", fontSize: 10 }}
					tickCount={5}
					axisLine={false}
				/>
				<Tooltip
					content={({ active, payload, label }) => {
						if (!active || !payload?.length) return null;
						return (
							<div style={{ ...tooltipContentStyle, padding: "10px 14px" }}>
								<p style={tooltipLabelStyle}>{label}</p>
								{payload.map((entry) => (
									<p
										key={entry.name}
										style={{
											color: entry.color,
											padding: "1px 0",
											fontSize: 13,
										}}
									>
										{entry.name}: {entry.value}%
									</p>
								))}
							</div>
						);
					}}
				/>
				{ordered.map((m) => {
					const color = getModelColor(m.provider);
					const name = getShortName(m.modelName);
					const isActive = name === activeModel;
					return (
						<Radar
							key={m.modelId}
							name={name}
							dataKey={name}
							stroke={color}
							fill={color}
							fillOpacity={isActive ? 0.55 : 0.1}
							strokeWidth={isActive ? 3 : 2}
						/>
					);
				})}
				<Legend
					wrapperStyle={{ fontSize: 13, color: "#9ca3af", cursor: "pointer" }}
					onClick={handleLegendClick}
					formatter={(value: string) => (
						<span
							style={{
								color:
									activeModel === value
										? "#EDEDF0"
										: activeModel
											? "#6b7280"
											: "#EDEDF0",
								fontWeight: activeModel === value ? 600 : 400,
							}}
						>
							{value}
						</span>
					)}
				/>
			</RadarChart>
		</ResponsiveContainer>
	);
}

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
	const [hoveredModel, setHoveredModel] = useState<string | null>(null);

	const highlightedModel = hoveredModel ?? activeModel;

	const ordered = useMemo(() => {
		if (!highlightedModel) return models;
		const rest = models.filter(
			(m) => getShortName(m.modelName) !== highlightedModel,
		);
		const active = models.find(
			(m) => getShortName(m.modelName) === highlightedModel,
		);
		return active ? [...rest, active] : models;
	}, [models, highlightedModel]);

	const containerRef = useRef<HTMLDivElement>(null);

	const handleLegendClick = useCallback((entry: { value?: string }) => {
		if (entry.value) {
			setActiveModel((prev) =>
				prev === entry.value ? null : (entry.value ?? null),
			);
		}
	}, []);

	useEffect(() => {
		if (!activeModel) return;
		function handleClickOutside(e: MouseEvent) {
			if (
				containerRef.current &&
				!containerRef.current.contains(e.target as Node)
			) {
				setActiveModel(null);
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [activeModel]);

	return (
		<div ref={containerRef}>
			<ResponsiveContainer width="100%" height={350}>
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
												color: "#9ca3af",
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
						const isHighlighted = name === highlightedModel;
						return (
							<Radar
								key={m.modelId}
								name={name}
								dataKey={name}
								stroke={color}
								fill={color}
								fillOpacity={isHighlighted ? 0.15 : highlightedModel ? 0 : 0.06}
								strokeOpacity={isHighlighted ? 1 : highlightedModel ? 0.1 : 1}
								strokeWidth={isHighlighted ? 2 : 1.5}
							/>
						);
					})}
					<Legend
						wrapperStyle={{
							fontSize: 13,
							color: "#9ca3af",
							cursor: "pointer",
							paddingTop: 12,
						}}
						onClick={handleLegendClick}
						iconSize={10}
						payload={ordered.map((m) => ({
							value: getShortName(m.modelName),
							type: "rect" as const,
							color: getModelColor(m.provider),
						}))}
						content={({ payload: items, onClick: onLegendClick }) => (
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									flexWrap: "wrap",
									gap: "12px 20px",
									paddingTop: 12,
									fontSize: 13,
									cursor: "pointer",
								}}
							>
								{(items ?? []).map((item) => (
									<span
										key={item.value}
										role="button"
										tabIndex={0}
										onClick={() =>
											onLegendClick?.({
												value: item.value,
											} as never)
										}
										onMouseEnter={() => setHoveredModel(item.value as string)}
										onMouseLeave={() => setHoveredModel(null)}
										onKeyDown={() => {}}
										style={{
											display: "inline-flex",
											alignItems: "center",
											gap: 6,
										}}
									>
										<span
											style={{
												display: "inline-block",
												width: 14,
												height: 4,
												borderRadius: 9999,
												backgroundColor: item.color,
												opacity:
													highlightedModel === item.value
														? 1
														: highlightedModel
															? 0.4
															: 0.85,
											}}
										/>
										<span
											style={{
												color:
													highlightedModel === item.value
														? "#EDEDF0"
														: highlightedModel
															? "#6b7280"
															: "#EDEDF0",
												fontWeight: highlightedModel === item.value ? 600 : 400,
											}}
										>
											{item.value}
										</span>
									</span>
								))}
							</div>
						)}
					/>
				</RadarChart>
			</ResponsiveContainer>
		</div>
	);
}

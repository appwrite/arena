import { useMemo } from "react";
import {
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Rectangle,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import type { ModelResult } from "#/lib/types";
import {
	buildSkillsComparisonData,
	round2,
	type SkillsComparisonDataPoint,
	tooltipContentStyle,
	tooltipLabelStyle,
} from "./chartConfig";

interface Props {
	withSkills: ModelResult[];
	withoutSkills: ModelResult[];
}

export default function SkillsComparisonChart({
	withSkills,
	withoutSkills,
}: Props) {
	const data = useMemo(
		() => buildSkillsComparisonData(withSkills, withoutSkills),
		[withSkills, withoutSkills],
	);

	return (
		<ResponsiveContainer width="100%" height={350}>
			<BarChart
				data={data}
				barSize={40}
				barCategoryGap="25%"
				stackOffset="none"
			>
				<CartesianGrid stroke="rgba(237,237,240,0.1)" strokeDasharray="3 3" />
				<XAxis
					dataKey="name"
					tick={{ fill: "#9ca3af", fontSize: 12 }}
					axisLine={{ stroke: "rgba(237,237,240,0.1)" }}
					tickLine={false}
				/>
				<YAxis
					domain={[0, 25]}
					tick={{ fill: "#9ca3af", fontSize: 12 }}
					axisLine={{ stroke: "rgba(237,237,240,0.1)" }}
					tickLine={false}
					tickFormatter={(v: number) => `${v + 75}%`}
				/>
				<Tooltip
					cursor={{ fill: "rgba(237,237,240,0.05)" }}
					content={({ active, payload, label }) => {
						if (!active || !payload?.length) return null;
						const base = payload.find((p) => p.dataKey === "base");
						const boost = payload.find((p) => p.dataKey === "boost");
						return (
							<div style={{ ...tooltipContentStyle, padding: "10px 14px" }}>
								<p style={tooltipLabelStyle}>{label}</p>
								{base && (
									<p
										style={{ color: "#9ca3af", padding: "1px 0", fontSize: 13 }}
									>
										Without Skills: {round2((base.value as number) + 75)}%
									</p>
								)}
								{boost && (boost.value as number) > 0 && (
									<p
										style={{ color: "#9ca3af", padding: "1px 0", fontSize: 13 }}
									>
										Skills Boost: +{boost.value}%
									</p>
								)}
							</div>
						);
					}}
				/>
				<Bar
					dataKey="base"
					stackId="score"
					fill="#EDEDF0"
					shape={(props: Record<string, unknown>) => {
						const payload = props.payload as SkillsComparisonDataPoint;
						const r = payload.boost === 0 ? [4, 4, 0, 0] : [0, 0, 0, 0];
						return <Rectangle {...props} radius={r} />;
					}}
				>
					{data.map((entry) => (
						<Cell key={entry.name} fill={entry.color} fillOpacity={0.85} />
					))}
				</Bar>
				<Bar
					dataKey="boost"
					stackId="score"
					fill="#EDEDF0"
					fillOpacity={0.35}
					radius={[4, 4, 0, 0]}
				>
					{data.map((entry) => (
						<Cell key={entry.name} fill={entry.color} fillOpacity={0.35} />
					))}
				</Bar>
			</BarChart>
		</ResponsiveContainer>
	);
}

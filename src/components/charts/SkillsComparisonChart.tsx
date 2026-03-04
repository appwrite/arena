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
	tooltipItemStyle,
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
		<ResponsiveContainer width="100%" height="100%" minHeight={300}>
			<BarChart data={data} barCategoryGap="25%" stackOffset="none">
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
					contentStyle={tooltipContentStyle}
					labelStyle={tooltipLabelStyle}
					itemStyle={tooltipItemStyle}
					cursor={{ fill: "rgba(237,237,240,0.05)" }}
					formatter={
						((value: number, name: string) => [
							name === "base" ? `${round2(value + 75)}%` : `+${value}%`,
							name === "base" ? "Without Skills" : "Skills Boost",
						]) as never
					}
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

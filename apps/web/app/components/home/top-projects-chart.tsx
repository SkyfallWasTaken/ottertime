import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "~/components/ui/card";
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from "~/components/ui/chart";
import { clamp } from "~/utils/misc";

const chartData = [
	{ project: "OtterTime", minutes: 275, fill: "var(--chart-1)" },
	{ project: "Archimedes", minutes: 200, fill: "var(--chart-2)" },
	{ project: "hc-site", minutes: 187, fill: "var(--chart-3)" },
	{ project: "Edge", minutes: 90, fill: "var(--chart-4)" },
	{ project: "Other", minutes: 10, fill: "var(--chart-5)" },
].sort((a, b) => b.minutes - a.minutes);

const chartConfig = {
	minutes: {
		label: "Minutes",
	},
} satisfies ChartConfig;

export default function TopProjectsChart() {
	const longestLabel = Math.max(
		...Object.values(chartData).map((config) => config.project.length),
	);
	const yAxisWidth = clamp(longestLabel * 9, 90, 200);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Top Projects</CardTitle>
				<CardDescription>17th March - 23rd March</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<BarChart
						accessibilityLayer
						data={chartData}
						layout="vertical"
						margin={{
							left: 0,
						}}
					>
						<YAxis
							dataKey="project"
							type="category"
							tickLine={false}
							tickMargin={10}
							axisLine={false}
							width={yAxisWidth}
						/>

						<XAxis dataKey="minutes" type="number" />
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
						<Bar dataKey="minutes" layout="vertical" radius={5} />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}

// const renderCustomBarLabel = ({ x, y, width, height, value }: { x: number, y: number, width: number, height: number, value: number }) => {
//     const [theme] = useAtom(themeAtom);
//     const MIN_BAR_WIDTH = 80;

//     if (width < MIN_BAR_WIDTH) {
//         // If bar is too small, position label to the right of the bar
//         return <text
//             x={x + width + 10}
//             y={y + height / 2}
//             fontSize={16}
//             // text-foreground
//             fill={theme === "light" ? "#0a0a0a" : "#fafafa"}
//             textAnchor="start"
//             dominantBaseline="central"
//         >
//             {convertMinutes(value)}
//         </text>;
//     }

//     return <text
//         x={x + width / 2}
//         y={y + height / 2}
//         fontSize={16}
//         fill="#fafafa"
//         textAnchor="middle"
//         dominantBaseline="central"
//     >
//         {convertMinutes(value)}
//     </text>;
// };

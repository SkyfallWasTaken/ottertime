import { Pie, PieChart } from "recharts";
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
import githubColors from "github-colors";

const chartData = [
	{
		language: "Rust",
		minutes: 275,
		fill: githubColors.get("Rust", true).color,
	},
	{
		language: "TypeScript",
		minutes: 200,
		fill: githubColors.get("TypeScript", true).color,
	},
	{ language: "Go", minutes: 187, fill: githubColors.get("Go", true).color },
	{ language: "Java", minutes: 90, fill: githubColors.get("Java", true).color },
	{ language: "Lua", minutes: 10, fill: githubColors.get("Lua", true).color },
].sort((a, b) => b.minutes - a.minutes);

const chartConfig = {
	minutes: { label: "Minutes" },
} satisfies ChartConfig;

export default function TopLanguagesChart() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Top Languages</CardTitle>
				<CardDescription>17th March – 23rd March</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={chartConfig}
					className="[&_.recharts-pie-label-text]:fill-foreground"
				>
					<PieChart>
						<ChartTooltip
							cursor={false}
							content={
								<ChartTooltipContent
									nameKey="minutes"
									labelFormatter={(_, payload) => payload[0].name}
								/>
							}
						/>
						<Pie
							data={chartData}
							dataKey="minutes"
							nameKey="language"
							cx="50%"
							cy="50%"
							outerRadius={100}
							labelLine={false}
							label={({ name }) => name}
						/>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}

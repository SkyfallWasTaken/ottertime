import { Pie, PieChart } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "~/components/ui/chart"

const chartData = [
    { language: "Rust", minutes: 275, fill: "var(--chart-1)" },
    { language: "TypeScript", minutes: 200, fill: "var(--chart-2)" },
    { language: "Go", minutes: 187, fill: "var(--chart-3)" },
    { language: "Java", minutes: 90, fill: "var(--chart-4)" },
    { language: "Lua", minutes: 10, fill: "var(--chart-5)" },
].sort((a, b) => b.minutes - a.minutes)

const chartConfig = {
    minutes: { label: "Minutes" },
} satisfies ChartConfig

export default function TopLanguagesChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Top Languages</CardTitle>
                <CardDescription>17th March – 23rd March</CardDescription>
            </CardHeader>
            <CardContent style={{ height: 300 }}>
                <ChartContainer config={chartConfig} className="[&_.recharts-pie-label-text]:fill-foreground">
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
    )
}

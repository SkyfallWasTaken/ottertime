import { Bar, BarChart, XAxis, YAxis } from "recharts"

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
    ChartTooltipContent,
} from "~/components/ui/chart"
import Alea from "alea";
import { clamp, convertMinutes } from "~/utils/misc";
import { themeAtom } from "../ThemeProvider";
import { useAtom } from "jotai";

const rng = Alea("Numbers!"); // Seeded RNG - keeps the bar colours deterministic

const getRandomColor = () => {
    const blackAmount = Math.floor(rng() * 60); // Increase black mix range (0% to 50%)
    const whiteAmount = Math.floor(rng() * 30); // Introduce white mix (0% to 30%)

    return `color-mix(in srgb, 
        color-mix(in srgb, var(--color-blue-700) ${100 - blackAmount}%, black ${blackAmount}%) 
        ${100 - whiteAmount}%, white ${whiteAmount}%)`;
};


const chartData = [
    { browser: "chrome", minutes: 275, fill: getRandomColor() },
    { browser: "safari", minutes: 200, fill: getRandomColor() },
    { browser: "firefox", minutes: 187, fill: getRandomColor() },
    { browser: "edge", minutes: 90, fill: getRandomColor() },
    { browser: "other", minutes: 10, fill: getRandomColor() },
].sort((a, b) => b.minutes - a.minutes)

const chartConfig = {
    minutes: {
        label: "Minutes",
    },
    chrome: {
        label: "Quackatime",
    },
    safari: {
        label: "Archimedes",
    },
    firefox: {
        label: "hc-site",
    },
    edge: {
        label: "Edge",
    },
    other: {
        label: "Other",
    },
} satisfies ChartConfig

export default function TopProjectsChart() {
    const longestLabel = Math.max(
        ...Object.values(chartConfig).map((config) => config.label.length)
    );
    const yAxisWidth = clamp(longestLabel * 9, 90, 200)

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
                            dataKey="browser"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            width={yAxisWidth}
                            tickFormatter={(value) =>
                                chartConfig[value as keyof typeof chartConfig]?.label
                            }
                        />

                        <XAxis dataKey="minutes" type="number" hide />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent />}
                        />
                        <Bar dataKey="minutes" layout="vertical" radius={5} label={renderCustomBarLabel} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

const renderCustomBarLabel = ({ x, y, width, height, value }: { x: number, y: number, width: number, height: number, value: number }) => {
    const [theme] = useAtom(themeAtom);
    const MIN_BAR_WIDTH = 80;

    if (width < MIN_BAR_WIDTH) {
        // If bar is too small, position label to the right of the bar
        return <text
            x={x + width + 10}
            y={y + height / 2}
            fontSize={16}
            // text-foreground
            fill={theme === "light" ? "#0a0a0a" : "#fafafa"}
            textAnchor="start"
            dominantBaseline="central"
        >
            {convertMinutes(value)}
        </text>;
    }

    return <text
        x={x + width / 2}
        y={y + height / 2}
        fontSize={16}
        fill="#fafafa"
        textAnchor="middle"
        dominantBaseline="central"
    >
        {convertMinutes(value)}
    </text>;
};

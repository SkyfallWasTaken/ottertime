import { redirect } from "react-router";
import TopLanguagesChart from "~/components/home/top-languages-chart";
import TopProjectsChart from "~/components/home/top-projects-chart";
import { Card, CardContent } from "~/components/ui/card";
import { getAuthData } from "~/middleware/auth-data";
import { getRandomItem } from "~/utils/misc";
import type { Route } from "./+types/home";

const timeQuotes = [
	"tick tock!",
	"time's ticking!",
	"time's up!",
	"time is money!",
	"get coding!",
	"let's code!",
	"quit slacking off!",
	"time to lock in!",
	"let's get this show on the road!",
	"lock in!",
	"like clocks but better",
	"just a second!",
	"all in good time!",
	"give it some time!",
	"time's the only thing that can't be bought!",
	"about time!",
];

export async function loader({ context }: Route.LoaderArgs) {
	const authData = getAuthData(context);
	if (!authData || !authData.user.emailVerified) {
		throw redirect("/auth/signin");
	}
	return {
		firstName: authData.user.name.split(" ")[0],
		quote: getRandomItem(timeQuotes),
	};
}

export default function Home({ loaderData }: Route.ComponentProps) {
	const { quote, firstName } = loaderData;

	return (
		<div className="space-y-4">
			<div>
				<h1 className="text-2xl font-bold sm:text-3xl">Hey {firstName}!</h1>
				<p className="text-muted-foreground text-lg italic">{quote}</p>
			</div>

			<div className="gap-4 w-full grid grid-cols-2 md:grid-cols-5">
				<StatCard title="Total Time" value="46h 25m" />
				<StatCard title="Top Project" value="OtterTime" />
				<StatCard title="Top Language" value="Rust" />
				<StatCard title="Top OS" value="Windows" />
				<StatCard title="Top Editor" value="Figma" />
			</div>

			<div className="grid xl:grid-cols-3 md:grid-cols-2 gap-4">
				<TopProjectsChart />
				<TopLanguagesChart />
			</div>
		</div>
	);
}

function StatCard({
	title,
	value,
	className,
}: { title: string; value: string; className?: string }) {
	return (
		<Card className={className}>
			<CardContent>
				<h2 className="text-foreground/80 font-mono uppercase text-sm">
					{title}
				</h2>
				<p className="text-2xl font-bold truncate">{value}</p>
			</CardContent>
		</Card>
	);
}

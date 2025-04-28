import { createFileRoute, redirect } from '@tanstack/react-router'
import { getRandomItem } from '~/utils/misc'
import {
  Card,
  CardContent,
} from "~/components/ui/card"
import TopProjectsChart from "~/components/home/top-projects-chart"
import TopLanguagesChart from "~/components/home/top-languages-chart"

const timeQuotes = [
  "tick tock!",
  "time's ticking!",
  "time's up!",
  "time is money!",
  "get coding!",
  "let's code!",
  "quit slacking off!",
  "like clocks but better",
  "just a second!",
  "all in good time!",
  "give it some time!",
  "time's the only thing that can't be bought!",
  "about time!"
];

export const Route = createFileRoute('/')({
  component: Home,
  beforeLoad: async ({ context }) => {
    if (!context.user) {
      throw redirect({ to: "/auth/signin" });
    }
  },
  loader: async ({ context }) => {
    return {
      firstName: context.user?.name.split(" ")[0] || "there",
      quote: getRandomItem(timeQuotes),
    }
  },
})

function Home() {
  const { quote, firstName } = Route.useLoaderData();

  return (
    <div className="space-y-4">
      <div>
        <h1 className='text-2xl font-bold sm:text-3xl'>Hey {firstName}!</h1>
        <p className="text-muted-foreground text-lg italic">{quote}</p>
      </div>

      <div className="gap-4 w-full grid grid-cols-2 md:grid-cols-5">
        <StatCard title="Total Time" value="46h 25m" />
        <StatCard title="Top Project" value="Quackatime" />
        <StatCard title="Top Language" value="Rust" />
        <StatCard title="Top OS" value="Windows" />
        <StatCard title="Top Editor" value="Figma" />
      </div>

      <div className="grid xl:grid-cols-3 md:grid-cols-2 gap-4">
        <TopProjectsChart />
        <TopLanguagesChart />
      </div>
    </div>
  )
}

function StatCard({ title, value, className }: { title: string; value: string; className?: string }) {
  return (
    <Card className={className}>
      <CardContent>
        <h2 className="text-foreground/80 font-mono uppercase text-sm">{title}</h2>
        <p className="text-2xl font-bold truncate">{value}</p>
      </CardContent>
    </Card>
  )
}

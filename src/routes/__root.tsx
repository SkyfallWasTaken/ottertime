import type { QueryClient } from "@tanstack/react-query";
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { createServerFn } from "@tanstack/react-start";
import { getWebRequest } from "@tanstack/react-start/server";
import type * as React from "react";
import "@fontsource-variable/inter";
import "@fontsource-variable/fira-code";

import { DefaultCatchBoundary } from "~/components/default-catch-boundary";
import { NotFound } from "~/components/not-found";
import appCss from "~/styles/app.css?url";
import { seo } from "~/utils/seo";

import Header from "~/components/header";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import { auth } from "~/server/auth";

const getUser = createServerFn({ method: "GET" }).handler(async () => {
	// biome-ignore lint: getWebRequest should always be available in server functions
	const { headers } = getWebRequest()!;
	const session = await auth.api.getSession({ headers });
	return session?.user || null;
});

export const Route = createRootRouteWithContext<{
	queryClient: QueryClient;
	user: Awaited<ReturnType<typeof getUser>>;
}>()({
	beforeLoad: async ({ context }) => {
		const user = await context.queryClient.fetchQuery({
			queryKey: ["user"],
			queryFn: ({ signal }) => getUser({ signal }),
		}); // we're using react-query for caching, see router.tsx
		return { user };
	},
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			...seo({
				title:
					"Quackatime - open-source time tracking for your code",
				description:
					"Quackatime is an open-source time tracking server for your code.",
			}),
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/favicon-32x32.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: "/favicon-16x16.png",
			},
			{ rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
			{ rel: "icon", href: "/favicon.ico" },
		],
	}),
	errorComponent: (props) => {
		return (
			<RootDocument>
				<DefaultCatchBoundary {...props} />
			</RootDocument>
		);
	},
	notFoundComponent: () => <NotFound />,
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<ThemeProvider>
					<Header />
					<div className="container mx-auto px-4 sm:px-0 py-6">{children}</div>
				</ThemeProvider>
				<TanStackRouterDevtools position="bottom-right" />
				<Scripts />
				<Toaster
					toastOptions={{
						className: "z-50",
						duration: 3000,
						style: {
							background: "var(--background)",
							color: "var(--text)",
						},
					}}
				/>
			</body>
		</html>
	);
}

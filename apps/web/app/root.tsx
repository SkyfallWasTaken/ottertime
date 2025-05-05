import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
	useLoaderData,
	type LoaderFunctionArgs,
} from "react-router";
import {
	ThemeProvider,
	PreventFlashOnWrongTheme,
	useTheme,
} from "remix-themes";
import clsx from "clsx";
import { themeSessionResolver } from "./sessions.server";
import { Toaster } from "~/components/ui/sonner";
import { authDataMiddleware } from "./middleware/auth-data";

import "@fontsource-variable/inter";
import "@fontsource-variable/fira-code";

import type { Route } from "./+types/root";
import Header from "./components/header";
import "./app.css";

export const links: Route.LinksFunction = () => [
	{ rel: "preconnect", href: "https://fonts.googleapis.com" },
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous",
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
	},
];

export async function loader({ request }: LoaderFunctionArgs) {
	const { getTheme } = await themeSessionResolver(request);
	return {
		theme: getTheme(),
	};
}

export const unstable_middleware = [authDataMiddleware];

function Layout({ children }: { children: React.ReactNode }) {
	const data = useLoaderData<typeof loader>();
	const [theme] = useTheme();

	return (
		<html lang="en" className={clsx(theme)}>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<PreventFlashOnWrongTheme ssrTheme={Boolean(data.theme)} />
				<Links />
			</head>
			<body>
				<Header />
				<div className="container mx-auto px-4 sm:px-0 py-6">{children}</div>
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
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function AppWithProviders() {
	const data = useLoaderData<typeof loader>();
	return (
		<ThemeProvider specifiedTheme={data.theme} themeAction="/action/set-theme">
			<Layout>
				<Outlet />
			</Layout>
		</ThemeProvider>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details =
			error.status === 404
				? "The requested page could not be found."
				: error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	const data = useLoaderData<typeof loader>();

	return (
		<main className="pt-16 p-4 container mx-auto">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full p-4 overflow-x-auto">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}

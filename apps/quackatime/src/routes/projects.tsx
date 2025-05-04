import { createFileRoute } from "@tanstack/react-router";
import { env } from "@repo/env/client";

export const Route = createFileRoute("/projects")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello {env.VITE_GITHUB_CLIENT_ID}!</div>;
}

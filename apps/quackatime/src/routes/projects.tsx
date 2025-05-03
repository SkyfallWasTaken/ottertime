import { createFileRoute } from "@tanstack/react-router";
import { env } from "~/utils/env";

export const Route = createFileRoute("/projects")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Hello "/{env.PUBLIC_GITHUB_CLIENT_ID}"!</div>;
}

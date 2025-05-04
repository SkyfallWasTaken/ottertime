import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("/action/set-theme", "routes/action.set-theme.ts"),
	route("/auth/signin", "routes/auth/signin.tsx"),
	route("/auth/signup", "routes/auth/signup.tsx"),
	route("/auth/verify", "routes/auth/verify.tsx"),
	route("/api/*", "api.ts"),
] satisfies RouteConfig;

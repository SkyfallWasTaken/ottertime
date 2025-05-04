import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"), route("/action/set-theme", "routes/action.set-theme.ts")] satisfies RouteConfig;

import { defineConfig } from "@tanstack/react-start/config";
import tsConfigPaths from "vite-tsconfig-paths";
import { cloudflare } from "unenv";

const isPages = !!process.env.CF_PAGES;

export default defineConfig({
	tsr: {
		appDirectory: "src",
	},
	vite: {
		plugins: [
			tsConfigPaths({
				projects: ["./tsconfig.json"],
			}),
		],
	},
	server: isPages
		? {
				preset: "cloudflare-pages",
				unenv: cloudflare,
			}
		: undefined,
});

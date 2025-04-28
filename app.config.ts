import { defineConfig } from "@tanstack/react-start/config";
import { cloudflare } from "unenv";
import tsConfigPaths from "vite-tsconfig-paths";

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
		: {
				preset: "bun",
			},
});

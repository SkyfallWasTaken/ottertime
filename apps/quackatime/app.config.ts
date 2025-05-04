import { defineConfig } from "@tanstack/react-start/config";
import { wrapVinxiConfigWithSentry } from "@sentry/tanstackstart-react";
import { cloudflare } from "unenv";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import tsConfigPaths from "vite-tsconfig-paths";
import "dotenv/config";

const isPages = !!process.env.CF_PAGES;

const config = defineConfig({
	tsr: {
		appDirectory: "src",
	},
	vite: {
		build: {
			sourcemap: true,
		},
		plugins: [
			tsConfigPaths({
				projects: ["./tsconfig.json"],
			}),
			sentryVitePlugin({
				authToken: process.env.SENTRY_AUTH_TOKEN,
				org: process.env.SENTRY_ORG,
				project: process.env.SENTRY_PROJECT,
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

const exported = wrapVinxiConfigWithSentry(config, {
	org: process.env.SENTRY_ORG,
	project: process.env.SENTRY_PROJECT,
	authToken: process.env.SENTRY_AUTH_TOKEN,
	// Only print logs for uploading source maps in CI
	// Set to `true` to suppress logs
	silent: !process.env.CI,
});

export default exported;

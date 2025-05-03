// app.config.ts
import { defineConfig } from "@tanstack/react-start/config";
import { wrapVinxiConfigWithSentry } from "@sentry/tanstackstart-react";
import { cloudflare } from "unenv";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import tsConfigPaths from "vite-tsconfig-paths";
var isPages = !!process.env.CF_PAGES;
var config = defineConfig({
  tsr: {
    appDirectory: "src"
  },
  vite: {
    build: {
      sourcemap: true
    },
    plugins: [
      tsConfigPaths({
        projects: ["./tsconfig.json"]
      }),
      sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT
      })
    ],
    envPrefix: ["PUBLIC_", "VITE_"]
  },
  server: isPages ? {
    preset: "cloudflare-pages",
    unenv: cloudflare
  } : {
    preset: "bun"
  }
});
var exported = process.env.SENTRY_ORG ? wrapVinxiConfigWithSentry(config, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
  // Only print logs for uploading source maps in CI
  // Set to `true` to suppress logs
  silent: !process.env.CI
}) : config;
var app_config_default = exported;
export {
  app_config_default as default
};

import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

// Make sure to update the Turbo config to include new env variables!
export const env = createEnv({
	// Make sure to update server.ts too!
	clientPrefix: "VITE_",
	client: {
		VITE_GITHUB_CLIENT_ID: z.string(),
		VITE_SENTRY_DSN: z.string(),
		VITE_TURNSTILE_SITE_KEY: z.string(),
	},
	runtimeEnv: import.meta.env,
	emptyStringAsUndefined: true,
});

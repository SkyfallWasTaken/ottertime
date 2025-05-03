import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

// Make sure to update the Turbo config to include new env variables!
export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string(),
    BETTER_AUTH_URL: z.string().url(),
    GITHUB_CLIENT_SECRET: z.string(),
    RESEND_API_KEY: z.string().startsWith("re_"),
    RESEND_FROM_EMAIL: z.string().email(),
    RESEND_POSTAL_ADDRESS: z.string().optional(),
    SENTRY_ORG: z.string().optional(),
    SENTRY_PROJECT: z.string().optional(),
    SENTRY_AUTH_TOKEN: z.string().optional(),
  },
  clientPrefix: "PUBLIC_",
  client: {
    PUBLIC_GITHUB_CLIENT_ID: z.string(),
    PUBLIC_SENTRY_DSN: z.string().optional(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});

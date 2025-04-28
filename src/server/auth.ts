import { betterAuth } from "better-auth";
import { apiKey, haveIBeenPwned } from "better-auth/plugins";
import { reactStartCookies } from "better-auth/react-start";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  db,
  user as usersTable,
  verification,
  account,
  session,
  apikey,
} from "~/server/db";
import { eq } from "drizzle-orm";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: usersTable,
      verification,
      account,
      session,
      apikey,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    haveIBeenPwned({
      customPasswordCompromisedMessage:
        "This password has been detected as part of a data breach. Please choose a more secure password.",
    }),
    apiKey({
      customKeyGenerator: async () => {
        // WakaTime plugins check for this: https://github.com/wakatime/wakatime-cli/blob/a76bb39bb741740851d6eb4d3142c6d9732e9ee8/cmd/params/params.go#L46
        return crypto.randomUUID();
      },
      defaultKeyLength: 32,
      rateLimit: {
        maxRequests: 50,
        timeWindow: 3 * 60 * 1000, // 3 minute
        enabled: true,
      },
    }),
    reactStartCookies(),
  ],
  user: {
    additionalFields: {
      apiKey: {
        type: "string",
        nullable: true,
        input: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const key = await auth.api.createApiKey({
            body: {
              userId: user.id,
            },
          });
          await db
            .update(usersTable)
            .set({ apiKey: key.key })
            .where(eq(usersTable.id, user.id));
        },
      },
    },
  },
});

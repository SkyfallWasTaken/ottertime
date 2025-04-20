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
    apiKey(),
    reactStartCookies(),
  ],
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

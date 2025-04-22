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
import { getPasswordFromAuthHeader } from "~/utils/misc";
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
    apiKey(),
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

export const getUserIdFromApiKey = async (
  headers: Headers
): Promise<
  | { error: string }
  | {
      userId: string;
    }
> => {
  const basicAuth = headers.get("Authorization");
  if (!basicAuth) {
    return { error: "Missing Authorization header" };
  }
  const parseResult = getPasswordFromAuthHeader(basicAuth);
  if (!parseResult.ok) {
    return { error: parseResult.error };
  }
  const apiKey = parseResult.password;

  const { error, key } = await auth.api.verifyApiKey({
    body: {
      key: apiKey,
    },
  });
  if (error || !key) {
    return { error: error?.message || error?.code || "UNKNOWN_API_KEY_ERROR" };
  }

  return { userId: key.userId };
};

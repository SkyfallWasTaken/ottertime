import { createAuthClient } from "better-auth/react";
import {
  inferAdditionalFields,
  apiKeyClient,
} from "better-auth/client/plugins";
import { auth } from "~/server/auth";

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>(), apiKeyClient()],
});

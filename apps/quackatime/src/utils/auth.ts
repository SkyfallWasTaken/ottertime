import {
  apiKeyClient,
  inferAdditionalFields,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "~/server/auth";

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>(), apiKeyClient()],
});

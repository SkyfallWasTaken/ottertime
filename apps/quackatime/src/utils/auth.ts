import {
	apiKeyClient,
	inferAdditionalFields,
} from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import type { auth } from "@repo/server/src/auth";

const baseURL = `${import.meta.env.VITE_BETTER_AUTH_URL}/auth`;

export const authClient = createAuthClient({
	plugins: [inferAdditionalFields<typeof auth>(), apiKeyClient()],
	baseURL,
	fetchOptions: {
		onRequest(context) {
			console.log("Request URL:", context.url);
			return context;
		},
	},
});

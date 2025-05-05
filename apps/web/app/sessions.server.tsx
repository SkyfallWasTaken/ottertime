import { env } from "@repo/env/server";
import { createCookieSessionStorage } from "react-router";
import { createThemeSessionResolver } from "remix-themes";

const isProduction = process.env.NODE_ENV === "production";

const sessionStorage = createCookieSessionStorage({
	cookie: {
		name: "theme",
		path: "/",
		httpOnly: true,
		sameSite: "lax",
		secrets: [env.SESSION_STORAGE_SECRET],
		// Set domain and secure only if in production
		...(isProduction ? { domain: new URL(env.FRONTEND_DOMAIN).hostname, secure: true } : {}),
	},
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);

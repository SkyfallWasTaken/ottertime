import { createThemeSessionResolver } from "remix-themes"
import { createCookieSessionStorage } from "react-router"

const isProduction = process.env.NODE_ENV === "production"

const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: "theme",
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secrets: ["s3cr3t"], // FIXME: change this to a real secret.
        // Set domain and secure only if in production
        ...(isProduction
            ? { domain: "quack.skyfall.dev", secure: true } // FIXME: don't hardcode this.
            : {}),
    },
})

export const themeSessionResolver = createThemeSessionResolver(sessionStorage)

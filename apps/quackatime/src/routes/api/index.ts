import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { sentry } from "@hono/sentry";

import { auth } from "~/server/auth";
import { getPasswordFromAuthHeader } from "~/utils/misc";
import authRouter from "./routers/auth";
import heartbeatsRouter from "./routers/heartbeats";
import statusbarRouter from "./routers/statusbar";
import type { Context } from "./util";

// Run the checks to ensure the env variables are set
// If they aren't, the API won't work and this will be detected by Coolify health checks
import { env } from "~/utils/env";

const app = new Hono<Context>();

app.use(
  "*",
  sentry({
    dsn: env.PUBLIC_SENTRY_DSN,
    tracesSampleRate: 1.0, // Capture 100% of transactions
  })
);

app.use("*", async (c, next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader) {
    c.set("userId", null);
    return next();
  }

  import.meta.env.DEV && console.log(c.req.url, authHeader);

  const parseResult = getPasswordFromAuthHeader(authHeader);
  if (!parseResult.ok) {
    return c.json({ error: parseResult.error }, 401);
  }
  const apiKey = parseResult.password;

  const { error, key } = await auth.api.verifyApiKey({
    body: {
      key: apiKey,
    },
  });
  if (error || !key) {
    if (error?.code === "RATE_LIMITED") {
      const retryInMs = error?.details.tryAgainIn?.toString() || "Infinity";
      return c.json({ error: "Rate limit exceeded", retryInMs }, 429, {
        "Retry-After": retryInMs,
      });
    }

    console.log("We got a problem!", apiKey.substring(0, 6), error);
    return c.json(
      { error: error?.message || error?.code || "UNKNOWN_API_KEY_ERROR" },
      401
    );
  }

  c.set("userId", key.userId);
  return next();
});

app.onError((err, c) => {
  const sid = c.get("sentry").captureException(err);
  console.log("Sentry error", sid);

  if (err instanceof HTTPException) {
    const errResponse =
      err.res ??
      c.json(
        {
          success: false,
          error: err.message,
          isFormError:
            err.cause && typeof err.cause === "object" && "form" in err.cause
              ? err.cause.form === true
              : false,
        },
        err.status
      );

    if (import.meta.env.DEV) {
      console.log(err.message, err.cause);
    }

    return errResponse;
  }

  if (import.meta.env.DEV) {
    console.error(err);
  }

  return c.json(
    {
      success: false,
      error: import.meta.env.PROD
        ? "Internal Server Error"
        : (err.stack ?? err.message),
    },
    500
  );
});

export type ApiRoutes = typeof routes;

const routes = app
  .basePath("/api/v1")
  .on("GET", ["", "/"], (c) => c.redirect("/"))
  .get("/hello", (c) => {
    // throw new Error("This is a test error");
    return c.json({ message: "Hello from the API!" });
  })
  .route("/users/current", heartbeatsRouter)
  .route("/users/current", statusbarRouter)
  .route("/auth", authRouter);

export default app;

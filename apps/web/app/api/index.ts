import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { sentry } from "@hono/sentry";

import betterAuth from "./middleware/betterAuth";
import authRouter from "./routers/betterAuth";
import heartbeatsRouter from "./routers/heartbeats";
import statusbarRouter from "./routers/statusbar";
import type { Context } from "./util";

import { env } from "@repo/env/server";

const app = new Hono<Context>();

app.use(
  sentry({
    dsn: env.VITE_SENTRY_DSN,
    tracesSampleRate: 1.0, // Capture 100% of transactions
  }),
  cors({
    origin: env.FRONTEND_DOMAIN,
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
  logger(),
  betterAuth
);

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

    if (process.env.NODE_ENV === "development") {
      console.log(err.message, err.cause);
    }

    return errResponse;
  }

  if (process.env.NODE_ENV === "development") {
    console.error(err);
  }

  return c.json(
    {
      success: false,
      error:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : err.stack ?? err.message,
    },
    500
  );
});

export type ApiRoutes = typeof routes;

const routes = app
  .basePath("/api")
  .on("GET", ["", "/"], (c) => c.redirect("/"))
  .get("/hello", (c) => {
    return c.json({ message: "Hello from the API!" });
  })
  .route("/users/current", heartbeatsRouter)
  .route("/users/current", statusbarRouter)
  .route("/auth/*", authRouter);

export default app;

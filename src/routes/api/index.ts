import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

import type { Context } from "./util";
import { getPasswordFromAuthHeader } from "~/utils/misc";
import { auth } from "~/server/auth";
import heartbeatsRouter from "./routes/heartbeats";
import authRouter from "./routes/auth";
import statusbarRouter from "./routes/statusbar";

const app = new Hono<Context>();

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

    return errResponse;
  }

  return c.json(
    {
      success: false,
      error:
        import.meta.env.NODE_ENV === "production"
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
  .get("/hello", (c) => c.json({ message: "Hello from the API!" }))
  .route("/users/current", heartbeatsRouter)
  .route("/users/current", statusbarRouter)
  .route("/auth", authRouter);

export default app;

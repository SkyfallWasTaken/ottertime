import { createMiddleware } from "hono/factory";
import { getPasswordFromAuthHeader } from "~/api/util";
import { auth } from "~/api/auth";

export default createMiddleware(async (c, next) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader) {
    c.set("userId", null);
    return next();
  }

  process.env.NODE_ENV === "development" && console.log(c.req.url, authHeader);

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

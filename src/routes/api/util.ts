import type { Env, MiddlewareHandler } from "hono";

export type Variables = {
  userId: string | null;
};
export type Context = Env & {
  Variables: Variables;
};

export const requireAuth: MiddlewareHandler<{
  Variables: { userId: string };
}> = async (c, next) => {
  console.log("Foo");
  const userId = c.get("userId");
  if (!userId) {
    console.log("not authed");
    return c.json({ error: "Unauthorized" }, 401);
  }
  await next();
};

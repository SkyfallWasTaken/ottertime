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
	const userId = c.get("userId");
	if (!userId) {
		return c.json({ error: "Unauthorized" }, 401);
	}
	await next();
};

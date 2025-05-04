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

export function getPasswordFromAuthHeader(authHeader: string):
	| {
			ok: false;
			error: string;
	  }
	| { ok: true; password: string } {
	if (!authHeader.startsWith("Basic ") && !authHeader.startsWith("Bearer ")) {
		return { ok: false, error: "Invalid Authorization header" };
	}

	if (authHeader.startsWith("Bearer ")) {
		return { ok: true, password: authHeader.slice(7) };
	}

	// Decode the Base64 part
	const credentials = Buffer.from(authHeader.slice(6), "base64").toString(
		"utf-8",
	);

	// Split into username and password
	if (credentials.includes(":")) {
		const [_, password] = credentials.split(":");
		if (!password) {
			return { ok: false, error: "Invalid Authorization header" };
		}
		return { ok: true, password };
	}

	return { ok: true, password: credentials };
}

export async function sha256(message: string) {
	const msgUint8 = new TextEncoder().encode(message);
	const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
	return hashHex;
}

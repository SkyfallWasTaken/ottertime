import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { z } from "zod";
import { db, usersTable, heartbeatSchema } from "~/server/db";
import { eq } from "drizzle-orm";
import { fromError as fromZodError } from "zod-validation-error";
import emitHeartbeats from "~/server/heartbeats";

const apiResponseSchema = z.object({
	heartbeats: z.array(heartbeatSchema).min(1).max(25),
});

export const APIRoute = createAPIFileRoute("/api/heartbeats")({
	POST: async ({ request, params }) => {
		const apiResponse = apiResponseSchema.safeParse(await request.json());
		if (!apiResponse.success) {
			return json(
				{
					message: "Invalid request",
					errors: apiResponse.error.errors,
					friendlyErrors: fromZodError(apiResponse.error).toString(),
				},
				{ status: 400 },
			);
		}

		const basicAuth = request.headers.get("Authorization");
		if (!basicAuth) {
			return json({ message: "Missing Authorization header" }, { status: 401 });
		}

		const apiKey = basicAuth.split(" ")[1];
		if (!apiKey) {
			return json({ message: "Missing API key" }, { status: 401 });
		}

		const [user] = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.apiKey, apiKey));
		if (!user) {
			return json({ message: "Invalid API key" }, { status: 401 });
		}

		await emitHeartbeats(apiResponse.data.heartbeats, user.id);

		return json({ message: "Heartbeats received" });
	},
});

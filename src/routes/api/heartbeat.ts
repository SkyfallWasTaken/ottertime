import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { db, user as usersTable } from "~/server/db";
import { eq } from "drizzle-orm";
import { fromError as fromZodError } from "zod-validation-error";
import { heartbeatSchema } from "~/common/heartbeats";
import emitHeartbeats from "~/server/quackatime/heartbeats";
import { getPasswordFromAuthHeader } from "~/utils/misc";

export const APIRoute = createAPIFileRoute("/api/heartbeat")({
  POST: async ({ request }) => {
    const apiResponse = heartbeatSchema.safeParse(await request.json());
    if (!apiResponse.success) {
      return json(
        {
          message: "Invalid request",
          errors: apiResponse.error.errors,
          friendlyErrors: fromZodError(apiResponse.error).toString(),
        },
        { status: 400 }
      );
    }

    const basicAuth = request.headers.get("Authorization");
    if (!basicAuth) {
      return json({ message: "Missing Authorization header" }, { status: 401 });
    }
    const parseResult = getPasswordFromAuthHeader(basicAuth);
    if (!parseResult.ok) {
      return json({ message: parseResult.error }, { status: 401 });
    }
    const apiKey = parseResult.password;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.apiKey, apiKey))
      .execute();
    if (!user) {
      return json({ message: "Invalid API key" }, { status: 401 });
    }

    await emitHeartbeats([apiResponse.data], user.id);

    return json({ message: "Heartbeats received" }, { status: 201 });
  },
});

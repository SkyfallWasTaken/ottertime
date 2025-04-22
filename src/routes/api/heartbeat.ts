import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { fromError as fromZodError } from "zod-validation-error";
import { heartbeatSchema } from "~/common/heartbeats";
import { getUserIdFromApiKey } from "~/server/auth";
import emitHeartbeats from "~/server/quackatime/heartbeats";

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

    const authed = await getUserIdFromApiKey(request.headers);
    if ("error" in authed) {
      return json({ message: authed.error }, { status: 401 });
    }

    await emitHeartbeats([apiResponse.data], authed.userId);

    return json({ message: "Heartbeats received" }, { status: 201 });
  },
});

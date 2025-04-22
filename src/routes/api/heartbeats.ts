import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { z } from "zod";
import { fromError as fromZodError } from "zod-validation-error";
import { heartbeatSchema } from "~/common/heartbeats";
import { getUserIdFromApiKey } from "~/server/auth";
import emitHeartbeats from "~/server/quackatime/heartbeats";

const apiResponseSchema = z.array(heartbeatSchema).min(1).max(25);

export const APIRoute = createAPIFileRoute("/api/heartbeats")({
  POST: async ({ request }) => {
    const apiResponse = apiResponseSchema.safeParse(await request.json());
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

    await emitHeartbeats(apiResponse.data, authed.userId);

    return json({ message: "Heartbeats received" }, { status: 201 });
  },
});

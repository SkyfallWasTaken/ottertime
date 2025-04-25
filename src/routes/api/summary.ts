import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";
import { fromError as fromZodError } from "zod-validation-error";
import { getUserIdFromApiKey } from "~/server/auth";

export const APIRoute = createAPIFileRoute("/api/summary")({
  GET: async ({ request }) => {
    const authed = await getUserIdFromApiKey(request.headers);
    if ("error" in authed) {
      return json({ message: authed.error }, { status: 401 });
    }

    return new Response("aa");
  },
});

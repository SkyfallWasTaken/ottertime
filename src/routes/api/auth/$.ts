import { auth } from "~/server/auth";
import { createAPIFileRoute } from "@tanstack/react-start/api";

export const APIRoute = createAPIFileRoute("/api/auth/$")({
  GET: ({ request }) => {
    console.log(request.url + " GET");
    return auth.handler(request);
  },
  POST: ({ request }) => {
    console.log(request.url + " POST");
    return auth.handler(request);
  },
});

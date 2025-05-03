import { createStartAPIHandler } from "@tanstack/react-start/api";
import app from "~/routes/api";

export default createStartAPIHandler(async ({ request }) => {
  return app.fetch(request);
});

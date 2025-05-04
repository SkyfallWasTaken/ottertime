import { Hono } from "hono";
import { auth } from "~/api/auth";
import type { Context } from "~/api/util";

export default new Hono<Context>().all("*", async (c) => {
  console.log(c.req.url);
  return auth.handler(c.req.raw);
});

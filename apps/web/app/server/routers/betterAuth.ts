import { Hono } from "hono";
import { auth } from "~/server/auth";
import type { Context } from "~/server/util";

export default new Hono<Context>().all("*", async (c) => {
  console.log(c.req.url);
  return auth.handler(c.req.raw);
});

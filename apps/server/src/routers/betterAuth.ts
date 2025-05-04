import { Hono } from "hono";
import { auth } from "~/auth";
import type { Context } from "~/util";

export default new Hono<Context>().all("*", async (c) => {
  console.log(c.req.url);
  const res = await auth.handler(c.req.raw);
  console.log(await res.text())
  return res;
});

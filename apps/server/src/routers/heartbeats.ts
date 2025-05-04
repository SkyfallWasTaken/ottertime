import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

import { heartbeatSchema, emitHeartbeats } from "~/quackatime/heartbeats";
import { type Context, requireAuth } from "~/util";

export default new Hono<Context>()
  .post(
    "/heartbeats.bulk",
    requireAuth,
    zValidator("json", z.array(heartbeatSchema).min(1).max(25)),
    async (c) => {
      const json = await c.req.valid("json");
      await emitHeartbeats(json, c.get("userId"));
      return c.json({ message: "Heartbeats received" }, 201);
    }
  )
  .post(
    "/heartbeat",
    requireAuth,
    zValidator("json", heartbeatSchema),
    async (c) => {
      const json = await c.req.valid("json");
      await emitHeartbeats([json], c.get("userId"));
      return c.json({ message: "Heartbeats received" }, 201);
    }
  );

import { db, heartbeats as heartbeatsTable } from "../db";
import type { Heartbeat } from "~/common/heartbeats";
import stableJsonStringify from "fast-json-stable-stringify";

export default async function emitHeartbeats(
  heartbeats: Heartbeat[],
  userId: string
) {
  await db
    .insert(heartbeatsTable)
    .values(
      await Promise.all(
        heartbeats.map(async (heartbeat) => {
          const rawHb = {
            ...heartbeat,
            userId,
          };
          return {
            ...rawHb,
            hash: stableJsonStringify(rawHb),
          };
        })
      )
    )
    .onConflictDoNothing();
}

import stableJsonStringify from "fast-json-stable-stringify";
import type { Heartbeat } from "~/common/heartbeats";
import { sha256 } from "~/utils/misc";
import { db, heartbeats as heartbeatsTable } from "../db";

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
            // stableJsonStringify is, well, stable! This means that object X will always stringify to Y,
            // regardless of the order of the keys in X.
            hash: await sha256(stableJsonStringify(rawHb)),
          };
        })
      )
    )
    .onConflictDoNothing();
}

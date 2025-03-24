import { db, usersTable } from "./db";
import type { Heartbeat } from "../common/heartbeats";

export default async function emitHeartbeats(
	heartbeats: (typeof Heartbeat)[],
	userId: string,
) {}

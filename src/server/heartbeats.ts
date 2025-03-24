import { db, heartbeatsTable } from "./db";
import type { Heartbeat } from "../common/heartbeats";

export default async function emitHeartbeats(
	heartbeats: Heartbeat[],
	userId: string,
) {
	await db.insert(heartbeatsTable).values(
		heartbeats.map((heartbeat) => ({
			...heartbeat,
			userId,
		})),
	);
}

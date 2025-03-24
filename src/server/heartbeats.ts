import { db, heartbeatsTable, type Heartbeat } from "./db";

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

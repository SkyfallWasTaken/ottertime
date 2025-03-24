import { db, heartbeatsTable } from "./db";
import { type Heartbeat, heartbeatSchema } from "~/common/heartbeats";

export default async function emitHeartbeats(
	heartbeats: Heartbeat[],
	userId: string,
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
						hash: await hashHeartbeat(rawHb),
					};
				}),
			),
		)
		.onConflictDoNothing();
}

export function hashHeartbeat(
	heartbeat: Omit<typeof heartbeatsTable.$inferInsert, "hash">,
) {
	// We do this for a stable hash
	const heartbeatString = `userId: ${heartbeat.userId}, entity: ${heartbeat.entity}, type: ${heartbeat.type}, time: ${heartbeat.time}, lineno: ${heartbeat.lineNo}, cursorPos: ${heartbeat.cursorPos}, isWrite: ${heartbeat.isWrite}, project: ${heartbeat.project}, branch: ${heartbeat.branch}, language: ${heartbeat.language}, dependencies: ${heartbeat.dependencies}, lines: ${heartbeat.lines}, lineAdditions: ${heartbeat.lineAdditions}, lineDeletions: ${heartbeat.lineDeletions}, projectRootCount: ${heartbeat.projectRootCount},`;
	return crypto.subtle
		.digest("SHA-256", new TextEncoder().encode(heartbeatString))
		.then((hashBuffer) => {
			return Array.from(new Uint8Array(hashBuffer))
				.map((b) => b.toString(16).padStart(2, "0"))
				.join("");
		});
}

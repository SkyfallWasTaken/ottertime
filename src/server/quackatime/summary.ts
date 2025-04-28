import { and, between, eq } from "drizzle-orm";
import type { TimePeriod } from "~/common/summary";
import { db, heartbeats as heartbeatsTable } from "../db";

export async function getSummary(userId: string, timePeriod: TimePeriod) {
	const { start, end } = calculateDatesFromTimePeriod(timePeriod);
	const [heartbeats] = await db
		.select()
		.from(heartbeatsTable)
		.where(
			and(
				eq(heartbeatsTable.userId, userId),
				between(heartbeatsTable.time, start, end),
			),
		)
		.execute();

	return heartbeats;
}

function calculateDatesFromTimePeriod(timePeriod: TimePeriod) {
	const now = Date.now() / 1000;
	const start = (() => {
		switch (timePeriod) {
			case "week":
				return now - 7 * 24 * 60 * 60;
		}
	})();
	return { start, end: now };
}

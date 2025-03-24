import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Heartbeat } from "~/common/heartbeats";
import { usersTable, heartbeatsTable } from "~/server/db";
import { hashHeartbeat } from "~/server/quackatime/heartbeats";

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL is not defined");
}
const db = drizzle(process.env.DATABASE_URL);

if (
	!confirm(
		"This will delete all users and heartbeats from the database. ARE YOU SURE?",
	)
)
	process.exit(1);

if (!confirm("Once again, this will delete EVERYTHING. ARE YOU SURE?"))
	process.exit(1);

console.log("Deleting all users and heartbeats from the database...");
await db.delete(usersTable);
await db.delete(heartbeatsTable);
console.log("All users and heartbeats deleted.");

const user: typeof usersTable.$inferInsert = {
	name: "john",
	email: "john@example.com",
	apiKey: "random-key",
	id: "1",
};

await db.insert(usersTable).values(user);
console.log("New user created!");

const users = await db.select().from(usersTable);
console.log("Getting all users from the database: ", users);

const startTs = Date.now() / 1000;
for (let i = 0; i < 10; i++) {
	const rawHb: Omit<typeof heartbeatsTable.$inferInsert, "hash"> = {
		userId: "1",
		entity: `welcome${i + 1}.txt`,
		type: "file",
		time: startTs + i * 600,
	};
	const heartbeat = {
		...rawHb,
		hash: await hashHeartbeat(rawHb),
	};

	await db.insert(heartbeatsTable).values(heartbeat);
}
for (let i = 0; i < 10; i++) {
	const rawHb: Omit<typeof heartbeatsTable.$inferInsert, "hash"> = {
		userId: "1",
		type: "domain",
		entity: "figma.com",
		time: startTs + i * 600,
	};
	const heartbeat = {
		...rawHb,
		hash: await hashHeartbeat(rawHb),
	};

	await db.insert(heartbeatsTable).values(heartbeat);
}
console.log("New heartbeats created!");

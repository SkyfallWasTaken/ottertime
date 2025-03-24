import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { usersTable } from "../src/server/db/schema";

if (!process.env.DATABASE_URL) {
	throw new Error("DATABASE_URL is not defined");
}
const db = drizzle(process.env.DATABASE_URL);

if (!confirm("This will delete all users from the database. ARE YOU SURE?"))
	process.exit(1);

await db.delete(usersTable);

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

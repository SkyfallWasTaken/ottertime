import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import {
	account,
	apikey,
	heartbeats,
	session,
	user,
	verification,
} from "./schema";
if (!import.meta.env.DATABASE_URL) {
	throw new Error("DATABASE_URL is not defined");
}
const db = drizzle(import.meta.env.DATABASE_URL);

export { db, user, heartbeats, verification, account, session, apikey };

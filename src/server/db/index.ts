import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { user, heartbeats, verification, account, session } from "./schema";
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}
const db = drizzle(process.env.DATABASE_URL);

export { db, user, heartbeats, verification, account, session };

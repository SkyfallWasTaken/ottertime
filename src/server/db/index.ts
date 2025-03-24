import { drizzle } from "drizzle-orm/node-postgres";
import {
	usersTable,
	heartbeatsTable,
	heartbeatsSchema,
	heartbeatSchema,
	type Heartbeat,
} from "./schema";
const db = drizzle(import.meta.env.DATABASE_URL);

export { db, usersTable, heartbeatsTable, heartbeatsSchema, heartbeatSchema };
export type { Heartbeat };

import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { env } from "~/utils/env";
import {
	account,
	apikey,
	heartbeats,
	session,
	user,
	verification,
} from "./schema";

const db = drizzle(env.DATABASE_URL);

export { db, user, heartbeats, verification, account, session, apikey };

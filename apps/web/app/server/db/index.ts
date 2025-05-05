import "dotenv/config";
import { env } from "@repo/env/server";
import { drizzle } from "drizzle-orm/postgres-js";
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

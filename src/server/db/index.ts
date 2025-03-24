import { drizzle } from "drizzle-orm/node-postgres";
import { usersTable } from "./schema";
const db = drizzle(import.meta.env.DATABASE_URL);

export { db, usersTable };

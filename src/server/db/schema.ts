import { pgTable, varchar } from "drizzle-orm/pg-core";
export const usersTable = pgTable("users", {
	id: varchar({ length: 255 }).primaryKey(),
	name: varchar({ length: 255 }).notNull().unique(),
	email: varchar({ length: 255 }).notNull().unique(),
	apiKey: varchar({ length: 255 }).notNull().unique(),
});

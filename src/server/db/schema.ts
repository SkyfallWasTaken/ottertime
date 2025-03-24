import { sql } from "drizzle-orm";
import {
	boolean,
	integer,
	pgEnum,
	pgTable,
	real,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const usersTable = pgTable("users", {
	id: varchar({ length: 255 }).primaryKey(),
	name: varchar({ length: 255 }).notNull().unique(),
	email: varchar({ length: 255 }).notNull().unique(),
	apiKey: varchar({ length: 255 }).notNull().unique(),
});

export const type = pgEnum("hb_type", ["file", "app", "domain"]);
export const category = pgEnum("hb_category", [
	"building",
	"indexing",
	"debugging",
	"browsing",
	"running tests",
	"writing tests",
	"manual testing",
	"writing docs",
	"communicating",
	"code reviewing",
	"researching",
	"learning",
	"designing",
]);
export const heartbeatsTable = pgTable("heartbeats", {
	userId: varchar({ length: 255 }).notNull(), // TODO: should probably be a relation?

	id: varchar({ length: 255 })
		.primaryKey()
		.$defaultFn(() => nanoid(48)),

	// Entity details
	entity: text("entity").notNull(),
	type: type().notNull(),

	// Optional category
	category: category(),

	// Timestamp - using real to support fractional seconds
	time: real("time").notNull(),

	// Optional project details
	project: varchar("project", { length: 255 }),
	projectRootCount: integer("project_root_count"),

	// Optional version control info
	branch: varchar("branch", { length: 100 }),

	// Code-specific details
	language: varchar("language", { length: 50 }),
	dependencies: text("dependencies").array(),

	// File-specific metrics
	lines: integer("lines"),
	lineAdditions: integer("line_additions"),
	lineDeletions: integer("line_deletions"),

	// Cursor position
	lineNo: integer("line_no"),
	cursorPos: integer("cursor_pos"),

	// Write flag
	isWrite: boolean("is_write"),

	// Timestamps for record tracking
	createdAt: timestamp("created_at").default(sql`CURRENT_TIMESTAMP`),
});

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
	"coding",
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
	category: category().default("coding"),

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

	// Hash of the heartbeat.
	// Question: Why not just do an UNIQUE INDEX on the entirety of the heartbeat?
	// Answer: See https://stackoverflow.com/q/65980064/3112139.
	hash: varchar("hash", { length: 255 }).notNull().unique(),
});

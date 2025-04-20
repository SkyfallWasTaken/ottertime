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
export const heartbeats = pgTable("heartbeats", {
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

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  apiKey: text("api_key").unique(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

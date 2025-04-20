CREATE TYPE "public"."hb_category" AS ENUM('coding', 'building', 'indexing', 'debugging', 'browsing', 'running tests', 'writing tests', 'manual testing', 'writing docs', 'communicating', 'code reviewing', 'researching', 'learning', 'designing');--> statement-breakpoint
CREATE TYPE "public"."hb_type" AS ENUM('file', 'app', 'domain');--> statement-breakpoint
CREATE TABLE "heartbeats" (
	"userId" varchar(255) NOT NULL,
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"entity" text NOT NULL,
	"type" "hb_type" NOT NULL,
	"category" "hb_category" DEFAULT 'coding',
	"time" real NOT NULL,
	"project" varchar(255),
	"project_root_count" integer,
	"branch" varchar(100),
	"language" varchar(50),
	"dependencies" text[],
	"lines" integer,
	"line_additions" integer,
	"line_deletions" integer,
	"line_no" integer,
	"cursor_pos" integer,
	"is_write" boolean,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"hash" varchar(255) NOT NULL,
	CONSTRAINT "heartbeats_hash_unique" UNIQUE("hash")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"apiKey" varchar(255) NOT NULL,
	CONSTRAINT "users_name_unique" UNIQUE("name"),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_apiKey_unique" UNIQUE("apiKey")
);

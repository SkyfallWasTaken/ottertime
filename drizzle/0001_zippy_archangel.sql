CREATE TABLE "heartbeats" (
	"entity" text NOT NULL,
	"type" varchar(50) NOT NULL,
	"category" varchar(100),
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
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);

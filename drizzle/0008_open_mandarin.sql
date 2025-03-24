CREATE TYPE "public"."hb_type" AS ENUM('file', 'app', 'domain');--> statement-breakpoint
ALTER TYPE "public"."category" RENAME TO "hb_category";--> statement-breakpoint
ALTER TABLE "heartbeats" ALTER COLUMN "type" SET DATA TYPE hb_type USING type::hb_type;--> statement-breakpoint
ALTER TABLE "public"."heartbeats" ALTER COLUMN "category" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."hb_category";--> statement-breakpoint
CREATE TYPE "public"."hb_category" AS ENUM('building', 'indexing', 'debugging', 'browsing', 'running tests', 'writing tests', 'manual testing', 'writing docs', 'communicating', 'code reviewing', 'researching', 'learning', 'designing');--> statement-breakpoint
ALTER TABLE "public"."heartbeats" ALTER COLUMN "category" SET DATA TYPE "public"."hb_category" USING "category"::"public"."hb_category";
CREATE TYPE "public"."category" AS ENUM('file', 'app', 'domain');--> statement-breakpoint
ALTER TABLE "heartbeats" ADD COLUMN "category" text;
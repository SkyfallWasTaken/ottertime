ALTER TABLE "heartbeats" ADD COLUMN "hash" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "heartbeats" ADD CONSTRAINT "heartbeats_hash_unique" UNIQUE("hash");
UPDATE "heartbeats" 
SET "is_write" = false 
WHERE "is_write" IS NULL;--> statement-breakpoint

ALTER TABLE "heartbeats" 
ALTER COLUMN "is_write" SET DEFAULT false;--> statement-breakpoint

ALTER TABLE "heartbeats" 
ALTER COLUMN "is_write" SET NOT NULL;

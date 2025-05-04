CREATE TABLE "users" (
	"id" integer
);
--> statement-breakpoint
CREATE INDEX "custom_name" ON "users" USING btree ("id");--> statement-breakpoint
CREATE INDEX "user_id_idx" ON "account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_id_token_idx" ON "session" USING btree ("user_id","token");--> statement-breakpoint
CREATE INDEX "email_idx" ON "user" USING btree ("email");--> statement-breakpoint
CREATE INDEX "identifier_idx" ON "verification" USING btree ("identifier");
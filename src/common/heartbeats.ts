import { type } from "arktype";

export const heartbeatSchema = type({
	"branch?": "string",
	category: "string",
	created_at: "string.date",
	cursorpos: "number.integer > 0",
	"dependencies?": ["string"],
	editor: "string",
	entity: "string",
	is_write: "boolean",
	language: "string",
	line_additions: "number.integer > 0",
	line_deletions: "number.integer > 0",
	lineno: "number.integer > 0",
	lines: "number.integer > 0",
	machine: "string",
	operating_system: "string",
	project: "string",
	"project_root_count?": "number.integer > 0",
	time: "number.epoch",
	type: "string",
	user_agent: "string",
});
export const Heartbeat = heartbeatSchema.infer;

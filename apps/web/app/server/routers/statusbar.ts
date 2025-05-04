import { Hono } from "hono";
import { type Context, requireAuth } from "~/server/util";

export default new Hono<Context>().get(
	"/statusbar/today",
	requireAuth,
	async (c) => {
		// FIXME: this is a stub, we need to implement the actual logic
		return c.json({
			data: {
				grand_total: {
					text: "Quackatime",
					total_seconds: 0,
				},
			},
		});
	},
);

import { z } from "zod";

export const summarySchema = z.object({});
export const timePeriodSchema = z.enum(["week"]);

export type Summary = z.infer<typeof summarySchema>;
export type TimePeriod = z.infer<typeof timePeriodSchema>;

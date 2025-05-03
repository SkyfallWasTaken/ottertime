import { z } from "zod";
import { categories } from "~/server/db/schema";

export const heartbeatSchema = z
  .object({
    entity: z.string(),
    type: z.enum(["file", "app", "domain"]),
    time: z.number(),
    project: z.string().optional(),
    project_root_count: z.number().positive().optional(),
    branch: z.string().optional(),
    language: z.string().optional(),
    dependencies: z.array(z.string()).optional(),
    lines: z.number().min(1).optional(),
    line_additions: z.number().min(0).optional(),
    line_deletions: z.number().min(0).optional(),
    lineno: z.number().min(1).optional(),
    cursor_pos: z.number().min(1).optional(),
    is_write: z.boolean().default(false),
    category: z.enum(categories).default("coding"),
    user_agent: z.string().default("unknown"),
  })
  .transform((data, ctx) => {
    if (data.type === "file" && data.lines === undefined) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Lines must be defined for when "type" is "file"',
      });
      return z.NEVER;
    }

    return {
      ...data,
      projectRootCount: data.project_root_count,
      lineAdditions: data.line_additions,
      lineDeletions: data.line_deletions,
      lineNo: data.lineno,
      cursorPos: data.cursor_pos,
      isWrite: data.is_write,
      category: data.category,
      userAgent: data.user_agent,

      // FIXME: why are we doing this? i forgot lol
      is_write: undefined,
      project_root_count: undefined,
      line_additions: undefined,
      line_deletions: undefined,
      line_no: undefined,
      cursor_pos: undefined,
      user_agent: undefined,
    };
  });

export type Heartbeat = z.infer<typeof heartbeatSchema>;

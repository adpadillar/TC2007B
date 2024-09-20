import type { TRPCRouterRecord } from "@trpc/server";

import { publicProcedure } from "../trpc";

export const projectsRouter = {
  get: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.query.Project.findMany({ limit: 10 });
  }),
} satisfies TRPCRouterRecord;

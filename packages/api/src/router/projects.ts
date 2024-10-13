import type { TRPCRouterRecord } from "@trpc/server";

import { protectedProcedure } from "../trpc";

export const projectsRouter = {
  get: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.Project.findMany({ limit: 10 });
  }),
} satisfies TRPCRouterRecord;

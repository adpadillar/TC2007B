import type { TRPCRouterRecord } from "@trpc/server";
import { z } from "zod";

import { eq } from "@acme/db";

import { protectedProcedure } from "../trpc";

export const projectsRouter = {
  list: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db.query.Project.findMany({ limit: 10 });
  }),
  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const project = await ctx.db.query.Project.findFirst({
        where: (table) => eq(table.id, input.id),
      });

      if (!project) return null;

      return project;
    }),
} satisfies TRPCRouterRecord;

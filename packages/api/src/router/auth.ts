import type { TRPCRouterRecord } from "@trpc/server";

import { eq } from "@acme/db";

import { protectedProcedure, publicProcedure } from "../trpc";

export const authRouter = {
  currentSession: publicProcedure.query(({ ctx }) => {
    return ctx.auth;
  }),
  currentUser: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.auth.userId;

    const user = await ctx.db.query.ClerkUsers.findFirst({
      where: (table) => eq(table.id, userId),
    });

    if (!user) {
      return null;
    }

    return user;
  }),
} satisfies TRPCRouterRecord;

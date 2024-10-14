import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { eq } from "@acme/db";
import { EconomicalDonationForm } from "@acme/db/schema";

import { protectedProcedure } from "../trpc";

export const formsRouter = {
  economicalCreate: protectedProcedure
    .input(
      z.object({
        address: z.string(),
        email: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        phoneNumber: z.string(),
        quantity: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [first] = await ctx.db
        .insert(EconomicalDonationForm)
        .values({
          address: input.address,
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
          phoneNumber: input.phoneNumber,
          quantity: input.quantity,
          step: "data_provided",
          userId: ctx.auth.userId,
        })
        .returning({ id: EconomicalDonationForm.id });

      if (!first) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
        });
      }

      return first;
    }),

  economicalPay: protectedProcedure
    .input(
      z.object({
        formId: z.string(),
        paymentMethod: z.enum(["paypal", "visa", "amex", "mastercard"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(EconomicalDonationForm)
        .set({
          paymentMethod: input.paymentMethod,
          step: "payment_processed",
        })
        .where(eq(EconomicalDonationForm.id, input.formId));

      return { success: true };
    }),
} satisfies TRPCRouterRecord;

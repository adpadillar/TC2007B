import type { TRPCRouterRecord } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { eq } from "@acme/db";
import { EconomicalDonationForm, PhysicalDonationForm } from "@acme/db/schema";

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
        godfather: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const [first] = await ctx.db
        .insert(EconomicalDonationForm)
        .values({
          isGodfather: input.godfather,
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

  physicalCreate: protectedProcedure
    .input(
      z.object({
        type: z.enum(["food", "products", "discounts"]),
        name: z.string(),
        concept: z.string(),
        email: z.string(),
        isProducer: z.boolean().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(PhysicalDonationForm).values({
        concept: input.concept,
        email: input.email,
        isProducer: input.isProducer,
        name: input.name,
        type: input.type,
        userId: ctx.auth.userId,
      });
      return { success: true };
    }),

  listVolunteerOffers: protectedProcedure.query(async ({ ctx }) => {
    const projects = await ctx.db.query.VolunteerProject.findMany({
      with: {
        roles: true,
      },
    });

    return projects;
  }),

  getVolunteerOfferById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const project = await ctx.db.query.VolunteerProject.findFirst({
        where: (table) => eq(table.id, input.id),
        with: {
          roles: true,
        },
      });

      if (!project) return null;

      return project;
    }),
} satisfies TRPCRouterRecord;

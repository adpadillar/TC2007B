import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { relations, sql } from "drizzle-orm";
import {
  int,
  integer,
  sqliteTableCreator,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

const createTable = sqliteTableCreator((name) => name);
const currentTime = sql`(strftime('%s', 'now'))`;

export type SelectProject = InferSelectModel<typeof Project>;
export type InsertProject = InferSelectModel<typeof Project>;

export const Project = createTable("project", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  imageUrl: text("image_url").notNull(),
  title: text("title").notNull(),
  goal: integer("goal").notNull(),
  raised: integer("raised").notNull().default(0),
  description: text("description"),
  content: text("content"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

export type SelectPhysicalDonationForm = InferSelectModel<
  typeof PhysicalDonationForm
>;
export type InsertPhysicalDonationForm = InferInsertModel<
  typeof PhysicalDonationForm
>;

export const PhysicalDonationForm = createTable("physical_donation_form", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  type: text("type").notNull().$type<"food" | "products" | "discounts">(),
  userId: text("user_id").references(() => ClerkUsers.id, {
    onDelete: "cascade",
  }),
  name: text("name").notNull(),
  concept: text("concept").notNull(),
  isProducer: int("is_producer", { mode: "boolean" }),
  email: text("email_address").notNull(),
});

export type SelectEconomicalDonationForm = InferSelectModel<
  typeof EconomicalDonationForm
>;
export type InsertEconomicalDonationForm = InferInsertModel<
  typeof EconomicalDonationForm
>;

export const EconomicalDonationForm = createTable("economical_donation_form", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .references(() => ClerkUsers.id, {
      onDelete: "cascade",
    })
    .notNull(),
  quantity: text("quantity").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phoneNumber: text("phone_number").notNull(),
  address: text("address").notNull(),
  paymentMethod: text("payment_method").$type<
    "paypal" | "visa" | "amex" | "mastercard"
  >(),
  step: text("step")
    .$type<"data_provided" | "payment_intent" | "payment_processed">()
    .notNull(),
});

export const VolunteerProject = createTable("volunteer_project", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  vacancies: int().notNull().default(1),
  imageUrl: text("image_url").notNull(),
});

export const VolunteerProjectRelations = relations(
  VolunteerProject,
  ({ many }) => ({ roles: many(VolunteerProjectRoles) }),
);

export const VolunteerProjectRoles = createTable("volunteer_project_roles", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  description: text("description").notNull(),
  duration: text("duration").notNull(),
  time: text("time").notNull(),
  location: text("location").notNull(),
  hours: int().notNull(),
  volunteerProjectId: text("volunteer_project_id")
    .references(() => VolunteerProject.id, { onDelete: "cascade" })
    .notNull(),
});

export const VolunteerProjectRolesRelations = relations(
  VolunteerProjectRoles,
  ({ one }) => ({
    volunteerProject: one(VolunteerProject, {
      fields: [VolunteerProjectRoles.id],
      references: [VolunteerProject.id],
    }),
  }),
);

//#region Clerk Configuration
// --- START CLERK CONFIGURATION ---
// This is the database configuration for Clerk, which is used to store
// user data and email addresses. Please don't modify this section unless
// you understand the implications of doing so.
export type SelectClerkUser = InferSelectModel<typeof ClerkUsers>;
export type InsertClerkUser = InferSelectModel<typeof ClerkUsers>;

export const ClerkUsers = createTable(
  "clerk_users",
  {
    id: text("id").notNull().primaryKey(),
    firstName: text("first_name"),
    lastName: text("last_name"),
    imageUrl: text("image_url"),
    primaryEmailId: text("primary_email"),
    twoFactorEnabled: integer("two_factor_enabled", {
      mode: "boolean",
    }).default(false),
    createdAt: integer("created_at", { mode: "timestamp_ms" }).default(
      currentTime,
    ),
    updatedAt: integer("updatedAt", { mode: "timestamp_ms" })
      .default(currentTime)
      .$onUpdate(() => currentTime),
  },
  (table) => ({
    primaryEmailIndex: uniqueIndex("primary_email_index").on(
      table.primaryEmailId,
    ),
  }),
);

export type SelectEmailAddress = InferSelectModel<typeof EmailAddresses>;
export type InsertEmailAddress = InferSelectModel<typeof EmailAddresses>;

export const EmailAddresses = createTable(
  "email_address",
  {
    id: text("id").notNull().primaryKey(),
    emailAddress: text("email_address").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => ClerkUsers.id, { onDelete: "cascade" }),
    verifyStatus: text("verify_status"),
  },
  (table) => ({
    emailAddressIndex: uniqueIndex("email_address_index").on(
      table.emailAddress,
    ),
  }),
);
// --- END CLERK CONFIGURATION ---
//#endregion

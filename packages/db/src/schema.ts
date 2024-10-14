import type { InferSelectModel } from "drizzle-orm";
import { sql } from "drizzle-orm";
import {
  integer,
  sqliteTableCreator,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

const createTable = sqliteTableCreator((name) => name);
const currentTime = sql`(strftime('%s', 'now'))`;

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
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

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

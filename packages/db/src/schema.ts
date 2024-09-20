import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const Project = sqliteTable("project", {
  id: text("id")
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  imageUrl: text("image_url").notNull(),
  title: text("title").notNull(),
  goal: integer("goal").notNull(),
  raised: integer("raised").notNull().default(0),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

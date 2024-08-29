import type { Config } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL");
}

if (!process.env.DATABASE_AUTH_TOKEN) {
  throw new Error("Missing DATABASE_AUTH_TOKEN");
}

export default {
  schema: "./src/schema.ts",
  driver: "turso",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN,
  },
} satisfies Config;

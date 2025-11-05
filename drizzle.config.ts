import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dbCredentials: {
    url: process.env["POSTGRES_URL"]!,
  },
  dialect: "postgresql",
  out: "./app/lib/db/migration",
  schema: "./app/lib/db/schema.ts",
})

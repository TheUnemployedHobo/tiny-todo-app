import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dbCredentials: {
    url: process.env["POSTGRES_URL"]!,
  },
  dialect: "postgresql",
  out: "./app/api/db/migration",
  schema: "./app/api/db/schema.ts",
})

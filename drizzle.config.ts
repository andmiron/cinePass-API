import { defineConfig } from "drizzle-kit";
import { getDatabaseUrl } from "./src/db";

export default defineConfig({
  schema: "./src/db/schema/*.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: getDatabaseUrl(),
  },
});

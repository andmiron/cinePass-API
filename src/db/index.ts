import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import config from "@/config/app.config";

export function getDatabaseUrl() {
  switch (config.NODE_ENV) {
    case "production":
      return config.DATABASE_URL_PROD;
    case "test":
      return config.DATABASE_URL_TEST;
    default:
      return config.DATABASE_URL_DEV;
  }
}

export async function setupDatabase() {
  const pool = new Pool({
    connectionString: getDatabaseUrl(),
  });
  const db = drizzle({ client: pool });
  return db;
}

export type DB = Awaited<ReturnType<typeof setupDatabase>>;

import parsedConfig from "../config/app.config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export const getDatabaseUrl = () => {
  switch (parsedConfig.NODE_ENV) {
    case "production":
      return parsedConfig.DATABASE_URL_PROD;
    case "test":
      return parsedConfig.DATABASE_URL_TEST;
    default:
      return parsedConfig.DATABASE_URL_DEV;
  }
};

export function setupDatabase() {
  const pool = new Pool({
    connectionString: getDatabaseUrl(),
  });
  const db = drizzle({ client: pool });
  return db;
}

export type DB = Awaited<ReturnType<typeof setupDatabase>>;

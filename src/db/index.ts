import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

export async function setupDatabase(url: string) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const db = drizzle({ client: pool });
  return db;
}

export type DB = Awaited<ReturnType<typeof setupDatabase>>;

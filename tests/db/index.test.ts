import { setupDatabase } from "@/db";
import { sql } from "drizzle-orm";

describe("Database Connection", () => {
  let db: Awaited<ReturnType<typeof setupDatabase>>;

  beforeAll(async () => {
    db = await setupDatabase();
  });

  afterAll(async () => {
    await db.$client.end();
  });

  it("should connect to database successfully", async () => {
    const result = await db.execute(sql`SELECT 1`);
    expect(result).toBeDefined();
  });

  it("should have correct database URL based on environment", async () => {
    const result = await db.execute(sql`SELECT current_database()`);
    const dbName = result.rows[0].current_database;
    expect(dbName).toContain("test");
  });
});

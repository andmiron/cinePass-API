import { FastifyInstance, FastifyPluginAsync } from "fastify";
import { setupDatabase } from "@/db";

const drizzlePlugin: FastifyPluginAsync = async (app: FastifyInstance) => {
  const db = await setupDatabase(app.config.DATABASE_URL);
  app.decorate("db", db);

  app.addHook("onClose", async (app) => {
    await app.db.$client.end();
  });

  try {
    await app.db.execute(`SELECT 1`);
    app.log.info("Drizzle database plugin loaded");
  } catch (error) {
    app.log.error(error);
  }
};

export default drizzlePlugin;

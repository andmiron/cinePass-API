import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyPluginOptions,
} from "fastify";
import { setupDatabase } from "../db";

const drizzlePlugin: FastifyPluginAsync = async (
  app: FastifyInstance,
  opts: FastifyPluginOptions
) => {
  const db = setupDatabase();

  app.decorate("db", db);

  app.addHook("onClose", async (app) => {
    await app.db.$client.end();
  });

  try {
    await app.after();
    await app.db.execute(`SELECT 1`);
    app.log.info("Plugin loaded: drizzle");
  } catch (error) {
    app.log.error(error);
  }
};

export default drizzlePlugin;

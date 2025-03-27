import config, { Config } from "@/config/config";
import { FastifyInstance, FastifyPluginAsync } from "fastify";

const configPlugin: FastifyPluginAsync = async (app) => {
  app.decorate("config", config);

  app.after((err) => {
    if (err) {
      app.log.error(err);
    }
    app.log.info("Config plugin loaded");
  });
};

export default configPlugin;

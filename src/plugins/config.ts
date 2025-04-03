import config from "@/config/app.config";
import { FastifyInstance, FastifyPluginAsync } from "fastify";

const configPlugin: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.decorate("config", config);

  app.after((err) => {
    if (err) {
      app.log.error(err);
    }
    app.log.info("Config plugin loaded");
  });
};

export default configPlugin;

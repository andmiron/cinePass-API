import parsedConfig from "../config/app.config";
import {
  FastifyInstance,
  FastifyPluginAsync,
  FastifyPluginOptions,
} from "fastify";

const configPlugin: FastifyPluginAsync = async (
  app: FastifyInstance,
  opts: FastifyPluginOptions
) => {
  app.decorate("config", parsedConfig);

  app.after(() => app.log.info("Plugin loaded: config"));
};

export default configPlugin;

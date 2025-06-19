import sensible from "@fastify/sensible";
import { FastifyInstance, FastifyPluginAsync } from "fastify";

const sensiblePlugin: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.register(sensible);

  app.after(() => app.log.info("Plugin loaded: sensible"));
};

export default sensiblePlugin;

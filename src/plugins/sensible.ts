import fastify, { FastifyInstance, FastifyPluginAsync } from "fastify";
import sensible from "@fastify/sensible";

const sensiblePlugin: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.register(sensible, {
    sharedSchemaId: "HttpError",
  });

  app.after((err) => {
    if (err) {
      app.log.error(err);
    }
    app.log.info("Sensible plugin loaded");
  });
};

export default sensiblePlugin;

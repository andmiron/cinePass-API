import { FastifyError, FastifyInstance, FastifyPluginAsync } from "fastify";

const errorHandler: FastifyPluginAsync = async (app: FastifyInstance) => {
  app.setErrorHandler((error: FastifyError, request, reply) => {
    app.log.error(error);

    const isProd = app.config.NODE_ENV === "production";
    const errorMessage = isProd ? "Internal server error" : error.message;
    const statusCode = error.statusCode || 500;

    reply.status(statusCode).send({
      success: false,
      error: {
        message: errorMessage,
      },
    });
  });

  app.after((err) => {
    if (err) {
      app.log.error(err);
    }
    app.log.info("Error handler plugin loaded");
  });
};

export default errorHandler;

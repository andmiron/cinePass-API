import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { FastifyPluginAsync } from "fastify";
import { jsonSchemaTransform } from "fastify-type-provider-zod";

const swaggerPlugin: FastifyPluginAsync = async (app) => {
  app.register(fastifySwagger, {
    openapi: {
      openapi: "3.0.0",
      info: {
        title: "Movie reservation API",
        description: "API for the movie reservation",
        version: "1.0.0",
      },
      tags: [
        { name: "auth", description: "Authentication related endpoints" },
        {
          name: "healthcheck",
          description: "API and database health check",
        },
      ],
    },
    transform: jsonSchemaTransform,
  });

  app.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
  });

  app.after((err) => {
    if (err) {
      app.log.error(err);
    }
    app.log.info("Swagger plugin loaded");
  });
};

export default swaggerPlugin;

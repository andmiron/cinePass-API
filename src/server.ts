import Fastify, { FastifyInstance } from "fastify";
import { fastifyOptions } from "@/config/app.options";
import autoLoad from "@fastify/autoload";
import { join } from "node:path";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { Config } from "./config/config";
import { DB } from "./db";

declare module "fastify" {
  interface FastifyInstance {
    config: Config;
    db: DB;
  }
}

export default async function build(): Promise<FastifyInstance> {
  const app = Fastify(fastifyOptions);

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.setErrorHandler(async (error, request, reply) => {
    app.log.error(error);

    const isProd = app.config.NODE_ENV === "production";
    const errorMessage = isProd ? "Internal server error" : error.message;
    const statusCode = error.statusCode || 500;

    return reply.status(statusCode).send({
      message: errorMessage,
      ...(isProd ? {} : { stack: error.stack }),
    });
  });

  app
    .register(autoLoad, {
      dir: join(__dirname, "plugins"),
      ignorePattern: /^.*(?:test|spec).ts|js$/,
      encapsulate: false,
    })
    .after((err) => {
      if (err) {
        app.log.error(err);
      }
      app.log.info("All plugins have been loaded");
    })
    .register(autoLoad, {
      dir: join(__dirname, "routes"),
      options: { prefix: "/api" },
      encapsulate: false,
    })
    .after((err) => {
      if (err) {
        app.log.error(err);
      }
      app.log.info("All routes have been loaded");
    })
    .ready((err) => {
      if (err) {
        app.log.error(err);
        process.exit(1);
      }
      app.log.info("Server is ready");
    });

  return app;
}

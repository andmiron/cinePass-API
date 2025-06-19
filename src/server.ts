import Fastify, { FastifyInstance, FastifyPluginOptions } from "fastify";
import autoLoad from "@fastify/autoload";
import { join } from "node:path";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { fastifyOptions } from "./config/app.options";
import { Config } from "./config/app.config";
import { DB } from "./db";

export default async function build(): Promise<FastifyInstance> {
  const app = Fastify(fastifyOptions);

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app
    .register(autoLoad, {
      dir: join(__dirname, "plugins"),
      encapsulate: false,
    })
    .after(() => app.log.warn("All plugins have been loaded"));

  app
    .register(autoLoad, {
      dir: join(__dirname, "routes"),
      options: { prefix: "/api" },
    })
    .after(() => app.log.warn("All routes have been loaded"));

  return app;
}

declare module "fastify" {
  interface FastifyInstance {
    config: Config;
    db: DB;
  }
}

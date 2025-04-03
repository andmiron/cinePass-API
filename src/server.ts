import Fastify, { FastifyInstance } from "fastify";
import { join } from "node:path";
import autoLoad from "@fastify/autoload";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { fastifyOptions } from "@/config/app.options";
import { Config } from "./config/app.config";
import { DB } from "./db";

export default async function build(): Promise<FastifyInstance> {
  const app = Fastify(fastifyOptions);

  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  app.register(autoLoad, {
    dir: join(__dirname, "plugins"),
    encapsulate: false,
  });
  await app.after();
  app.log.warn("Plugins loaded");

  app.register(autoLoad, {
    dir: join(__dirname, "routes"),
    options: { prefix: "/api" },
  });
  await app.after();
  app.log.warn("Routes loaded");

  return app;
}

declare module "fastify" {
  interface FastifyInstance {
    config: Config;
    db: DB;
  }
}

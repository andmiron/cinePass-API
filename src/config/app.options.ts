import { FastifyServerOptions } from "fastify";
import { randomUUID } from "node:crypto";
import { envToLogger } from "./logger";
import parsedConfig from "./app.config";

export const fastifyOptions: FastifyServerOptions = {
  genReqId: () => randomUUID(),
  logger: envToLogger[parsedConfig.NODE_ENV] ?? true,
};

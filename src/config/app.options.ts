import { FastifyServerOptions } from "fastify";
import { randomUUID } from "node:crypto";
import { envToLogger } from "./logger";
import config from "@/config/app.config";

export const fastifyOptions: FastifyServerOptions = {
  genReqId: () => randomUUID(),
  logger: envToLogger[config.NODE_ENV] ?? true,
};

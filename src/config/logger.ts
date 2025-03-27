import { PinoLoggerOptions } from "fastify/types/logger";
import pino from "pino";

export const envToLogger: {
  development: PinoLoggerOptions;
  production: PinoLoggerOptions;
  test: boolean;
} = {
  development: {
    base: undefined,
    serializers: {
      err: pino.stdSerializers.err,
      req: pino.stdSerializers.req,
      res: pino.stdSerializers.res,
    },
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        colorizeObjects: true,
        translateTime: "HH:MM:ss Z",
      },
    },
  },
  production: {
    base: undefined,
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  test: false,
};

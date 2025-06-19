"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envToLogger = void 0;
const pino_1 = __importDefault(require("pino"));
exports.envToLogger = {
    development: {
        base: undefined,
        serializers: {
            err: pino_1.default.stdSerializers.err,
            req: pino_1.default.stdSerializers.req,
            res: pino_1.default.stdSerializers.res,
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
        timestamp: pino_1.default.stdTimeFunctions.isoTime,
    },
    test: false,
};

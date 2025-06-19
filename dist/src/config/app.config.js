"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSchema = void 0;
const zod_1 = require("zod");
require("dotenv/config");
const configSchema = zod_1.z.object({
    NODE_ENV: zod_1.z
        .enum(["development", "production", "test"])
        .default("development"),
    PORT: zod_1.z.string().default("3000").transform(Number),
    HOST: zod_1.z.string().default("0.0.0.0"),
    DATABASE_URL_DEV: zod_1.z.string().url(),
    DATABASE_URL_TEST: zod_1.z.string().url(),
    DATABASE_URL_PROD: zod_1.z.string().url(),
    JWT_SECRET: zod_1.z.string(),
    COOKIE_SECRET: zod_1.z.string(),
});
exports.configSchema = configSchema;
const config = configSchema.parse(process.env);
exports.default = config;

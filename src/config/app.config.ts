import { z } from "zod";
import "dotenv/config";

const configSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.string().default("3000").transform(Number),
  HOST: z.string().default("0.0.0.0"),
  DATABASE_URL_DEV: z.string().url(),
  DATABASE_URL_TEST: z.string().url(),
  DATABASE_URL_PROD: z.string().url(),
  JWT_SECRET: z.string(),
  COOKIE_SECRET: z.string(),
});

const config = configSchema.parse(process.env);

type Config = z.infer<typeof configSchema>;

export default config;

export { configSchema, type Config };

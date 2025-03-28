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
});

const config = configSchema.parse(process.env);

export type Config = z.infer<typeof configSchema>;

export default config;

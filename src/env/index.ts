import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string(),
  CRYPTO_SALT: z.string(),
  JWT_EXPIRATION: z.string(),
  JWT_SECRET: z.string()
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log("❌ Invalid environment variables", _env.error.format());

  throw new Error("Invalid environment variables");
}

export const Env = _env.data;


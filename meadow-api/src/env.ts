import { z, ZodError } from "zod";

const EnvSchema = z.object({
  ENVIRONMENT: z.string().default("development"),
  LOG_LEVEL: z.enum([
    "fatal",
    "error",
    "warn",
    "info",
    "debug",
    "trace",
    "silent",
  ]),
  BETTER_AUTH_URL: z.url(),
  BETTER_AUTH_SECRET: z.string(),
  DB_FILE_NAME: z.string()
});

export type env = z.infer<typeof EnvSchema>;

let env: env;

try {
  env = EnvSchema.parse(process.env);
} catch (e) {
  const error = e as ZodError;
  console.error("Invalid ENV:");
  console.error(error.flatten().fieldErrors);
  process.exit(1);
}

export default env;

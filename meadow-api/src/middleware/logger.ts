import { pinoLogger } from "hono-pino";
import pino from "pino";
import pretty from "pino-pretty";
import env from "../env";

export function logger() {
  return pinoLogger({
    pino: pino(
      {
        level: env.LOG_LEVEL,
      },
      env.ENVIRONMENT === "production" ? undefined : pretty(),
    ),
  });
}

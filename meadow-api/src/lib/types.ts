import type { PinoLogger } from "hono-pino";
import type { auth } from './auth'
import type { OpenAPIHono } from "@hono/zod-openapi";

export interface MeadowBindings {
  Bindings: {};
  Variables: {
    logger: PinoLogger;
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  };
}

export type MeadowApp = OpenAPIHono<MeadowBindings>;
import type { PinoLogger } from "hono-pino";
import type { auth } from "./auth";
import type { OpenAPIHono } from "@hono/zod-openapi";
import type { BASE_PATH } from "./constants";

export type Bindings = {};

export type Variables = {
  logger: PinoLogger;
  // user: typeof auth.$Infer.Session.user | null
  user?: typeof auth.$Infer.Session.user;
  session: typeof auth.$Infer.Session.session | null;
};

export interface MeadowBindings {
  Bindings: Bindings;
  Variables: Variables;
}

export type MeadowApp = OpenAPIHono<MeadowBindings, {}, typeof BASE_PATH>;

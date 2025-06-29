import type { RouteConfig, RouteHandler } from "@hono/zod-openapi";
import { OpenAPIHono } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";
import type { auth } from './auth'

export interface MeadowBindings {
  Bindings: {};
  Variables: {
    logger: PinoLogger;
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  };
}

export type MeadowOpenAPI = OpenAPIHono<MeadowBindings>;

export type MeadowRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  MeadowBindings
>;

export type AuthType = {
  Variables: {
    user: typeof auth.$Infer.Session.user | null
    session: typeof auth.$Infer.Session.session | null
  }
}

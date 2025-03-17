import type { RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { Hono } from "hono";
import type { PinoLogger } from "hono-pino";

export interface MeadowBindings {
  Bindings: {};
  Variables: {
    logger: PinoLogger;
  };
}

export type MeadowOpenAPI = Hono<MeadowBindings>;

export type MeadowRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  MeadowBindings
>;

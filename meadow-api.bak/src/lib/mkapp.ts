import { serveStatic } from "hono/bun";
import { onError, logger } from "../middleware";
import type { MeadowBindings, MeadowOpenAPI } from "./types";
import { OpenAPIHono } from "@hono/zod-openapi";

export function mkroute() {
  return new OpenAPIHono<MeadowBindings>({
    strict: false
  });
}

export default function mkapp(): MeadowOpenAPI {
  const app = mkroute()
    .use("/favicon.ico", serveStatic({ path: "./favicon.ico" }))
    .use(logger())
    .onError(onError)
    .notFound((c) =>
      c.json({ message: `Route Not Found: '${c.req.path}'` }, 404),
    ) as MeadowOpenAPI;
  return app;
}

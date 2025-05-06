import { serveStatic } from "hono/bun";
import { onError, logger } from "../middleware";
import type { MeadowBindings } from "./types";
import { Hono } from "hono";

export function mkroute() {
  return new Hono<MeadowBindings>();
}

export default function mkapp() {
  const app = mkroute()
    .use("/favicon.ico", serveStatic({ path: "./favicon.ico" }))
    .use(logger())
    .onError(onError)
    .notFound((c) =>
      c.json({ message: `Route Not Found: '${c.req.path}'` }, 404),
    );
  return app;
}

import { OpenAPIHono } from "@hono/zod-openapi";
import { serveStatic } from "hono/bun";
import { onError, logger } from "../middleware";
import type { Bindings, Variables } from "./types";

export default function mkapp() {
  const app = new OpenAPIHono<{ Bindings: Bindings; Variables: Variables }>();
  app.use("/favicon.ico", serveStatic({ path: "./favicon.ico" }));
  app.use(logger());
  app.onError(onError);
  app.notFound((c) =>
    c.json({ message: `Route Not Found: '${c.req.path}'` }, 404),
  );
  return app;
}

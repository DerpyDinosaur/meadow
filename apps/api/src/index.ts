import { OpenAPIHono } from "@hono/zod-openapi";
import { serveStatic } from "hono/bun";
import type { Logger } from "pino";
import { todosRouter } from "./routes/todos";
import { mkOpenapi } from "./lib/factory";
import type { MeadowBindings } from "./lib/types";
import { logger, onError } from "./middleware";
import { projectsRouter } from "./routes/projects";
import { subtasksRouter } from "./routes/subtasks";
import { cors } from "hono/cors";
import { session } from "./middleware/auth";
import { auth } from "./lib/auth";
import { fileURLToPath } from "node:url";

declare module "hono" {
  interface ContextVariableMap {
    logger: Logger;
  }
}

const app = new OpenAPIHono<MeadowBindings>({
  strict: false,
});

const faviconPath = fileURLToPath(
  import.meta.resolve("@meadow/theme/assets/meadow-logo.svg"),
);
app.use("/favicon.ico", serveStatic({ path: faviconPath }));
app.use(
  "/api/auth/*",
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);
app.use("/api/*", session);

app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});
app.use(logger());
app.onError(onError);

app.route("/api/todos", todosRouter);
app.route("/api/projects", projectsRouter);
app.route("/api/projects", subtasksRouter);

mkOpenapi(app);

export default app;

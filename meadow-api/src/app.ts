import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { onError, logger } from "./middleware";
import { auth } from './lib/auth';
import { mkApp, mkOpenapi } from './lib/factory';
import tasks from "./routes/tasks";

const app = mkApp();

// Middleware
app.use("/favicon.ico", serveStatic({ path: "./favicon.ico" }));
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
)
.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});
app.use(logger());
app.onError(onError);

mkOpenapi(app);

// Init Routes
const routes = [
  tasks,
] as const;

routes.forEach((route) => {
  app.route("/api/tasks", route);
});

export type AppType = typeof routes[number];
export default app;
import { OpenAPIHono } from '@hono/zod-openapi';
import { serveStatic } from "hono/bun";
import { cors } from "hono/cors";
import { Scalar } from '@scalar/hono-api-reference';
import routes from './routes';
import { onError, logger } from "./middleware";
import type { MeadowBindings } from './lib/types';
import { auth } from './lib/auth';

const app = new OpenAPIHono<MeadowBindings>();

// Middleware
app.use("/favicon.ico", serveStatic({ path: "./favicon.ico" }))
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
app.use(logger())
app.onError(onError)

// Init Routes
app.route('/api', routes)

// OpenAPI
app.get(
  "/docs",
  Scalar({
    layout: "classic",
    theme: "saturn",
    defaultHttpClient: {
      targetKey: "js",
      clientKey: "fetch",
    },
    url: "/openapi",
  }),
)
app.get('/openapi', (c) =>
  c.json(
    app.getOpenAPI31Document({
      openapi: '3.1.0',
      info: {
        version: '1.0.0',
        title: 'Todo API',
      },
    })
  )
);

export default app;
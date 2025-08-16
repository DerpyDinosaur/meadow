import { Scalar } from '@scalar/hono-api-reference';
import routes from './routes';
import { serveStatic } from "hono/bun";
import { onError, logger } from "./middleware";
import { OpenAPIHono } from '@hono/zod-openapi';
import type { MeadowBindings } from './lib/types';

const app = new OpenAPIHono<MeadowBindings>();

// Middleware
app.use("/favicon.ico", serveStatic({ path: "./favicon.ico" }))
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
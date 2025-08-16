import { Scalar } from '@scalar/hono-api-reference';
import routes from './routes';

const app = routes;

// Serve OpenAPI documentation at /doc (Swagger UI)
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

// Optional: Serve the OpenAPI JSON spec
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

export default app
export type AppType = typeof routes;
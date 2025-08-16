import { Scalar } from '@scalar/hono-api-reference';
import routes from './routes';

const app = routes;

app.get(
  "/docs",
  Scalar({
    layout: "classic",
    theme: "saturn",
    defaultHttpClient: {
      targetKey: "js",
      clientKey: "fetch",
    },
    url: "/api/openapi",
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

export default app
export type AppType = typeof routes;
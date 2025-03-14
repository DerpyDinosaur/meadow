import type { StatusCode } from "hono/utils/http-status";
import { OpenAPIHono } from "@hono/zod-openapi";
import { logger } from 'hono/logger';
import env from './env'

const app = new OpenAPIHono();
app.use(logger())

app.onError((err, c) => {
  const status = "status" in err ? err.status : c.newResponse(null).status;
  const status_code = status !== 200 ? (status as StatusCode) : 500

  return c.json(
    {
      message: err.message,
      stack: env.ENVIRONMENT === 'production'
        ? undefined
        : err.stack
    },
    status_code
  );
})

app.notFound((c) => c.json({message: `Route Not Found: '${c.req.path}'`}, 404))

app.get("/", (c) => c.json({message: "Hello Hono!"}))

app.get("/error", (c) => {throw new Error("boom")})

export default app
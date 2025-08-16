import type { ErrorHandler } from "hono";
import env from "../env";
import { HTTPException } from "hono/http-exception";
import type { StatusCode } from "hono/utils/http-status";

const onError: ErrorHandler = (err, c) => {
  let status: StatusCode = 500;

  if (err instanceof HTTPException) {
    const error = err.getResponse();
    if (typeof error.status === "number") {
      status = error.status as StatusCode;
    }
  }

  // TODO: Handle public/private errors

  c.status(status);
  return c.json({
    message: err.message,
    stack: env.ENVIRONMENT === "production" ? null : err.stack,
  });
};

export default onError;
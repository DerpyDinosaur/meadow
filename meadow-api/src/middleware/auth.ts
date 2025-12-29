import { createMiddleware } from "hono/factory";
import type { MeadowBindings } from "../lib/types";
import { auth } from "../lib/auth";

export const session = createMiddleware<MeadowBindings>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  // if (!session || session.user.email !== "adam.brickhill@lonetree.xyz") {
  if (!session) {
    if (c.req.url.includes("/task")) {
      return c.json({ message: "Unauthorized" }, 401);
    }
    return await next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return await next();
});

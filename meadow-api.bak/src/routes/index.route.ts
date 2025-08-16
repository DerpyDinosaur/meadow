import { mkroute } from "../lib/mkapp";
import { json_content } from "../lib/openapi";
import { z } from "zod";
import { createRoute } from "@hono/zod-openapi";
import packageJSON from "../../package.json";

const router = mkroute()
  .openapi(
    createRoute({
      tags: ["index"],
      method: 'get',
      path: '/',
      responses: {
        200: json_content(
          z.object({
            version: z.string(),
            status: z.string()
          }),
          "Successful Response",
        ),
      }
    }),
    (c) => {
      return c.json({
        version: packageJSON.version || "unkown",
        status: "ok"
      }, 200);
    }
  );

export default router;
